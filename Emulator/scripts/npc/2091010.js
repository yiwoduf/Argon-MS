


/*


	엔피시 이름 : 무릉 순위표

	엔피시가 있는 맵 : 헤네시스 : 헤네시스 (100000000)

	엔피시 설명 : MISSINGNO


	순위기록 초기화는 ?

    	Rank += "\r\n============================#g"
    	Rank += "\r\n01　　　　　　　　　　00:00:00"
    	Rank += "\r\n#k============================#b"
    	Rank += "\r\n02　　　　　　　　　　00:00:00"
    	Rank += "\r\n03　　　　　　　　　　00:00:00"
    	Rank += "\r\n04　　　　　　　　　　00:00:00"
    	Rank += "\r\n05　　　　　　　　　　00:00:00#d"
    	Rank += "\r\n06　　　　　　　　　　00:00:00"
    	Rank += "\r\n07　　　　　　　　　　00:00:00"
    	Rank += "\r\n08　　　　　　　　　　00:00:00"
    	Rank += "\r\n09　　　　　　　　　　00:00:00"
    	Rank += "\r\n10　　　　　　　　　　00:00:00"
    	Rank += "\r\n11　　　　　　　　　　00:00:00"
    	Rank += "\r\n12　　　　　　　　　　00:00:00"
    	Rank += "\r\n13　　　　　　　　　　00:00:00" 
    	Rank += "\r\n14　　　　　　　　　　00:00:00" 
    	Rank += "\r\n15　　　　　　　　　　00:00:00" 
    	Rank += "\r\n16　　　　　　　　　　00:00:00" 
    	Rank += "\r\n17　　　　　　　　　　00:00:00" 
    	Rank += "\r\n18　　　　　　　　　　00:00:00" 
    	Rank += "\r\n19　　　　　　　　　　00:00:00" 
    	Rank += "\r\n20　　　　　　　　　　00:00:00" 

붙여넣기하셈

무릉장갑은

서버 별로 랭킹 매겨서 지급하던가 하세요

수고!


- 장갑 지급 예제 (서버공지) -

 무릉도장 보상이 지급되었습니다. 루시아 에게 보상을 받으세요. 유효기간은 7일이며 그 이상 갖고 있을 시 로그 추적해서 벤처리 됩니다.


마인드서버기준 기록


*/

importPackage(java.util);
importPackage(java.lang);

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
        cm.MulungRank();
        cm.dispose();
	}
}