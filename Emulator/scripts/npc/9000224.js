/*

	치우씨 :: projectchiu16@nate.com
	오로라온라인 개발자 '치우씨' 작성

*/

importPackage(java.lang);
var status = -1;
var gp_required = 1000; // 필요한 환생 포인트
var hit = 1; // 추가 타수
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    }
    if (mode == 0 || mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("#fs13##r#fn나눔고딕 EXtrabold#한번 더 때려보지그래! 오로라온라인 추가타수 시스템!\r\n추가타수란 공격횟수가 타수당 곱하기가 되서 한번에 더 강한 데미지를 가하는 시스템이야.\r\n구매당 " + hit + " 타수가 캐릭터에 추가된다구!\r\n\r\n 현재 X타수 : "+cm.getPlayer().getAddDamageHit()+"번 어택#l#k\r\n\r\n#fs15##L1#환생포인트 " + gp_required + " 로 거래하겠어.#fs13#\r\n#l\r\n   (현재 보유하고 있는 환생 포인트 : "+cm.getPlayer().getGP()+")\r\n#b#L2#타격수를 올리면 강해지나?\r\n#r");
    } else if (status == 1) {
if (selection == 1) {
        if (cm.getPlayer().getAddDamageHit() + hit > 99) {
            cm.sendOk("살살때리라구, 100번 이하 의 타격수만 가능해!");
            cm.dispose();
        } else if (cm.getPlayer().getGP() > gp_required) {
            cm.getPlayer().gainGP(-gp_required);
            cm.getPlayer().gainAddDamageHit(hit);
            cm.sendOk("너의 타격횟수가 증가했어.");
            cm.dispose();
        } else {
            cm.sendOk("환생 포인트가 부족하군");
            cm.dispose();
        }

} else if (selection == 2) {
	cm.sendOk("공격의 횟수를 늘려줍니다. (예. 한번의 어택데미지가 100 일경우 X '타수' 의 데미지가 적용이 됩니다.)");
	cm.dispose();
}
}
}