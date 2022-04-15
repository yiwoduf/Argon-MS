
function enter(pi) {
    if (pi.getPlayer().getMapId() == 271040000 || pi.getPlayer().getMapId() == 271040100) {
        pi.openNpc(2143004, "Cygnus");
    } else {
        pi.openNpc(2143004, "EasyCygnus");
    }
    return false;
}