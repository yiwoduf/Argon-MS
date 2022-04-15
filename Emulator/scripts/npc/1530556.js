var status = -1;
var time = "#fUI/UIToolTip/Item/Equip/Star/Star#"
function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
  
        var choose = "#fn나눔고딕 Extrabold##fs13# 오로라온라인의 뽑기 담당 껨디에여 !#k";
           choose += "\r\n#L1##fs 13##i3010097##e#b  랜덤 의자 뽑기#d ( 예쁜 의자를 얻어보자구!)#k";
        //   choose += "\r\n#L2##fs 13##i2432291##e#b  해외 캐쉬 뽑기#d (한층 이쁜 해외캐쉬들을?)#n#l#k";

        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.openNpc (1022107);
 } else if (s == 1) {
  cm.openNpc (9040000);

 } else if (s == 2) {
  cm.openNpc (9001132);

        }
    }
}
