import { useEffect } from 'react';
import { daisyui } from '../../config'
import { themeChange } from 'theme-change'
function ThemeManager() {
    useEffect(() => {
        themeChange(false)
    }, [])
    const themes = [
        {
            name: "Default",
            value: ""
        },
        ...daisyui.themes.map((e) => {
            return {
                name: capitalizeFirstLetter(e),
                value: e
            };
        })
    ];
    return (
        <div className="dropdown dropdown-end">
            <select data-choose-theme className="select select-bordered w-full max-w-xs">
                {themes.map((theme) => (
                    <option value={theme.value}>{theme.name} </option>
                ))}
            </select>
        </div>
    )
}

function capitalizeFirstLetter(word: string) {
    return word.replace(/^\w/, (c) => c.toUpperCase());
}

export default ThemeManager