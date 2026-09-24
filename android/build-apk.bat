@echo off
echo ===================================================
echo   KiddoTube Android APK Builder
echo ===================================================
echo.

set JAVA_HOME=C:\Program Files\Java\jdk-17

if not exist "%JAVA_HOME%" (
    set JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
)

echo Using JAVA_HOME: %JAVA_HOME%
echo.

cd /d "%~dp0"

echo Building Debug APK...
"C:\Users\Shaharukh Mithagari\.gradle\wrapper\dists\gradle-8.14-all\c2qonpi39x1mddn7hk5gh9iqj\gradle-8.14\bin\gradle.bat" assembleDebug

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo SUCCESS! APK Generated at:
    echo %~dp0app\build\outputs\apk\debug\app-debug.apk
    echo ===================================================
) else (
    echo.
    echo ===================================================
    echo BUILD FAILED!
    echo If Android SDK path is missing, open Android Studio at
    echo C:\Program Files\Android\Android Studio
    echo to complete Android SDK 34 download, then re-run this script.
    echo ===================================================
)

pause
