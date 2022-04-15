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

		selStr =  "ĳ������ #b�Ӹ��� ���� ������ �ڶ�#k�� �� �ִ� �ź��� ����ŷ�Դϴ�. ������ ���͵帱���?\r\n\r\n";
		selStr += "#e#r<����ŷ �� �����ϱ�>#b#n\r\n";
		selStr += "#L0#�Ӹ� ����ŷ �� (���� Ȱ�� �� #r#e"+GET("HAIR_SLOT")+"#b#n�� / �ִ� "+maxHairSlot+"�� Ȱ�� ����)#l\r\n";
		selStr += "#L1#�� ����ŷ �� (���� Ȱ�� �� #r#e"+GET("FACE_SLOT")+"#b#n�� / �ִ� "+maxFaceSlot+"�� Ȱ�� ����)#l\r\n\r\n\r\n";
		selStr += "#e#r<����ŷ �� Ȯ���ϱ�>#b#n\r\n";
		if(GET("HAIR_SLOT").equals(maxHairSlot))
		{
			selStr += "#L2##Cgray#�� �̻� �Ӹ� ����ŷ ���� Ȯ���� �� �����ϴ�.#l#b\r\n";
		}
		else
		{
			selStr += "#L2#"+Number(GET("HAIR_SLOT") + 1)+"�� �Ӹ� ����ŷ �� Ȯ���ϱ� ("+Comma(addHairCost)+" �޼�)#l\r\n";
		}
		if(GET("FACE_SLOT").equals(maxFaceSlot))
		{
			selStr += "#L3##Cgray#�� �̻� �� ����ŷ ���� Ȯ���� �� �����ϴ�.#l#b\r\n";
		}
		else
		{
		selStr += "#L3#"+Number(GET("FACE_SLOT") + 1)+"�� �� ����ŷ �� Ȯ���ϱ� ("+Comma(addFaceCost)+" �޼�)";
		}
		cm.sendSimpleS(selStr, 4, 1012117);
	}

	else if(St == 1)
	{
		playerChoice = S;
		switch(playerChoice)
		{
			case 0:
			selStr = "#b#e#h ##k#n���� �Ӹ� ����ŷ ���Դϴ�.\r\n���� #e#rȰ���� ����ŷ ���� "+GET("HAIR_SLOT")+"��#k#n �Դϴ�.\r\n";
			for(i = 0; i < maxHairSlot; i++)
			{
				if(getHairSlot(i))
				{
					if(GET("HAIR_SLOT_"+i+"") == 0)
					{
						selStr += "#L"+i+"##d�� ����ŷ ���� ���� ����ֽ��ϴ�.#k\r\n";
					}
					else
					{
						selStr += "#L"+i+"##d#e�����:#n #t"+GET("HAIR_SLOT_"+i+"")+"##l\r\n";
					}
				}
				else
				{
					selStr += "#L"+i+"##Cgray#(���� ����� �� ���� ����ŷ ���Դϴ�.)#k\r\n";
				}
			}
			cm.sendSimpleS(selStr, 4, 1012117);
			break;

			case 1:
			selStr = "#b#e#h ##k#n���� �� ����ŷ ���Դϴ�.\r\n���� #e#rȰ���� ����ŷ ���� "+GET("FACE_SLOT")+"��#k#n �Դϴ�.\r\n";
			for(i = 0; i < maxFaceSlot; i++)
			{
				if(getFaceSlot(i))
				{
					if(GET("FACE_SLOT_"+i+"") == 0)
					{
						selStr += "#L"+i+"##d�� ����ŷ ���� ���� ����ֽ��ϴ�.#k\r\n";
					}
					else
					{
						selStr += "#L"+i+"##d�����: #t"+GET("FACE_SLOT_"+i+"")+"##l\r\n";
					}
				}
				else
				{
					selStr += "#L"+i+"##Cgray#(���� ����� �� ���� ����ŷ ���Դϴ�.)#k\r\n";
				}
			}
			cm.sendSimpleS(selStr, 4, 1012117);
			break;

			case 2:
			if(GET("HAIR_SLOT").equals(maxHairSlot))
			{
				cm.sendOkS("�� �̻� �Ӹ� ����ŷ ���� #e#rȮ���� �� �����ϴ�.#k#n\r\n�Ӹ� ����ŷ ���� #e#r"+maxHairSlot+"��#k#n���� Ȯ�� �����մϴ�.", 4, 1012117);
				cm.dispose();
				return;
			}
			cm.sendYesNoS("���� #e#r"+Number(GET("HAIR_SLOT") + 1)+"�� �Ӹ� ����ŷ ��#k#n�� Ȯ���Ͻðھ��?\r\n#e#r"+Comma(addHairCost)+" �޼�#k#n�� �ʿ��ϴ�ϴ�.", 4, 1012117);
			break;

			case 3:
			if(GET("FACE_SLOT").equals(maxFaceSlot))
			{
				cm.sendOkS("�� �̻� �� ����ŷ ���� #e#rȮ���� �� �����ϴ�.#k#n\r\n�� ����ŷ ���� #e#r"+maxFaceSlot+"��#k#n���� Ȯ�� �����մϴ�.", 4, 1012117);
				cm.dispose();
				return;
			}
			cm.sendYesNoS("���� #e#r"+Number(GET("FACE_SLOT") + 1)+"�� �� ����ŷ ��#k#n�� Ȯ���Ͻðھ��?\r\n#e#r"+Comma(addFaceCost)+" �޼�#k#n�� �ʿ��ϴ�ϴ�.", 4, 1012117);
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
				cm.sendOkS("���� #e#r����� �� ���� ����ŷ ��#k#n�Դϴ�.\r\n����ŷ ���� �޼Ҹ� �����ϰ� Ȯ���� �� �ֽ��ϴ�.", 4, 1012117);
				cm.dispose();
				return;
			}
			if(GET("HAIR_SLOT_"+dummySelect+"") == 0)
			{
				cm.sendYesNoS("���� #h #���� �Ӹ��� #b#e#t"+cm.getPlayer().getHair()+"##k#n�Դϴ�.\r\n�� �Ӹ��� #e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n�� �����Ͻðھ��?",  4, 1012117);
			}
			else
			{
				cm.sendSimpleS("#e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n���� ���� #b#e#t"+GET("HAIR_SLOT_"+dummySelect+"")+"##k#n�� ����Ǿ��ֽ��ϴ�. ������ �Ͻðڽ��ϱ�?\r\n#b"
					+ "#L0#(������) #e#t"+cm.getPlayer().getHair()+"##n �����ϱ�#l\r\n"
					+ "#L1#(�����) #e#t"+GET("HAIR_SLOT_"+dummySelect+"")+"##n �����ϱ�#l\r\n", 4, 1012117);

			}
			break;

			case 1:
			if(!getFaceSlot(dummySelect))
			{
				cm.sendOkS("���� #e#r����� �� ���� ����ŷ ��#k#n�Դϴ�.\r\n����ŷ ���� �޼Ҹ� �����ϰ� Ȯ���� �� �ֽ��ϴ�.", 4, 1012117);
				cm.dispose();
				return;
			}
			if(GET("FACE_SLOT_"+dummySelect+"") == 0)
			{
				cm.sendYesNoS("���� #h #���� ���� #b#e#t"+cm.getPlayer().getFace()+"##k#n�Դϴ�.\r\n�� ���� #e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n�� �����Ͻðھ��?",  4, 1012117);
			}
			else
			{
				cm.sendSimpleS("#e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n���� ���� #b#e#t"+GET("FACE_SLOT_"+dummySelect+"")+"##k#n�� ����Ǿ��ֽ��ϴ�. ������ �Ͻðڽ��ϱ�?\r\n#b"
					+ "#L0#(������) #e#t"+cm.getPlayer().getFace()+"##n �����ϱ�#l\r\n"
					+ "#L1#(�����) #e#t"+GET("FACE_SLOT_"+dummySelect+"")+"##n �����ϱ�#l\r\n", 4, 1012117);

			}
			break;

			case 2:
			if(cm.getMeso() < addHairCost)
			{
				cm.sendOkS("#e#r"+Number(1 + GET("HAIR_SLOT"))+"�� �Ӹ� ����ŷ ��#k#n�� Ȯ���� �� �����ϴ�.\r\n����ŷ �� Ȯ�忡�� #e#r"+Comma(addHairCost)+" �޼�#k#n�� �ʿ��մϴ�.", 4, 1012117);
				cm.dispose();
				return;
			}
			cm.gainMeso(-addHairCost);
			SET("HAIR_SLOT", Number(GET("HAIR_SLOT") + 1));
			SET("HAIR_SLOT_"+Number(GET("HAIR_SLOT") - 1)+"", 0);
			cm.sendOkS("���� #e#r"+GET("HAIR_SLOT")+"�� �Ӹ� ����ŷ ��#k#n�� �̿��Ͻ� �� �ֽ��ϴ�.\r\n�Ӹ� ����ŷ ���� #e#r�ִ� "+maxHairSlot+"�� ���� Ȯ��#k#n�� �� �ֽ��ϴ�.", 4, 1012117);
			cm.dispose();
			break;

			case 3:
			if(cm.getMeso() < addFaceCost)
			{
				cm.sendOkS("#e#r"+Number(1 + GET("FACE_SLOT"))+"�� �� ����ŷ ��#k#n�� Ȯ���� �� �����ϴ�.\r\n����ŷ �� Ȯ�忡�� #e#r"+Comma(addFaceCost)+" �޼�#k#n�� �ʿ��մϴ�.", 4, 1012117);
				cm.dispose();
				return;
			}
			cm.gainMeso(-addFaceCost);
			SET("FACE_SLOT", Number(GET("FACE_SLOT") + 1));
			SET("FACE_SLOT_"+Number(GET("FACE_SLOT") - 1)+"", 0);
			cm.sendOkS("���� #e#r"+GET("FACE_SLOT")+"�� �� ����ŷ ��#k#n�� �̿��Ͻ� �� �ֽ��ϴ�.\r\n�� ����ŷ ���� #e#r�ִ� "+maxFaceSlot+"�� ���� Ȯ��#k#n�� �� �ֽ��ϴ�.", 4, 1012117);
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
				cm.sendOkS("#e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n�� #e#b#t"+cm.getPlayer().getHair()+"##k#n�� ����Ǿ����ϴ�.", 4, 1012117);
				cm.dispose();
				return;
			}
			else
			{
				switch(finalChoice)
				{
					case 0:
					SET("HAIR_SLOT_"+dummySelect+"", cm.getPlayer().getHair());
					cm.sendOkS("#e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n�� #e#b#t"+cm.getPlayer().getHair()+"##k#n�� ����Ǿ����ϴ�.", 4, 1012117);
					cm.dispose();
					break;

					case 1:
					cm.setAvatar(0, GET("HAIR_SLOT_"+dummySelect+""));
					cm.sendOkS("#e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n�� �ִ� #e#b#t"+cm.getPlayer().getHair()+"##k#n�� ����Ǿ����ϴ�.", 4, 1012117);
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
				cm.sendOkS("#e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n�� #e#b#t"+cm.getPlayer().getFace()+"##k#n�� ����Ǿ����ϴ�.", 4, 1012117);
				cm.dispose();
				return;
			}
			else
			{
				switch(finalChoice)
				{
					case 0:
					SET("FACE_SLOT_"+dummySelect+"", cm.getPlayer().getFace());
					cm.sendOkS("#e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n�� #e#b#t"+cm.getPlayer().getFace()+"##k#n�� ����Ǿ����ϴ�.", 4, 1012117);
					cm.dispose();
					break;

					case 1:
					cm.setAvatar(0, GET("FACE_SLOT_"+dummySelect+""));
					cm.sendOkS("#e#r"+Number(1 + dummySelect)+"�� ����ŷ ��#k#n�� �ִ� #e#b#t"+cm.getPlayer().getFace()+"##k#n�� ����Ǿ����ϴ�.", 4, 1012117);
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