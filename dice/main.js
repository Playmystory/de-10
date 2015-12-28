"use strict";

function dice_initialize(container, w, h) {
    $t.remove($t.id('loading_text'));

    var canvas = $t.id('canvas');
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    var label = $t.id('label');
    var clearBtn = $t.id('clear');
    var set = $t.id('set');
    var selector_div = $t.id('selector_div');
    var info_div = $t.id('info_div');

    on_set_change();

    clearBtn.style.display = 'none';
    set.style.visibility = 'hidden';

    function on_set_change(ev) { set.style.width = set.value.length + 3 + 'ex'; }
    $t.bind(set, 'mousedown', function(ev) { ev.stopPropagation(); });
    $t.bind(set, 'mouseup', function(ev) { ev.stopPropagation(); });
    $t.bind(set, 'focus', function(ev) { $t.set(container, { class: '' }); });
    $t.bind(set, 'blur', function(ev) { $t.set(container, { class: 'svg' }); });



    var box = new $t.dice.dice_box(canvas);

    function show_selector() {
        info_div.style.display = 'none';
        selector_div.style.display = 'inline-block';
        box.draw_selector();
    }

    function before_roll(vectors) {
        info_div.style.display = 'none';
        selector_div.style.display = 'none';
    }

    function notation_getter() {
        return $t.dice.parse_notation(set.value);
    }

    function after_roll(notation, result) {
        var res = result.join(' ');
        if (notation.constant) res += ' +' + notation.constant;
        if (result.length > 1) res += ' = ' +
                (result.reduce(function(s, a) { return s + a; }) + notation.constant);
        label.innerHTML = res;
        info_div.style.display = 'inline-block';
        selector_div.style.display = 'none';
    }


    box.bind_throw($t.id('throw'), notation_getter, before_roll, after_roll);

    var params = $t.get_url_params();
    if (params.notation) {
        set.value = params.notation;
    }
    if (params.roll) {
        $t.raise_event($t.id('throw'));
    }
    else {
        show_selector();
    }
}
