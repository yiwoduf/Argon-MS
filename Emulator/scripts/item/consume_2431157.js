癤워ar status;

function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.gainSponserItem(1052671,'[청]',300,50,0);
            cm.gainSponserItem(1003541,'[청]',500,50,0);
            cm.gainSponserItem(1112940,'[청]',500,50,0);
            cm.gainSponserItem(1142282,'[청]',2000,300,0);
            cm.gainSponserItem(1112184,'[청]',500,50,0);
            cm.gainSponserItem(3700148,'[청]',1,3,0);
	    
	    
	    
	    
	    cm.gainItem(4310129, 100);
	    cm.gainItem(2431110, 1);
            cm.gainMeso(100000000);
	    cm.gainItem(2431157,-1);
	    cm.dispose();
        } else { 
            cm.dispose();
        }
    }
}