const pickr = new Pickr({

    // Selector or element which will be replaced with the actual color-picker.
    // Can be a HTMLElement.
    el: '.color-picker',

    // Where the pickr-app should be added as child.
    container: 'body',

    // Which theme you want to use. Can be 'classic', 'monolith' or 'nano'
    theme: 'monolith',

    // Nested scrolling is currently not supported and as this would be really sophisticated to add this
    // it's easier to set this to true which will hide pickr if the user scrolls the area behind it.
    closeOnScroll: false,

    // Don't replace 'el' Element with the pickr-button, instead use 'el' as a button.
    // If true, appendToBody will also be automatically true.
    useAsButton: false,

    // Size of gap between pickr (widget) and the corresponding reference (button) in px
    padding: 10,

    // If true pickr won't be floating, and instead will append after the in el resolved element.
    // It's possible to hide it via .hide() anyway.
    inline: true,

    // If true, pickr will be repositioned automatically on page scroll or window resize.
    // Can be set to false to make custom positioning easier.
    autoReposition: true,

    // Defines the direction in which the knobs of hue and opacity can be moved.
    // 'v' => opacity- and hue-slider can both only moved vertically.
    // 'hv' => opacity-slider can be moved horizontally and hue-slider vertically.
    // Can be used to apply custom layouts
    sliders: 'v',

    // Start state. If true 'disabled' will be added to the button's classlist.
    disabled: false,

    // If true, the user won't be able to adjust any opacity.
    // Opacity will be locked at 1 and the opacity slider will be removed.
    // The HSVaColor object also doesn't contain an alpha, so the toString() methods just
    // print HSV, HSL, RGB, HEX, etc.
    lockOpacity: true,

    // Precision of output string (only effective if components.interaction.input is true)
    outputPrecision: 0,

    // Defines change/save behavior:
    // - to keep current color in place until Save is pressed, set to `true`,
    // - to apply color to button and preview (save) in sync with each change
    //   (from picker or palette), set to `false`.
    comparison: true,

    // Default color. If you're using a named color such as red, white ... set
    // a value for defaultRepresentation too as there is no button for named-colors.
    default: '#42445a',

    // Optional color swatches. When null, swatches are disabled.
    // Types are all those which can be produced by pickr e.g. hex(a), hsv(a), hsl(a), rgb(a), cmyk, and also CSS color names like 'magenta'.
    // Example: swatches: ['#F44336', '#E91E63', '#9C27B0', '#673AB7'],
    swatches: null,

    // Default color representation of the input/output textbox.
    // Valid options are `HEX`, `RGBA`, `HSVA`, `HSLA` and `CMYK`.
    defaultRepresentation: 'HEX',

    // Option to keep the color picker always visible.
    // You can still hide / show it via 'pickr.hide()' and 'pickr.show()'.
    // The save button keeps its functionality, so still fires the onSave event when clicked.
    showAlways: false,

    // Close pickr with a keypress.
    // Default is 'Escape'. Can be the event key or code.
    // (see: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
    closeWithKey: 'Escape',

    // Defines the position of the color-picker.
    // Any combinations of top, left, bottom or right with one of these optional modifiers: start, middle, end
    // Examples: top-start / right-end
    // If clipping occurs, the color picker will automatically choose its position.
    // Pickr uses https://github.com/Simonwep/nanopop as positioning-engine.
    position: 'bottom-middle',

    // Enables the ability to change numbers in an input field with the scroll-wheel.
    // To use it set the cursor on a position where a number is and scroll, use ctrl to make steps of five
    adjustableNumbers: true,

    // Show or hide specific components.
    // By default only the palette (and the save button) is visible.
    components: {

        // Defines if the palette itself should be visible.
        // Will be overwritten with true if preview, opacity or hue are true
        palette: true,

        preview: true, // Display comparison between previous state and new color
        opacity: false, // Display opacity slider
        hue: true,     // Display hue slider

        // show or hide components on the bottom interaction bar.
        interaction: {

            // Buttons, if you disable one but use the format in default: or setColor() - set the representation-type too!
            hex: true,  // Display 'input/output format as hex' button  (hexadecimal representation of the rgba value)
            rgba: true, // Display 'input/output format as rgba' button (red green blue and alpha)
            hsla: false, // Display 'input/output format as hsla' button (hue saturation lightness and alpha)
            hsva: false, // Display 'input/output format as hsva' button (hue saturation value and alpha)
            cmyk: false, // Display 'input/output format as cmyk' button (cyan mangenta yellow key )

            input: true, // Display input/output textbox which shows the selected color value.
                         // the format of the input is determined by defaultRepresentation,
                         // and can be changed by the user with the buttons set by hex, rgba, hsla, etc (above).
            cancel: false, // Display Cancel Button, resets the color to the previous state
            clear: false, // Display Clear Button; same as cancel, but keeps the window open
            save: false,  // Display Save Button,
        },
    },
});

pickr.on('init', instance => {
    update(pickr)
});

pickr.on('change', instance => {
    update(pickr)
});

function update(pickr) {
    let HEX = pickr.getColor().toHEXA().toString();
    document.getElementById("HEX_in").innerHTML = HEX;

    let RGB = Colors.hex2rgb(HEX).RGB;
    document.getElementById("RGB_in").innerHTML = RGB;
    
    document.getElementById("COLOR_in").style.backgroundColor = HEX;
}
