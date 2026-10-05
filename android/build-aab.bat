@echo off
echo ===================================================
echo   KiddoTube Android App Bundle (.aab) Builder
echo ===================================================
echo.

set JAVA_HOME=C:\Program Files\Java\jdk-17

if not exist "%JAVA_HOME%" (
    set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
)

echo Using JAVA_HOME: %JAVA_HOME%
echo.

cd /d "%~dp0"

echo Building Android App Bundle (.aab)...
"C:\Users\Shaharukh Mithagari\.gradle\wrapper\dists\gradle-8.14-all\c2qonpi39x1mddn7hk5gh9iqj\gradle-8.14\bin\gradle.bat" bundleRelease

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo SUCCESS! AAB Generated at:
    echo %~dp0app\build\outputs\bundle\release\app-release.aab
    echo ===================================================
) else (
    echo.
    echo ===================================================
    echo BUILD FAILED!
    echo ===================================================
)

pause
