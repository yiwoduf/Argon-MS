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
            qm.sendNext("뭐야, 내 팬인가? 드디어 이 라이더 카푸님의 명성이 메이플월드 방방곳곳에 퍼지기 시작했군. 미리 말하지만 내 싸인은 비싸거든, 한 1억 메소 정도? ");
        } else if (status == 1) {
            qm.sendNextPrev("도무지 유머를 모르는 친구로군.\r\n나를 소개하지. 내 이름은 카푸! 발음에 주의하라고.'카프'나'카뿌'로 발음한다면 엉덩이를 걷어차줄 테니 말이야. 크하핫!"); 
        } else if (status == 2) {
            qm.sendNextPrev("이런, 서두는 잡아떼고 본론부터? 마음에 드는 친구로군. 역시 인생에서 가장 중요한건 속도거든.\r\n암벽 거인에게 가는 길은 멀고도 높고도 험하기 때문에 걸어서 이동하는 것은 불가능해. 하지만 이 카푸님의 라이딩이 있다면 이야기는 달라지지! 물론 네가 조수 역할을 제대로 할 수 있다면."); 
        } else if (status == 3) {
           qm.sendYesNo("간단해. 앞으로 달리는 건 무조건 내가한다! 넌 조수석에 앉아서 나머지 역할을 맡아주면 되는거야. 백문이 불여일견.어디 한번 달려볼래, 친구?"); 
        } else if (status == 4) {
            qm.sendOk("마음에 들어, 친구! 그럼 달려보자고!");
            qm.forceStartQuest();
        }
    }
}