/*
 * 감옥
 */

function enter(pi) {
    //if (!pi.haveItem(4032860, 1)) {
    //    pi.getPlayer().message("열쇠가 없어 탈출할 수 없습니다.");
    //    return false;
   // } else {
      //  pi.getMap().resetReactors();
       // pi.gainItem(4032860, -1);
        pi.warp(211070100);
        return true;
   // }
}