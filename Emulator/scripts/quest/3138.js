/*
파란돌륜군
*/
importPackage(Packages.server.quest);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        qm.dispose();
        return;
    } else {
        status++;
        if (status == 0) {
            qm.sendNext("\r\n이 편지를 읽는 모험가에게.\r\n\r\n나는 크로스헌터의 요원 #b비스트#k라고 하네. 거두절미하고 말하지. 우리 크로스헌터의 요원들은 메이플 월드 각지를 돌아다니며 어둠의 몬스터를 처치하는 것을 주 임무로 하고있지. ");
        } else if (status == 1) {
            qm.sendNextPrev("\r\n그런데 지금 내가 있는 이 곳, #r사자왕의 성#k에 그동안 볼 수 없었던 강력한 어둠의 기운이 넘실대고 있어. 엘나스의 차디찬 바람보다 더욱 시린 공포가 느껴지네."); 
        } else if (status == 2) {
            qm.sendYesNo("내 임무를 완수하기 위해서는 자네와 같은 뛰어난 모험가가 필요한 시점이야. 내게 도움을 주고 싶다면 다음 장을 읽게.");
        } else if (status == 3) {
            qm.sendOk("고맙군. 이 장을 보고 있다면 나를 돕기로 마음 먹은 것이겠지. 시간이 없기 때문에 편지에 의뢰서를 넣었두었어.편지를 다 읽으면 내가 있는 곳으로 골드리치란 상인이 이동시켜줄것이네.그럼, 조금 뒤에 보자고.");
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}