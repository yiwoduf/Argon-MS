var cchoice; 
var choice; 
var Frock = "#fUI/UIWindow.img/RpsGame/Frock#"; 
var Fpaper = "#fUI/UIWindow.img/RpsGame/Fpaper#"; 
var Fscissor = "#fUI/UIWindow.img/RpsGame/Fscissor#"; 
var rock = "#fUI/UIWindow.img/RpsGame/rock#"; 
var paper = "#fUI/UIWindow.img/RpsGame/paper#"; 
var scissor = "#fUI/UIWindow.img/RpsGame/scissor#"; 
var win = "　　　#fUI/UIWindow.img/RpsGame/win#"; 
var lose = "　　　#fUI/UIWindow.img/RpsGame/lose#"; 
var draw = "　　　#fUI/UIWindow.img/RpsGame/draw#"; 
var money = 0;
var gamestatus = false;
var isdraw = false;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode,type,selection){
    if(mode != 1) {
        cm.dispose();
    }
    if(mode == 1)
       status ++;
       else
    cm.dispose();

        if(status == 0){
          if(cm.getMeso() >= 3000000)
	    cm.sendSimple("가위바위보를 하기 위해선 #r3,000,000원#k이 필요하며, #b이길 경우#k에는 #r2배#k로 가지고 간다. #b질 경우#k에는 #r3,000,000원#k을 잃는다 그래도 하시겠으면 아래에서 #d가위, 바위, 보 중#k에 한 개를 골라주세요\r\n\r\n#L1#"+rock+"#l#L2#"+scissor+"#l#L3#"+paper+"#l");
          else{
	    cm.sendOk("#r3,000,000원#k이 필요하며, 없으실 경우 게임에 참가하지 못 합니다.");
	    cm.dispose();
	}
             } else if (status == 1){
	        if(selection == 1)
		choice = "rock";
             else if (selection == 2)
		choice = "scissor";
             else if (selection == 3)
		choice = "paper";

          var rand = Math.floor(Math.random() * 3);
	    if(rand == 0)
		cchoice = "Frock";
	    else if (rand == 1)
		cchoice = "Fpaper";
	    else if (rand == 2)
		cchoice = "Fscissor";
	    else
		cchoice = "Fscissor";

	//가위바위보 시작
          if(choice == "rock"){
		choice = "#fUI/UIWindow.img/RpsGame/rock#"; 
          if(cchoice == "Fscissor"){
		money = 6000000
		cchoice = "#fUI/UIWindow.img/RpsGame/Fscissor#"; 
		gamestatus = true;
		isdraw = false;
          } else if (cchoice == "Fpaper"){
		gamestatus = false;
		isdraw = false;
		cchoice = "#fUI/UIWindow.img/RpsGame/Fpaper#"; 
          } else if (cchoice == "Frock"){
		isdraw = true;
		gamestatus = true;
		cchoice = "#fUI/UIWindow.img/RpsGame/Frock#"; 
	  }

          } else if(choice == "scissor"){
		choice = "#fUI/UIWindow.img/RpsGame/scissor#"; 
		if(cchoice == "Fpaper"){
		money = 6000000
		cchoice = "#fUI/UIWindow.img/RpsGame/Fpaper#"; 
		gamestatus = true;
		isdraw = false;
          } else if (cchoice == "Frock"){
		gamestatus = false;
		isdraw = false;
		cchoice = "#fUI/UIWindow.img/RpsGame/Frock#"; 
          } else if (cchoice == "Fscissor"){
		isdraw = true;
		gamestatus = true;
		cchoice = "#fUI/UIWindow.img/RpsGame/Fscissor#"; 
	  }

          } else if(choice == "paper"){
		choice = "#fUI/UIWindow.img/RpsGame/paper#"; 
		if(cchoice == "Frock"){
		money = 6000000
		cchoice = "#fUI/UIWindow.img/RpsGame/Frock#"; 
		gamestatus = true;
		isdraw = false;
          } else if (cchoice == "Fscissor"){
		gamestatus = false;
		isdraw = false;
		cchoice = "#fUI/UIWindow.img/RpsGame/Fscissor#"; 
          } else if (cchoice == "Fpaper"){
		isdraw = true;
		gamestatus = true;
		cchoice = "#fUI/UIWindow.img/RpsGame/Fpaper#"; 
		}
	}
          cm.gainMeso(-3000000);
            if(gamestatus == true){
		if(isdraw == true){
		cm.sendOk("     #b운영자#k"+(cchoice)+"VS"+(choice)+"#r#h #\r\n"+draw);
		cm.dispose();
            } else {
		cm.sendOk("     #b운영자#k"+cchoice+"VS"+choice+"#r#h #\r\n"+win);
		cm.gainMeso(money);
		cm.dispose();
            }
          } else if (gamestatus == false){
		cm.sendOk("     #b운영자#k"+cchoice+"VS"+choice+"#r#h #\r\n"+lose);
		cm.dispose();
		}
	}
}