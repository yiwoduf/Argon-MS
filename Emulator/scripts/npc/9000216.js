function start()
{
	St = -1;
	action(1, 0, 0);
}

function GET(o)
{
	return cm.getPlayer().getKeyValue2(o);
}

function SET(i, o)
{
	return cm.getPlayer().setKeyValue2(i, o);
}

function Comma(i)
{
	var reg = /(^[+-]?\d+)(\d{3})/;
	i+= '';
	while (reg.test(i))
	i = i.replace(reg, '$1' + ',' + '$2');
	return i;
}

function action(M, T, S)
{
	if(M != 1)
	{
		cm.dispose();
		return;
	}

	if(M == 1)
	St++;
	else
	St--;

	if(St == 0)
	{
		maxHairSlot = 5;
		maxFaceSlot = 5;
		defaultSlot = 1;
		addHairCost = 0 + (51200000 * GET("HAIR_SLOT"));
		addFaceCost = 0 + (40960000 * GET("FACE_SLOT"));
		alreadyUse = true;
		if(GET("HAIR_SLOT") < 0 || GET("HAIR_SLOT") == null)
		{
			SET("HAIR_SLOT", defaultSlot);
			if(!getHairSlot("HAIR_SLOT_0"))
			{
				SET("HAIR_SLOT_0", 0);
			}
		}

		if(GET("FACE_SLOT") < 0 || GET("FACE_SLOT") == null)
		{
			SET("FACE_SLOT", defaultSlot);
			if(!getHairSlot("FACE_SLOT_0"))
			{
				SET("FACE_SLOT_0", 0);
			}
		}

		selStr =  "캐릭터의 #b머리와 얼굴을 마음껏 자랑#k할 수 있는 신비의 마네킹입니다. 무엇을 도와드릴까요?\r\n\r\n";
		selStr += "#e#r<마네킹 룸 입장하기>#b#n\r\n";
		selStr += "#L0#머리 마네킹 룸 (현재 활성 룸 #r#e"+GET("HAIR_SLOT")+"#b#n개 / 최대 "+maxHairSlot+"개 활성 가능)#l\r\n";
		selStr += "#L1#얼굴 마네킹 룸 (현재 활성 룸 #r#e"+GET("FACE_SLOT")+"#b#n개 / 최대 "+maxFaceSlot+"개 활성 가능)#l\r\n\r\n\r\n";
		selStr += "#e#r<마네킹 룸 확장하기>#b#n\r\n";
		if(GET("HAIR_SLOT").equals(maxHairSlot))
		{
			selStr += "#L2##Cgray#더 이상 머리 마네킹 룸을 확장할 수 없습니다.#l#b\r\n";
		}
		else
		{
			selStr += "#L2#"+Number(GET("HAIR_SLOT") + 1)+"번 머리 마네킹 룸 확장하기 ("+Comma(addHairCost)+" 메소)#l\r\n";
		}
		if(GET("FACE_SLOT").equals(maxFaceSlot))
		{
			selStr += "#L3##Cgray#더 이상 얼굴 마네킹 룸을 확장할 수 없습니다.#l#b\r\n";
		}
		else
		{
		selStr += "#L3#"+Number(GET("FACE_SLOT") + 1)+"번 얼굴 마네킹 룸 확장하기 ("+Comma(addFaceCost)+" 메소)";
		}
		cm.sendSimpleS(selStr, 4, 1012117);
	}

	else if(St == 1)
	{
		playerChoice = S;
		switch(playerChoice)
		{
			case 0:
			selStr = "#b#e#h ##k#n님의 머리 마네킹 룸입니다.\r\n현재 #e#r활성된 마네킹 룸은 "+GET("HAIR_SLOT")+"개#k#n 입니다.\r\n";
			for(i = 0; i < maxHairSlot; i++)
			{
				if(getHairSlot(i))
				{
					if(GET("HAIR_SLOT_"+i+"") == 0)
					{
						selStr += "#L"+i+"##d이 마네킹 룸은 현재 비어있습니다.#k\r\n";
					}
					else
					{
						selStr += "#L"+i+"##d#e저장됨:#n #t"+GET("HAIR_SLOT_"+i+"")+"##l\r\n";
					}
				}
				else
				{
					selStr += "#L"+i+"##Cgray#(아직 사용할 수 없는 마네킹 룸입니다.)#k\r\n";
				}
			}
			cm.sendSimpleS(selStr, 4, 1012117);
			break;

			case 1:
			selStr = "#b#e#h ##k#n님의 얼굴 마네킹 룸입니다.\r\n현재 #e#r활성된 마네킹 룸은 "+GET("FACE_SLOT")+"개#k#n 입니다.\r\n";
			for(i = 0; i < maxFaceSlot; i++)
			{
				if(getFaceSlot(i))
				{
					if(GET("FACE_SLOT_"+i+"") == 0)
					{
						selStr += "#L"+i+"##d이 마네킹 룸은 현재 비어있습니다.#k\r\n";
					}
					else
					{
						selStr += "#L"+i+"##d저장됨: #t"+GET("FACE_SLOT_"+i+"")+"##l\r\n";
					}
				}
				else
				{
					selStr += "#L"+i+"##Cgray#(아직 사용할 수 없는 마네킹 룸입니다.)#k\r\n";
				}
			}
			cm.sendSimpleS(selStr, 4, 1012117);
			break;

			case 2:
			if(GET("HAIR_SLOT").equals(maxHairSlot))
			{
				cm.sendOkS("더 이상 머리 마네킹 룸을 #e#r확장할 수 없습니다.#k#n\r\n머리 마네킹 룸은 #e#r"+maxHairSlot+"개#k#n까지 확장 가능합니다.", 4, 1012117);
				cm.dispose();
				return;
			}
			cm.sendYesNoS("정말 #e#r"+Number(GET("HAIR_SLOT") + 1)+"번 머리 마네킹 룸#k#n을 확장하시겠어요?\r\n#e#r"+Comma(addHairCost)+" 메소#k#n가 필요하답니다.", 4, 1012117);
			break;

			case 3:
			if(GET("FACE_SLOT").equals(maxFaceSlot))
			{
				cm.sendOkS("더 이상 얼굴 마네킹 룸을 #e#r확장할 수 없습니다.#k#n\r\n얼굴 마네킹 룸은 #e#r"+maxFaceSlot+"개#k#n까지 확장 가능합니다.", 4, 1012117);
				cm.dispose();
				return;
			}
			cm.sendYesNoS("정말 #e#r"+Number(GET("FACE_SLOT") + 1)+"번 얼굴 마네킹 룸#k#n을 확장하시겠어요?\r\n#e#r"+Comma(addFaceCost)+" 메소#k#n가 필요하답니다.", 4, 1012117);
			break;

			default:
			cm.dispose();
		}
	}

	else if(St == 2)
	{
		dummySelect = S;
		switch(playerChoice)
		{
			case 0:
			if(!getHairSlot(dummySelect))
			{
				cm.sendOkS("아직 #e#r사용할 수 없는 마네킹 룸#k#n입니다.\r\n마네킹 룸은 메소를 지불하고 확장할 수 있습니다.", 4, 1012117);
				cm.dispose();
				return;
			}
			if(GET("HAIR_SLOT_"+dummySelect+"") == 0)
			{
				cm.sendYesNoS("지금 #h #님의 머리는 #b#e#t"+cm.getPlayer().getHair()+"##k#n입니다.\r\n이 머리를 #e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에 저장하시겠어요?",  4, 1012117);
			}
			else
			{
				cm.sendSimpleS("#e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에는 현재 #b#e#t"+GET("HAIR_SLOT_"+dummySelect+"")+"##k#n가 저장되어있습니다. 무엇을 하시겠습니까?\r\n#b"
					+ "#L0#(적용중) #e#t"+cm.getPlayer().getHair()+"##n 저장하기#l\r\n"
					+ "#L1#(저장됨) #e#t"+GET("HAIR_SLOT_"+dummySelect+"")+"##n 적용하기#l\r\n", 4, 1012117);

			}
			break;

			case 1:
			if(!getFaceSlot(dummySelect))
			{
				cm.sendOkS("아직 #e#r사용할 수 없는 마네킹 룸#k#n입니다.\r\n마네킹 룸은 메소를 지불하고 확장할 수 있습니다.", 4, 1012117);
				cm.dispose();
				return;
			}
			if(GET("FACE_SLOT_"+dummySelect+"") == 0)
			{
				cm.sendYesNoS("지금 #h #님의 얼굴은 #b#e#t"+cm.getPlayer().getFace()+"##k#n입니다.\r\n이 얼굴을 #e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에 저장하시겠어요?",  4, 1012117);
			}
			else
			{
				cm.sendSimpleS("#e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에는 현재 #b#e#t"+GET("FACE_SLOT_"+dummySelect+"")+"##k#n이 저장되어있습니다. 무엇을 하시겠습니까?\r\n#b"
					+ "#L0#(적용중) #e#t"+cm.getPlayer().getFace()+"##n 저장하기#l\r\n"
					+ "#L1#(저장됨) #e#t"+GET("FACE_SLOT_"+dummySelect+"")+"##n 적용하기#l\r\n", 4, 1012117);

			}
			break;

			case 2:
			if(cm.getMeso() < addHairCost)
			{
				cm.sendOkS("#e#r"+Number(1 + GET("HAIR_SLOT"))+"번 머리 마네킹 룸#k#n을 확장할 수 없습니다.\r\n마네킹 룸 확장에는 #e#r"+Comma(addHairCost)+" 메소#k#n가 필요합니다.", 4, 1012117);
				cm.dispose();
				return;
			}
			cm.gainMeso(-addHairCost);
			SET("HAIR_SLOT", Number(GET("HAIR_SLOT") + 1));
			SET("HAIR_SLOT_"+Number(GET("HAIR_SLOT") - 1)+"", 0);
			cm.sendOkS("이제 #e#r"+GET("HAIR_SLOT")+"번 머리 마네킹 룸#k#n을 이용하실 수 있습니다.\r\n머리 마네킹 룸은 #e#r최대 "+maxHairSlot+"개 까지 확장#k#n할 수 있습니다.", 4, 1012117);
			cm.dispose();
			break;

			case 3:
			if(cm.getMeso() < addFaceCost)
			{
				cm.sendOkS("#e#r"+Number(1 + GET("FACE_SLOT"))+"번 얼굴 마네킹 룸#k#n을 확장할 수 없습니다.\r\n마네킹 룸 확장에는 #e#r"+Comma(addFaceCost)+" 메소#k#n가 필요합니다.", 4, 1012117);
				cm.dispose();
				return;
			}
			cm.gainMeso(-addFaceCost);
			SET("FACE_SLOT", Number(GET("FACE_SLOT") + 1));
			SET("FACE_SLOT_"+Number(GET("FACE_SLOT") - 1)+"", 0);
			cm.sendOkS("이제 #e#r"+GET("FACE_SLOT")+"번 얼굴 마네킹 룸#k#n을 이용하실 수 있습니다.\r\n얼굴 마네킹 룸은 #e#r최대 "+maxFaceSlot+"개 까지 확장#k#n할 수 있습니다.", 4, 1012117);
			cm.dispose();
			break;

			default:
			cm.dispose();
			break;
		}
	}

	else if(St == 3)
	{
		finalChoice = S;
		switch(playerChoice)
		{
			case 0:
			if(GET("HAIR_SLOT_"+dummySelect+"") == 0)
			{
				SET("HAIR_SLOT_"+dummySelect+"", cm.getPlayer().getHair());
				cm.sendOkS("#e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에 #e#b#t"+cm.getPlayer().getHair()+"##k#n가 저장되었습니다.", 4, 1012117);
				cm.dispose();
				return;
			}
			else
			{
				switch(finalChoice)
				{
					case 0:
					SET("HAIR_SLOT_"+dummySelect+"", cm.getPlayer().getHair());
					cm.sendOkS("#e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에 #e#b#t"+cm.getPlayer().getHair()+"##k#n가 저장되었습니다.", 4, 1012117);
					cm.dispose();
					break;

					case 1:
					cm.setAvatar(0, GET("HAIR_SLOT_"+dummySelect+""));
					cm.sendOkS("#e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에 있던 #e#b#t"+cm.getPlayer().getHair()+"##k#n가 적용되었습니다.", 4, 1012117);
					cm.dispose();
					break;

					default:
					cm.dispose();
					break;

				}
			}
			break;

			case 1:
			if(GET("FACE_SLOT_"+dummySelect+"") == 0)
			{
				SET("FACE_SLOT_"+dummySelect+"", cm.getPlayer().getFace());
				cm.sendOkS("#e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에 #e#b#t"+cm.getPlayer().getFace()+"##k#n이 저장되었습니다.", 4, 1012117);
				cm.dispose();
				return;
			}
			else
			{
				switch(finalChoice)
				{
					case 0:
					SET("FACE_SLOT_"+dummySelect+"", cm.getPlayer().getFace());
					cm.sendOkS("#e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에 #e#b#t"+cm.getPlayer().getFace()+"##k#n이 저장되었습니다.", 4, 1012117);
					cm.dispose();
					break;

					case 1:
					cm.setAvatar(0, GET("FACE_SLOT_"+dummySelect+""));
					cm.sendOkS("#e#r"+Number(1 + dummySelect)+"번 마네킹 룸#k#n에 있던 #e#b#t"+cm.getPlayer().getFace()+"##k#n이 적용되었습니다.", 4, 1012117);
					cm.dispose();
					break;

					default:
					cm.dispose();
					break;
				}
			}
			break;
		}
	}
}


function getHairSlot(i)
{
	if(GET("HAIR_SLOT_"+i+"") < 0)
	{
		return false;
	}
	return true;
}

function getFaceSlot(i)
{
	if(GET("FACE_SLOT_"+i+"") < 0)
	{
		return false;
	}
	return true;
}