/*
 * Javascript for handling the doors of the QEMU advent calendar.
 *
 * Copyright (c) 2018 Thomas Huth
 *
 * Licensed under the MIT license.
 */

function set_door_cookie(val) {
    var date = new Date();
    date.setTime(date.getTime() + (26 * 24 * 60 * 60 * 1000));
    document.cookie = "doors2018=" + val + ";" + "expires="+ date.toUTCString();
}

function get_door_cookie() {
     var ca = document.cookie.split(';');
     for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') {
               c = c.substring(1);
          }
          if (c.indexOf("doors2018") == 0) {
               return c.substring(10, c.length);
          }
     }
     return 0;
}

var doors = 0 + get_door_cookie();


var preload_zonk = new Image();
preload_zonk.src = 'images/zonk.png';
function zonk(id)
{
     document.getElementById('img-' + id).src = 'images/zonk.png';
     document.getElementById('desc-' + id).innerHTML = '<p class="lead">Please do not open the doors too early!</p>';
}

function initdoor(id, titletxt)
{
     /* Check door cookie - if it has been opened before, leave it open */
     if ((doors & (1 << id.slice(-2))) != 0) {
         document.getElementById('img-' + id).src = 'images/' + id + '.png';
         document.getElementById('title-' + id).innerHTML = titletxt;
         return;
     }

     var desc = document.getElementById('desc-' + id);
     desc.getElementsByTagName('p')[0].style.display = 'none';
     desc.getElementsByTagName('p')[1].style.display = 'none';
     var defch = document.createElement("p");
     defch.id = 'defdesc-' + id;
     defch.innerHTML = 'Click on the door to reveal the surprise<br/>or click the download button directly to keep yourself in suspense.';
     desc.appendChild(defch);
}

function opendoor(id, titletxt)
{
     document.getElementById('img-' + id).src = 'images/' + id + '.png';
     document.getElementById('title-' + id).innerHTML = titletxt;
     var desc = document.getElementById('desc-' + id);
     desc.removeChild(document.getElementById('defdesc-' + id));
     desc.getElementsByTagName('p')[0].style.display = 'block';
     desc.getElementsByTagName('p')[1].style.display = 'block';
     doors = doors | (1 << id.slice(-2));
     set_door_cookie(doors);
}
