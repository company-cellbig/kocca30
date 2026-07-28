# pptx_author.ps1
# 위키 마크다운(H1=간지 부, H2=내지 슬라이드)을 셀빅 발표문 자동화 양식(pptm)으로 변환함.
# 매크로 규약: 간지 Placeholders(1)=제목/(2)=번호/(3)=목차, 내지 (1)=제목/(2)=헤더는
# 템플릿 내장 VBA(MainManager.Main)가 채우므로 본 스크립트는 제목과 본문만 채움.
# 글머리 수준별 스타일 값은 템플릿 VBA TextBoxCustom.ApplyBulletStyle과 동일하게 유지할 것.
#
# 사용:
#   powershell -File scripts\pptx_author.ps1 -InputMd <문서.md> [-OutputPptm <출력.pptm>]
#     [-TemplatePptm <템플릿.pptm>] [-CoverOrg <기관>] [-CoverDept <부서>] [-CoverDate <yyyy.MM.dd>]
#     [-ExportPngDir <검증용 PNG 폴더>]
#
# 입력 규약:
#   - H1(# n. 제목) = 간지(챕터), H2(## n.n 제목) = 내지 슬라이드 1장
#   - H2 아래 H3가 있으면 이름이 '슬라이드'로 끝나는 H3 본문만 사용(프롬프트 H3 등 제외),
#     H3가 없으면 H2 본문 전체 사용
#   - "> **발표 노트**: ..." 블록은 발표자 노트로, 그 외 인용블록은 본문 도입 문장으로
#   - 표, 불릿(탭 중첩), 일반 문단 지원. 코드 펜스 블록은 건너뜀

param(
    [Parameter(Mandatory = $true)][string]$InputMd,
    [string]$OutputPptm = "",
    [string]$TemplatePptm = "",
    [string]$CoverOrg = "",
    [string]$CoverDept = "",
    [string]$CoverDate = "",
    [string]$ExportPngDir = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot

if ($TemplatePptm -eq "") {
    $TemplatePptm = Join-Path $repoRoot "assets\셀빅_템플릿1_16b9_매크로_v.1.0.0.pptm"
}
if ($CoverDate -eq "") { $CoverDate = Get-Date -Format "yyyy.MM.dd" }
if ($CoverOrg -eq "") { $CoverOrg = "(주)셀빅" }

$InputMd = (Resolve-Path $InputMd).Path
if (-not (Test-Path $TemplatePptm)) { throw "템플릿 없음: $TemplatePptm" }
$TemplatePptm = (Resolve-Path $TemplatePptm).Path

if ($OutputPptm -eq "") {
    $exportDir = Join-Path $repoRoot "export"
    if (-not (Test-Path $exportDir)) { New-Item -ItemType Directory $exportDir | Out-Null }
    $base = [IO.Path]::GetFileNameWithoutExtension($InputMd)
    $OutputPptm = Join-Path $exportDir ($base + ".pptm")
}

# ---------------------------------------------------------------- 마크다운 파싱

function Clean-Inline([string]$s) {
    # wikilink: [[a|b]] -> b, [[a#b]] -> b, [[a]] -> a
    $s = [regex]::Replace($s, '\[\[([^\]\|#]*)(?:#([^\]\|]*))?(?:\|([^\]]*))?\]\]', {
        param($m)
        if ($m.Groups[3].Success) { return $m.Groups[3].Value }
        if ($m.Groups[2].Success) { return $m.Groups[2].Value }
        return $m.Groups[1].Value
    })
    $s = $s -replace '\*\*([^\*]*)\*\*', '$1'
    $s = $s -replace '(?<!\S)\*([^\*]+)\*(?!\S)', '$1'
    $s = $s -replace '`([^`]*)`', '$1'
    $s = $s -replace '<br\s*/?>', ' '
    return $s.Trim()
}

function Strip-HeadingNumber([string]$s) {
    return ($s -replace '^\s*\d+(\.\d+)*[\.\)]?\s+', '').Trim()
}

$lines = Get-Content $InputMd -Encoding UTF8
$presTitle = [IO.Path]::GetFileNameWithoutExtension($InputMd)

# frontmatter title
if ($lines.Count -gt 0 -and $lines[0] -eq '---') {
    for ($i = 1; $i -lt [Math]::Min($lines.Count, 40); $i++) {
        if ($lines[$i] -eq '---') { break }
        if ($lines[$i] -match '^title:\s*(.+)$') { $presTitle = $Matches[1].Trim() }
    }
}

# 슬라이드 요소 모델:
#   chapter = @{ Title; Slides = [list] }
#   slide   = @{ Title; Elements = [list]; Notes = [text] }
#   element = @{ Kind = para|bullet|table; Text; Level; Rows }
$chapters = New-Object System.Collections.ArrayList
$curChapter = $null
$curSlide = $null
$capture = $true
$inFence = $false
$inNoteBlock = $false
$tableBuf = New-Object System.Collections.ArrayList

function Flush-Table {
    if ($tableBuf.Count -gt 0 -and $null -ne $curSlide) {
        $rows = New-Object System.Collections.ArrayList
        foreach ($r in $tableBuf) {
            $cells = @($r.Trim().Trim('|').Split('|') | ForEach-Object { Clean-Inline $_ })
            $isSep = $true
            foreach ($c in $cells) { if ($c -notmatch '^:?-{2,}:?$') { $isSep = $false } }
            if (-not $isSep) { [void]$rows.Add($cells) }
        }
        if ($rows.Count -gt 0) {
            [void]$curSlide.Elements.Add(@{ Kind = 'table'; Rows = $rows })
        }
    }
    $tableBuf.Clear()
}

foreach ($rawLine in $lines) {
    $line = $rawLine

    if ($line -match '^```') { $inFence = -not $inFence; continue }
    if ($inFence) { continue }

    if ($line -match '^#\s+(.+)$') {
        Flush-Table
        $curChapter = @{ Title = (Strip-HeadingNumber $Matches[1]); Slides = (New-Object System.Collections.ArrayList) }
        [void]$chapters.Add($curChapter)
        $curSlide = $null
        $capture = $true
        $inNoteBlock = $false
        continue
    }
    if ($line -match '^##\s+(.+)$') {
        Flush-Table
        if ($null -eq $curChapter) {
            $curChapter = @{ Title = ""; Slides = (New-Object System.Collections.ArrayList) }
            [void]$chapters.Add($curChapter)
        }
        $curSlide = @{ Title = (Strip-HeadingNumber $Matches[1]); Elements = (New-Object System.Collections.ArrayList); Notes = "" }
        [void]$curChapter.Slides.Add($curSlide)
        $capture = $true
        $inNoteBlock = $false
        continue
    }
    if ($line -match '^###+\s+(.+)$') {
        Flush-Table
        $h3 = Strip-HeadingNumber $Matches[1]
        $capture = ($h3 -match '슬라이드\s*$')
        $inNoteBlock = $false
        continue
    }

    if ($null -eq $curSlide -or -not $capture) { continue }

    if ($line -match '^\|.*\|\s*$') {
        [void]$tableBuf.Add($line)
        $inNoteBlock = $false
        continue
    }
    Flush-Table

    if ($line -match '^>\s?(.*)$') {
        $q = $Matches[1].Trim()
        if ($q -match '^\*\*발표\s*노트\*\*\s*:?\s*(.*)$') {
            $inNoteBlock = $true
            $txt = Clean-Inline $Matches[1]
            if ($curSlide.Notes -ne "") { $curSlide.Notes += "`r" }
            $curSlide.Notes += $txt
        }
        elseif ($inNoteBlock) {
            $curSlide.Notes += " " + (Clean-Inline $q)
        }
        elseif ($q -ne "") {
            [void]$curSlide.Elements.Add(@{ Kind = 'para'; Text = (Clean-Inline $q); Level = 0 })
        }
        continue
    }
    $inNoteBlock = $false

    if ($line -match '^(\t*)((?:  )*)- (.+)$') {
        $lvl = 1 + $Matches[1].Length + ($Matches[2].Length / 2)
        [void]$curSlide.Elements.Add(@{ Kind = 'bullet'; Text = (Clean-Inline $Matches[3]); Level = [int]$lvl })
        continue
    }

    $plain = $line.Trim()
    if ($plain -ne "" -and $plain -notmatch '^!\[') {
        [void]$curSlide.Elements.Add(@{ Kind = 'para'; Text = (Clean-Inline $plain); Level = 0 })
    }
}
Flush-Table

$slideTotal = 0
foreach ($ch in $chapters) { $slideTotal += $ch.Slides.Count }
Write-Host ("파싱 완료: 챕터 {0}개, 내지 슬라이드 {1}장" -f $chapters.Count, $slideTotal)

# ---------------------------------------------------------------- PPT 생성

Copy-Item $TemplatePptm $OutputPptm -Force
try { Unblock-File $OutputPptm -ErrorAction Stop } catch {}

$wasRunning = $null -ne (Get-Process POWERPNT -ErrorAction SilentlyContinue)

$app = New-Object -ComObject PowerPoint.Application
$app.AutomationSecurity = 1   # msoAutomationSecurityLow: 내장 매크로 실행 허용

$pres = $app.Presentations.Open($OutputPptm, $false, $false, $true)

try {
    # 레이아웃 검색
    $layouts = @{}
    foreach ($lay in $pres.SlideMaster.CustomLayouts) { $layouts[$lay.Name] = $lay }
    foreach ($need in @('표지', '간지', '내지 기본', '뒷표지')) {
        if (-not $layouts.ContainsKey($need)) { throw "템플릿에 '$need' 레이아웃이 없음" }
    }

    # 가이드 슬라이드 전체 삭제
    for ($i = $pres.Slides.Count; $i -ge 1; $i--) { $pres.Slides.Item($i).Delete() }

    # 글머리 수준별 스타일 (템플릿 VBA ApplyBulletStyle과 동일 값)
    $grayRGB = 64 + 64 * 256 + 64 * 65536
    $tealRGB = 0 + 128 * 256 + 128 * 65536
    $bulletStyles = @{
        1 = @{ Char = 8226; Size = 16; Bold = $true;  Color = $tealRGB; Indent = 14.17 }
        2 = @{ Char = 8211; Size = 14; Bold = $true;  Color = $grayRGB; Indent = 28.35 }
        3 = @{ Char = 8226; Size = 14; Bold = $false; Color = $grayRGB; Indent = 42.52 }
        4 = @{ Char = 45;   Size = 14; Bold = $false; Color = $grayRGB; Indent = 56.7 }
        5 = @{ Char = 187;  Size = 14; Bold = $false; Color = $grayRGB; Indent = 70.87 }
    }

    # 내지 본문 영역 (pt, 슬라이드 960x540. 제목 하단 ~ 슬라이드 번호 위)
    $bodyX = 40.0; $bodyY = 78.0; $bodyW = 880.0; $bodyMaxY = 528.0

    function Add-BodyTextbox($slide, $elements, [double]$y) {
        $box = $slide.Shapes.AddTextbox(1, $bodyX, $y, $bodyW, 20)
        $tf = $box.TextFrame2
        $tf.WordWrap = $true
        $tr = $tf.TextRange
        $texts = @($elements | ForEach-Object { $_.Text })
        $tr.Text = ($texts -join "`r")
        # TextRange2.Paragraphs.Count는 PowerShell COM 바인딩에서 안 풀리므로 요소 수로 순회함
        for ($p = 1; $p -le $elements.Count; $p++) {
            $para = $tr.Paragraphs($p, 1)
            $el = $elements[$p - 1]
            $para.Font.NameFarEast = "맑은 고딕"
            $para.Font.Name = "맑은 고딕"
            if ($el.Kind -eq 'bullet') {
                $lvl = [Math]::Min([Math]::Max([int]$el.Level, 1), 5)
                $st = $bulletStyles[$lvl]
                $para.ParagraphFormat.IndentLevel = $lvl
                $para.ParagraphFormat.Bullet.Type = 1          # msoBulletUnnumbered
                $para.ParagraphFormat.Bullet.Character = $st.Char
                $para.ParagraphFormat.LeftIndent = $st.Indent
                $para.ParagraphFormat.FirstLineIndent = -14.17
                $para.Font.Size = $st.Size
                if ($st.Bold) { $para.Font.Bold = -1 } else { $para.Font.Bold = 0 }
                $para.Font.Fill.ForeColor.RGB = $st.Color
            }
            else {
                $para.ParagraphFormat.Bullet.Visible = 0
                $para.Font.Size = 14
                $para.Font.Bold = 0
                $para.Font.Fill.ForeColor.RGB = $grayRGB
            }
            $para.ParagraphFormat.SpaceAfter = 4
        }
        $tf.AutoSize = 1   # msoAutoSizeShapeToFitText
        return $box.Top + $box.Height
    }

    function Add-BodyTable($slide, $rows, [double]$y) {
        $nRows = $rows.Count
        $nCols = ($rows | ForEach-Object { $_.Count } | Measure-Object -Maximum).Maximum
        $shape = $slide.Shapes.AddTable($nRows, $nCols, $bodyX, $y, $bodyW, 20 * $nRows)
        $tbl = $shape.Table
        for ($r = 1; $r -le $nRows; $r++) {
            $rowCells = $rows[$r - 1]
            for ($c = 1; $c -le $nCols; $c++) {
                $val = ""
                if ($c -le $rowCells.Count) { $val = $rowCells[$c - 1] }
                $cellTr = $tbl.Cell($r, $c).Shape.TextFrame2.TextRange
                $cellTr.Text = $val
                $cellTr.Font.NameFarEast = "맑은 고딕"
                $cellTr.Font.Name = "맑은 고딕"
                $cellTr.Font.Size = 11
                if ($r -eq 1) { $cellTr.Font.Bold = -1 } else { $cellTr.Font.Bold = 0 }
            }
        }
        # 셀 채움 중 커진 행 높이를 압축함 (지정값 이하로는 내용 최소 높이 유지)
        for ($r = 1; $r -le $nRows; $r++) { $tbl.Rows.Item($r).Height = 13 }
        return $shape.Top + $shape.Height
    }

    # 표지
    $cover = $pres.Slides.AddSlide(1, $layouts['표지'])
    $ph = $cover.Shapes.Placeholders
    if ($ph.Count -ge 1) { $ph.Item(1).TextFrame.TextRange.Text = $presTitle }
    if ($ph.Count -ge 2) { $ph.Item(2).TextFrame.TextRange.Text = $CoverOrg }
    if ($ph.Count -ge 3) { $ph.Item(3).TextFrame.TextRange.Text = $CoverDate }
    if ($ph.Count -ge 4) { $ph.Item(4).TextFrame.TextRange.Text = $CoverDept }

    $overflowWarn = New-Object System.Collections.ArrayList

    foreach ($ch in $chapters) {
        if ($ch.Slides.Count -eq 0) { continue }

        $ganji = $pres.Slides.AddSlide($pres.Slides.Count + 1, $layouts['간지'])
        $ganji.Shapes.Placeholders.Item(1).TextFrame.TextRange.Text = $ch.Title
        # (2) 번호, (3) 목차는 MainManager.Main이 채움

        foreach ($sl in $ch.Slides) {
            $naeji = $pres.Slides.AddSlide($pres.Slides.Count + 1, $layouts['내지 기본'])
            $naeji.Shapes.Placeholders.Item(1).TextFrame.TextRange.Text = $sl.Title
            # (2) 헤더는 MainManager.Main이 채움

            $y = $bodyY
            $textRun = New-Object System.Collections.ArrayList
            foreach ($el in $sl.Elements) {
                if ($el.Kind -eq 'table') {
                    if ($textRun.Count -gt 0) {
                        $y = (Add-BodyTextbox $naeji $textRun $y) + 6
                        $textRun.Clear()
                    }
                    $y = (Add-BodyTable $naeji $el.Rows $y) + 8
                }
                else {
                    [void]$textRun.Add($el)
                }
            }
            if ($textRun.Count -gt 0) {
                $y = (Add-BodyTextbox $naeji $textRun $y) + 6
            }
            if ($y -gt $bodyMaxY) {
                [void]$overflowWarn.Add(("{0} (본문 하단 {1}pt > {2}pt)" -f $sl.Title, [Math]::Round($y), $bodyMaxY))
            }

            if ($sl.Notes -ne "") {
                try {
                    $naeji.NotesPage.Shapes.Placeholders.Item(2).TextFrame.TextRange.Text = $sl.Notes
                } catch {
                    Write-Host ("발표자 노트 기록 실패: {0}" -f $sl.Title)
                }
            }
        }
    }

    # 뒷표지
    [void]$pres.Slides.AddSlide($pres.Slides.Count + 1, $layouts['뒷표지'])

    # 템플릿 내장 자동화 실행 (간지 넘버링/목차, 내지 헤더, 텍스트 스타일)
    # Application.Run은 ParamArray 시그니처라 PowerShell 직접 호출이 안 되어 리플렉션으로 호출함
    $macroRan = $false
    foreach ($macroName in @(($pres.Name + "!MainManager.Main"), "MainManager.Main")) {
        if (-not $macroRan) {
            try {
                [void]$app.GetType().InvokeMember("Run", [Reflection.BindingFlags]::InvokeMethod, $null, $app, @($macroName))
                $macroRan = $true
            } catch {}
        }
    }
    if (-not $macroRan) { Write-Host "경고: 내장 매크로(MainManager.Main) 실행 실패. 간지 번호/목차/헤더가 비어 있음" }

    $pres.Save()

    if ($ExportPngDir -ne "") {
        if (-not (Test-Path $ExportPngDir)) { New-Item -ItemType Directory $ExportPngDir | Out-Null }
        for ($i = 1; $i -le $pres.Slides.Count; $i++) {
            $pres.Slides.Item($i).Export((Join-Path $ExportPngDir ("slide{0:d2}.png" -f $i)), "PNG", 1280, 720)
        }
        Write-Host ("검증용 PNG {0}장 내보냄: {1}" -f $pres.Slides.Count, $ExportPngDir)
    }

    Write-Host ("생성 완료: {0} (슬라이드 {1}장, 매크로 실행 {2})" -f $OutputPptm, $pres.Slides.Count, $macroRan)
    if ($overflowWarn.Count -gt 0) {
        Write-Host "본문 넘침 의심 슬라이드 (수동 분할/축약 필요):"
        foreach ($w in $overflowWarn) { Write-Host ("  - " + $w) }
    }
}
finally {
    $pres.Close()
    if (-not $wasRunning -and $app.Presentations.Count -eq 0) { $app.Quit() }
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($app)
}
