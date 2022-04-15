function enter(pi) {
    if (pi.getPlayer().getMapId() == 401060399) {
        pi.openNpc(3001032);
    } else {
        pi.openNpc(3001020);
    }
    pi.dispose();
}