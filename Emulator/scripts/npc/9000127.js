/*
제작, Lilin_
*/
importPackage(Packages.constants);
importPackage(Packages.packet.creators);
importPackage(Packages.launch.world);

var status = 0;
var correctAnswer = 0;
var getServerName = ServerConstants.serverName; //서버 이름 뽑아오기

var map = 109090200; //전직맵 으로 , 늑대진영 대기실
var npc = 2007; //엔피씨 코드 써주셔야 이름이 정확하게 뜹니당~

var q = new Array//"문제#1번답#2번답#3번답#4번답#실제답"
	("Q: " + getServerName + "의 메소 배율은?#3#5#50#55#1",
		"Q: 다음중 틀린것은?#마인드 - 총 운영자#에오스 - 경찰#별이 - 개발자#별빛제논- 정지는 나.의.것#2",
		"Q: 경고 횟수에 대한 조치이다. 다음중 맞는 것은?#경고 3회 정지 1일#경고 5회 정지 3일#경고 10회 정지 10일#경고 15회 영정#1",
		"Q: " + getServerName + "의 핫타임 시간은?#오전 2시#오전 10시#오후 12시#오후 2시#4",
		"Q: " + getServerName + "의 버전은?#210#219#220#65#3");

function start() {
	status = -1;
	action(1, 0, 0);
}
function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			if (cm.getPlayer().getMapId() == 10000) { 
				cm.sendNext("#fn나눔고딕 Extrabold##fs12#안녕하세요!\r\n저는 #b#p" + npc + "##k에요~ 지금부터 " + getServerName + "에 대해서 알려드릴게요~");
			}
		} else if (status == 1) {
			cm.sendSimpleS("(무엇을 물어볼까?)\r\n#L7#소개\r\n#L1#배율\r\n#L2#규칙\r\n#L3#운영자님분들은?\r\n#L4#운영자님연락처\r\n#L5#카페주소는?\r\n#L6#다음맵으로 보내주세요!", 2);
			//cm.sendNextS("");
		} else if (status == 2) {
			if (selection == 1) {
				cm.sendOk("Exp 50\r\nMeso 3\r\nDrop 5\r\n상시 위의 배율을 유지하고 있습니다");
				cm.dispose();
			} else if (selection == 2) {
				var chat = "1. 자리스틸 금지\r\n기본적인 매너입니다. 한두번 주의에도 지속적인 자리 스틸시에는 경고 조치하겠습니다\r\n\r\n";
				chat += "2. 핵 사용금지\r\n정말 기본적인 규칙입니다. 건전하게 플레이하는 타유져들을 위해 핵은 사용하지 말아주세요.\r\n\r\n";
				chat += "물론 매크로도 안됩니다. 적발시 즉시 영구밴 처리하겠습니다.\r\n\r\n";
				chat += "3. GM 사칭 금지\r\n 적발시 즉시 영주밴 처리하겠습니다\r\n\r\n";
				chat += "4. 싸움 금지\r\n욕설하며 싸우지 말아주세요. 타유져들에게 피해를 줍니다.[경고 2회]\r\n\r\n";
				chat += "※경고 횟수에 대한 조치\r\n경고 3회 - 계정정지 1일\r\n경고 5회 - 계정정지 5일\r\n경고 10회 - 영구정지";
				cm.sendOk(chat);
				cm.dispose();
			} else if (selection == 3) {
				cm.sendOk("마인드 - 총 운영자\r\n에오스 - 부 운영자\r\n별이 - 개발자\r\n별빛제논 - #r정지#k는 #r나.의.것#k\r\n이시랍니다~ 사칭에 주의해주세요!");
				cm.dispose();
			} else if (selection == 4) {
				cm.sendOk("mindonline  - 총 운영자이신 마인드님 카톡아이디입니다.");
				cm.dispose();
			} else if (selection == 5) {
				cm.sendOk("#b마인드.메이플.한국#k 입니다. 자주 들려주세요~");
				cm.dispose();
			} else if (selection == 6) {
				cm.sendYesNo("다음 맵으로 가실려면 제가 내는 문제를 3개 풀어야해요~\r\n그럼 시작해볼까요?");
			} else if (selection == 7) {
				cm.sendOk("저희" + getServerName + "은 KMS 1.2.220 를 사용하고 있습니다.\r\n하자서버의 형태를 하고 있고\r\n주말 핫타임 이벤트는 오후 2시에 진행하고 있습니다. ");
				cm.dispose();
			}
		} else if (status == 3) {
			//문제 시작
			cm.sendSimple("그럼 문제입니다.\r\n\r\n" + getQuestion(q[Math.floor(Math.random() * q.length)]));
		} else if (status == 4) {
			if (selection == correctAnswer) {
				cm.sendOk("정답입니다. 다음 문제 준비 되셨습니까?");
			} else {
				cm.sendOk("첫 번째 질문에서 틀렸군요!\r\n다시 도전하세요.");
				cm.dispose();
			}
		} else if (status == 5) {
			cm.sendSimple("그럼 문제입니다.\r\n\r\n" + getQuestion(q[Math.floor(Math.random() * q.length)]));
		} else if (status == 6) {
			if (selection == correctAnswer) {
				cm.sendOk("정답입니다. 다음 문제 준비 되셨습니까?");
			} else {
				cm.sendOk("두 번째 질문에서 틀렸군요!\r\n다시 도전하세요.");
				cm.dispose();
			}
		} else if (status == 7) {
			cm.sendSimple("그럼 문제입니다.\r\n\r\n" + getQuestion(q[Math.floor(Math.random() * q.length)]));
		} else if (status == 8) {
			if (selection == correctAnswer) {
				cm.sendNext("정답입니다.\r\n이제 다음맵으로 보내드리겠습니다!");
			} else {
				cm.sendOk("음...마지막 문제에서 틀렸군요...\r\n아쉽지만 다시 도전하세요.");
				cm.dispose();
			}
		} else if (status == 9) {
            //1귓//2파티//3친구//4길드//5연합//6회색//7찐노랑(메이플팁색)//8연노랑//9파란색//10영자채팅
            //현제 8적용
            WorldBroadcasting.broadcast(MainPacketCreator.getGMText(7, "★["+cm.getPlayer().getName()+"]님이 튜토리얼을 완료하셨습니다. 모두 축하해주세요!★"));
			cm.warp(map, 0);
			cm.dispose();
		}
	}
}

function getQuestion(qSet) {
	var q = qSet.split("#");
	var qLine = q[0] + "\r\n\r\n#L0#" + q[1] + "#l\r\n#L1#" + q[2] + "#l\r\n#L2#" + q[3] + "#l\r\n#L3#" + q[4] + "#l";
	correctAnswer = parseInt(q[5], 9); // 5번은 질문의 답 9은 status 의 마지막수
	correctAnswer -= 1;
	return qLine;
}