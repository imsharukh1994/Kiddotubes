$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$sdkDir = "$env:LOCALAPPDATA\Android\Sdk"
Write-Host "SDK Target Directory: $sdkDir"

if (-not (Test-Path $sdkDir)) {
    New-Item -ItemType Directory -Force -Path $sdkDir | Out-Null
}

$zipPath = "$env:TEMP\cmdline-tools-v2.zip"
$url = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"

Write-Host "Downloading Google Android Command Line Tools..."
Invoke-WebRequest -Uri $url -OutFile $zipPath
Write-Host "Download finished ($((Get-Item $zipPath).Length) bytes)."

Write-Host "Extracting Command Line Tools..."
$tempExtract = "$env:TEMP\cmdline-tools-extracted"
if (Test-Path $tempExtract) { Remove-Item $tempExtract -Recurse -Force }
Expand-Archive -Path $zipPath -DestinationPath $tempExtract -Force

$latestDir = "$sdkDir\cmdline-tools\latest"
New-Item -ItemType Directory -Force -Path $latestDir | Out-Null

Copy-Item -Path "$tempExtract\cmdline-tools\*" -Destination $latestDir -Recurse -Force

Remove-Item $zipPath -Force -ErrorAction SilentlyContinue
Remove-Item $tempExtract -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Extracted successfully! Checking sdkmanager.bat..."
$sdkManager = "$latestDir\bin\sdkmanager.bat"
if (Test-Path $sdkManager) {
    Write-Host "sdkmanager.bat verified at: $sdkManager"
} else {
    Write-Error "sdkmanager.bat not found!"
}

# Write local.properties
$localProp = "D:\Shaharukh_projects\Kiddotubes\android\local.properties"
$escapedSdk = $sdkDir -replace '\\', '/'
Set-Content -Path $localProp -Value "sdk.dir=$escapedSdk"
Write-Host "Updated local.properties -> sdk.dir=$escapedSdk"
