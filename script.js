$(document).ready(function () {
    const getS = selector => document.querySelector(selector);

    let tm = 0;
    let ts = 60;
    let timerID;

    $('.first_box').sortable({
        connectWith: '#start, #end'
    })

    getS('.check').classList.add('butt_focus');
    getS('.check').disabled = true;

    $(function () {
        const parent = $("#start");
        const divs = parent.children();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    });

    $('.newGame').on('click', function () {
        const parent = $("#start");
        const divs = parent.children();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
        location.reload()
    })

    $('.start').on('click', function () {
        timerID = setInterval(watchTimer, 1000);
        getS('.start').classList.add('butt_focus');
        getS('.start').disabled = true;
        getS('.check').classList.remove('butt_focus');
        getS('.check').disabled = false;
        $('.container').off('mousedown');
    })

    $('.container').one('mousedown', function () {
        timerID = setInterval(watchTimer, 1000);
        getS('.start').classList.add('butt_focus');
        getS('.start').disabled = true;
        getS('.check').classList.remove('butt_focus');
        getS('.check').disabled = false;
    })

    function watchTimer() {
        ts--;
        if (ts < 0) {
            tm--;
            ts += 60;
        }
        if (tm < 0) {
            tm = 0
        }
        if (ts < 10) {
            if (tm < 10) {
                sec = getS('.timerLost').innerHTML = `0${tm}:0${ts}`
            }
            else {
                sec = getS('.timerLost').innerHTML = `${tm}:0${ts}`
            }
        }
        else {
            if (tm < 10) {
                sec = getS('.timerLost').innerHTML = `0${tm}:${ts}`
            }
            else {
                sec = getS('.timerLost').innerHTML = `${tm}:${ts}`
            }
        }

        if (tm == 0 && ts == 0) {
            clearInterval(timerID);
            alert(`It's a pity, but you lost`);
            getS('.check').disabled = true;
        }
        getS('.modal_box_sure').textContent = `You still have time, you sure?00:${ts}`;
    }

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let check = true;

    $('.check').on('click', function () {
        getS('.modal').style.display = 'block';
    })

    $('.close').on('click', function () {
        getS('.modal').style.display = 'none';
    })

    $('.check_img').on('click', function () {
        for (let i = 0; i < $('.box_img').length; i++) {
            if ($('.box_img').eq(i).text() != numbers[i]) {
                check = false;
                break;
            }
        }
        if (check) {
            getS('.modal2').style.display = 'block';
            getS('.modal').style.display = 'none';
            getS('.modal_box_sure2').textContent = `Woohoo, well done, you did it!`;
            clearInterval(timerID);
            getS('.check').classList.add('butt_focus');
            getS('.check').disabled = true;
        }
        else {
            getS('.modal2').style.display = 'block';
            getS('.modal').style.display = 'none';
            getS('.modal_box_sure2').textContent = `It's a pity, but you lost.`;
            clearInterval(timerID);
            getS('.check').classList.add('butt_focus');
            getS('.check').disabled = true;
        }
        check = true;
    })

    $('.close2').on('click', function () {
        getS('.modal2').style.display = 'none';
    })

})