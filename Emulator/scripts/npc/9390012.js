importPackage(Packages.tools.RandomStream);
var status = -1;

function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {

    hpoint = 5000; //필요한 후원포인트
    gpoint1 = 1000; //랜덤최소
    gpoint2 = 10000; //랜덤최대

    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
           status++;
    }
    if (status == 0) {
        말 = "후원포인트를 걸고, 나랑 도박 한 번 하는거 어때?\r\n"
        말+= "#b"+hpoint+"포인트#k로 자그마치 #ㅠ"+gpoint2+"#k포인트 까지 벌 수 있다고!\r\n";
        말+= "물론... 조금 잃을 수 도 있지만 말이야!\r\n\r\n"
        말+= "#L0# #d후원포인트로 도박을 해 볼래!"
        cm.sendSimple(말);
    } else if (status == 1) {
        if (hpoint > 0) {
            g1 = Math.floor(Math.random() * 100)
            if (g1>20) {
                g2 = Randomizer.rand(gpoint1,hpoint)
            } else {
                g2 = Randomizer.rand(gpoint1,gpoint2);
            }
            말 = "오.. "+hpoint+"포인트를 투자한 결과가 나왔어!\r\n"
            말+= ""+g2+"포인트를 획득했구나!\r\n"
            말+= "만족한 결과면 다행이고, 만족하지 못해도 실망하지마!";
            cm.sendOk(말);
            cm.gainRC(-hpoint);
            cm.gainRC(g2);
            cm.dispose()l
         } else {
            cm.sendOk("음... 뭔가 상황이 잘못된 것 같은데?\r\n운영진께 문의를 줄 수 있겠니?");
            cm.dispose();
         }
    }
}