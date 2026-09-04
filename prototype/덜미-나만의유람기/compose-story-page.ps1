[CmdletBinding(DefaultParameterSetName = 'InlineText')]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$IllustrationPath,

    [Parameter(Mandatory = $true, ParameterSetName = 'InlineText')]
    [AllowEmptyString()]
    [string]$Text,

    [Parameter(Mandatory = $true, ParameterSetName = 'TextFile')]
    [ValidateNotNullOrEmpty()]
    [string]$TextPath,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$OutputPath,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$TextImagePath,
    [string]$Title = '',

    [ValidateRange(640, 4096)]
    [int]$PageWidth = 1600,

    [ValidateRange(16, 160)]
    [float]$FontSize = 42,

    [ValidateRange(0, 300)]
    [int]$Margin = 90,

    [ValidateNotNullOrEmpty()]
    [string]$FontName = 'Malgun Gothic',

    [ValidateRange(1000, 12000)]
    [int]$MaxPageHeight = 12000
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

function Resolve-InputPath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,

        [Parameter(Mandatory = $true)]
        [string]$Label
    )

    try {
        $resolvedPath = (Resolve-Path -LiteralPath $Path -ErrorAction Stop).Path
    }
    catch {
        throw "$Label does not exist: $Path"
    }

    if (-not [System.IO.File]::Exists($resolvedPath)) {
        throw "$Label is not a file: $Path"
    }

    return $resolvedPath
}

function Get-OutputFullPath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    if ([System.IO.Path]::IsPathRooted($Path)) {
        return [System.IO.Path]::GetFullPath($Path)
    }

    return [System.IO.Path]::GetFullPath((Join-Path -Path (Get-Location).Path -ChildPath $Path))
}

function Ensure-ParentDirectory {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    $parent = [System.IO.Path]::GetDirectoryName($Path)
    if (-not [string]::IsNullOrWhiteSpace($parent) -and -not [System.IO.Directory]::Exists($parent)) {
        [System.IO.Directory]::CreateDirectory($parent) | Out-Null
    }
}

$illustrationFullPath = Resolve-InputPath -Path $IllustrationPath -Label 'Illustration'
$outputFullPath = Get-OutputFullPath -Path $OutputPath
$textFullPath = $null

if ($PSCmdlet.ParameterSetName -eq 'TextFile') {
    $textFullPath = Resolve-InputPath -Path $TextPath -Label 'Text file'
    $strictUtf8 = New-Object System.Text.UTF8Encoding($false, $true)
    $bodyText = [System.IO.File]::ReadAllText($textFullPath, $strictUtf8)
}
else {
    $bodyText = $Text
}

if ([string]::IsNullOrWhiteSpace($bodyText)) {
    throw 'Text must not be empty.'
}

$textImageFullPath = Get-OutputFullPath -Path $TextImagePath

if (-not [string]::Equals([System.IO.Path]::GetExtension($illustrationFullPath), '.png', [System.StringComparison]::OrdinalIgnoreCase)) {
    throw 'IllustrationPath must point to a PNG file.'
}

foreach ($pngOutputPath in @($textImageFullPath, $outputFullPath)) {
    if (-not [string]::Equals([System.IO.Path]::GetExtension($pngOutputPath), '.png', [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Output files must use the .png extension: $pngOutputPath"
    }
}

$inputPaths = @($illustrationFullPath)
if ($textFullPath) {
    $inputPaths += $textFullPath
}
$outputPaths = @($textImageFullPath, $outputFullPath)

foreach ($candidateOutput in $outputPaths) {
    foreach ($candidateInput in $inputPaths) {
        if ([string]::Equals($candidateOutput, $candidateInput, [System.StringComparison]::OrdinalIgnoreCase)) {
            throw "Output paths must not overwrite input files: $candidateOutput"
        }
    }
}

if ([string]::Equals($textImageFullPath, $outputFullPath, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw 'TextImagePath must differ from OutputPath.'
}

Ensure-ParentDirectory -Path $textImageFullPath
Ensure-ParentDirectory -Path $outputFullPath

$illustration = $null
$measureBitmap = $null
$measureGraphics = $null
$bodyFont = $null
$titleFont = $null
$installedFonts = $null
$stringFormat = $null
$textBitmap = $null
$textGraphics = $null
$pageBitmap = $null
$pageGraphics = $null

try {
    try {
        $illustration = [System.Drawing.Image]::FromFile($illustrationFullPath)
    }
    catch {
        throw "Illustration is not a readable image: $illustrationFullPath"
    }

    if ($illustration.RawFormat.Guid -ne [System.Drawing.Imaging.ImageFormat]::Png.Guid) {
        throw "Illustration content is not PNG: $illustrationFullPath"
    }

    if ($illustration.Width -le 0 -or $illustration.Height -le 0) {
        throw 'Illustration dimensions are invalid.'
    }

    $contentWidth = $PageWidth - (2 * $Margin)
    $minimumContentWidth = [Math]::Max(160, [int][Math]::Ceiling($FontSize * 2))
    if ($contentWidth -lt $minimumContentWidth) {
        throw "PageWidth and Margin leave too little room for the selected FontSize. Text width must be at least $minimumContentWidth pixels."
    }

    $installedFonts = New-Object System.Drawing.Text.InstalledFontCollection
    $matchingFont = $installedFonts.Families | Where-Object {
        [string]::Equals($_.Name, $FontName, [System.StringComparison]::OrdinalIgnoreCase)
    } | Select-Object -First 1
    if (-not $matchingFont) {
        throw "Font is not installed: $FontName"
    }

    $bodyFont = New-Object System.Drawing.Font(
        $FontName,
        $FontSize,
        [System.Drawing.FontStyle]::Regular,
        [System.Drawing.GraphicsUnit]::Pixel
    )
    $titleFont = New-Object System.Drawing.Font(
        $FontName,
        ($FontSize * 1.25),
        [System.Drawing.FontStyle]::Bold,
        [System.Drawing.GraphicsUnit]::Pixel
    )
    $stringFormat = New-Object System.Drawing.StringFormat
    $stringFormat.Alignment = [System.Drawing.StringAlignment]::Near
    $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Near
    $stringFormat.Trimming = [System.Drawing.StringTrimming]::Word

    $measureBitmap = New-Object System.Drawing.Bitmap(1, 1)
    $measureGraphics = [System.Drawing.Graphics]::FromImage($measureBitmap)
    $bodySize = $measureGraphics.MeasureString($bodyText, $bodyFont, $contentWidth, $stringFormat)

    $titleHeight = 0
    $titleGap = 0
    if (-not [string]::IsNullOrWhiteSpace($Title)) {
        $titleSize = $measureGraphics.MeasureString($Title, $titleFont, $contentWidth, $stringFormat)
        $titleHeight = [int][Math]::Ceiling($titleSize.Height)
        $titleGap = [int][Math]::Round($FontSize * 0.6)
    }

    $bodyHeight = [int][Math]::Ceiling($bodySize.Height)
    $textHeight = [Math]::Max(240, (2 * $Margin) + $titleHeight + $titleGap + $bodyHeight)

    $illustrationHeightValue = [Math]::Round($illustration.Height * ($PageWidth / [double]$illustration.Width))
    if ($illustrationHeightValue -lt 1) {
        throw 'Scaled illustration height must be at least 1 pixel. Use a less extreme illustration aspect ratio.'
    }
    if ($illustrationHeightValue -gt [int]::MaxValue) {
        throw 'Scaled illustration height exceeds the supported range.'
    }

    $illustrationHeight = [int]$illustrationHeightValue
    $pageHeightValue = [int64]$illustrationHeight + [int64]$textHeight
    $pixelCount = [int64]$PageWidth * $pageHeightValue
    if ($pageHeightValue -gt $MaxPageHeight -or $pixelCount -gt 50000000L) {
        throw "Output would be too large (${PageWidth}x${pageHeightValue}). Shorten the text, reduce PageWidth, or use a less extreme illustration aspect ratio."
    }

    $pageHeight = [int]$pageHeightValue

    $textBitmap = New-Object System.Drawing.Bitmap($PageWidth, $textHeight)
    $textBitmap.SetResolution(96, 96)
    $textGraphics = [System.Drawing.Graphics]::FromImage($textBitmap)
    $textGraphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#F5EBDD'))
    $textGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $textGraphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#241C18'))
    try {
        $bodyTop = $Margin
        if ($titleHeight -gt 0) {
            $titleRectangle = New-Object System.Drawing.RectangleF($Margin, $Margin, $contentWidth, $titleHeight)
            $textGraphics.DrawString($Title, $titleFont, $textBrush, $titleRectangle, $stringFormat)
            $bodyTop += $titleHeight + $titleGap
        }

        $bodyRectangle = New-Object System.Drawing.RectangleF($Margin, $bodyTop, $contentWidth, $bodyHeight)
        $textGraphics.DrawString($bodyText, $bodyFont, $textBrush, $bodyRectangle, $stringFormat)
    }
    finally {
        $textBrush.Dispose()
    }

    $textBitmap.Save($textImageFullPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $pageBitmap = New-Object System.Drawing.Bitmap($PageWidth, $pageHeight)
    $pageBitmap.SetResolution(96, 96)
    $pageGraphics = [System.Drawing.Graphics]::FromImage($pageBitmap)
    $pageGraphics.Clear([System.Drawing.Color]::White)
    $pageGraphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $pageGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $pageGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $pageGraphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $pageGraphics.DrawImage($illustration, 0, 0, $PageWidth, $illustrationHeight)
    $pageGraphics.DrawImage($textBitmap, 0, $illustrationHeight, $PageWidth, $textHeight)

    $pageBitmap.Save($outputFullPath, [System.Drawing.Imaging.ImageFormat]::Png)

    [PSCustomObject]@{
        IllustrationPath = $illustrationFullPath
        TextImagePath = $textImageFullPath
        OutputPath = $outputFullPath
        Width = $PageWidth
        Height = $pageHeight
    }
}
finally {
    if ($pageGraphics) { $pageGraphics.Dispose() }
    if ($pageBitmap) { $pageBitmap.Dispose() }
    if ($textGraphics) { $textGraphics.Dispose() }
    if ($textBitmap) { $textBitmap.Dispose() }
    if ($stringFormat) { $stringFormat.Dispose() }
    if ($titleFont) { $titleFont.Dispose() }
    if ($bodyFont) { $bodyFont.Dispose() }
    if ($installedFonts) { $installedFonts.Dispose() }
    if ($measureGraphics) { $measureGraphics.Dispose() }
    if ($measureBitmap) { $measureBitmap.Dispose() }
    if ($illustration) { $illustration.Dispose() }
}
