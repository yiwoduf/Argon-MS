/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import handler.channel.AttackInfo;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import server.life.MapleMonster;
import tools.AttackPair;
import tools.Pair;

/**
 *
 * @author ¸ùÅ°ÇÁ
 */
public class CalcDamage {
    public CRand32 rndGenForCharacter;
    //CRand32 rndForCheckDamageMiss;//not implement yet
    //CRand32 rndGenForMob;//not implement yet
    //int invalidCount;
    private int numRand = 11;//A number of random number for calculate damage
    public CalcDamage() {
        rndGenForCharacter = new CRand32();
    //    invalidCount = 0;
    }

    public void SetSeed(int seed1, int seed2, int seed3) {
        rndGenForCharacter.Seed(seed1, seed2, seed3);
        //rndForCheckDamageMiss.Seed(seed1, seed2, seed3);//not implement yet
        //rndGenForMob.Seed(seed1, seed2, seed3);//not implement yet
    }
    

    public double RandomInRange(long randomNum, int max, int min) {
        //java not have unsigned long, so i used BigInteger
        BigInteger ECX = new BigInteger("" + randomNum);//random number from Crand32::Random()
        BigInteger EAX = new BigInteger("1801439851");//0x6B5FCA6B; <= this is const
        //ECX * EAX = EDX:EAX (64bit register)
        BigInteger multipled = ECX.multiply(EAX);
        //get EDX from EDX:EAX
        long highBit = multipled.shiftRight(32).longValue();//get 32bit high
        long rightShift = highBit >>> 22;//SHR EDX,16
        double newRandNum = randomNum - (rightShift * 10000000.0);

        double value;
        if (min != max) {
            if (min > max) {//swap
                int temp = max;
                max = min;
                min = temp;
            }
            value = (max - min) * newRandNum / 9999999.0 + min;
        } else {
            value = max;
        }
        return value;
}  
    
    public List<Pair<Integer, Boolean>> PDamage(MapleCharacter chr, AttackInfo attack) {
        List<Pair<Integer, Boolean>> realDamageList = new ArrayList<>();
        for (AttackPair eachMob : attack.allDamage) {//For each monster
            int hits = 1;
            MapleMonster monster = chr.getMap().getMonsterByOid(eachMob.objectid);
            long rand[] = new long[numRand];//we need save it as long to store unsigned int
            for (int i = 0; i < numRand; i++) {
                rand[i] = rndGenForCharacter.Random();
            }
            byte index = 0;
            //byte ·£´ýÀë = 0;
            byte criticaltemp1 = 0;
            byte temp1 = 0;
            byte temp2 = 0;
            byte temp3 = 0;
            byte temp4 = 0;
            byte temp5 = 0;
            byte temp6 = 0;
            for (Pair<Integer, Boolean> att : eachMob.attack) {//For each attack
                double realDamage = 0.0;
                boolean critical = false;
                index++;
                double IDK = RandomInRange(rand[index++ % numRand], 0, 100);
                //·£´ýÀë++;
                //System.out.println(IDK + " ::::::::::: " + ·£´ýÀë + " ¹øÂ° ·¡´ý");
                //Adjusted Random Damage
                int maxDamage = 94;//(int) chr.getStat().getCurrentMaxBaseDamage();
                int minDamage = 19; //(int) chr.getStat().getCurrentMinBaseDamage(); 
                double adjustedRandomDamage = RandomInRange(rand[index++ % numRand], maxDamage, minDamage);
                //·£´ýÀë++;
                //System.out.println(adjustedRandomDamage + " ::::::::::: " + ·£´ýÀë + " ¹øÂ° ·¡´ý");
                realDamage += adjustedRandomDamage;
                if ((hits == 3 && criticaltemp1 == 2) || (temp1 != 0 && hits == 4) || (temp2 != 0 && hits == 5) || (temp6 != 8 && temp6 != 101 && temp4 != 0 && hits == 6)) {
                    if (hits == 3) {
                        index = (byte) (index + 1);
                    } else if (hits == 4) {
                        index = temp1;
                    } else if (hits == 5) {
                        index = temp2;
                    } else if (hits == 6) {
                        if (temp5 == 36 || temp5 == 37) {
                            if (temp5 == 36) {
                                index = 8;
                            } else {
                                index = 9;
                            }
                        } else {
                            if (temp6 == 18) {
                                index = (byte) 8;
                            } else if (temp6 == 7) {
                                index = 8;
                            } else {
                                index = 3;
                            }
                        }
                    }
                    double addNumber = RandomInRange(rand[(index++) % numRand], 9, 0);
                    byte addIndexNumber = (byte) addNumber;
                    if (hits == 3) {
                        index = (byte) (25 + addIndexNumber);
                        if (addIndexNumber == 1 || addIndexNumber == 6) {
                            temp1 = addIndexNumber;
                            temp3 = addIndexNumber;
                            temp6 = addIndexNumber;
                            if (addIndexNumber == 1) {
                                temp4 = addIndexNumber;
                            } else if (addIndexNumber == 6) {
                                temp4 = addIndexNumber;
                            }
                        } else if (addIndexNumber == 2) {
                            temp4 = addIndexNumber;
                        } else if (addIndexNumber == 7) {
                            temp2 = 2;
                            temp5 = 7;//5¹øÂ° Å¸¼ö Å×½ºÆ®
                        }
                    } else if (hits == 4) {
                        if (temp1 == 1) {
                            index = (byte) (20 + addIndexNumber);
                        } else {
                            index = (byte) (25 + addIndexNumber);
                        }
                        if (addIndexNumber == 6 && temp3 != 0) {
                            if (temp3 == 6) {
                                temp2 = 7;
                            } else {
                                temp2 = 2;
                            }
                            if (temp4 == 1) {
                                temp4 = 0;
                            }
                        } else if (addIndexNumber == 0 && temp3 == 1) {                            
                            temp2 = 7;
                            if (temp4 == 1) {
                                temp4 = 0;
                            }
                        } else if (addIndexNumber == 1 && temp3 != 1) {
                            temp2 = 2;
                        } else if (addIndexNumber != 1 && temp4 == 1) {
                            temp4 = 0;
                        } else if (addIndexNumber == 7) {
                            if (temp4 == 6) {
                                temp4 = 7;
                            } else {
                                temp4 = 0;
                            }
                        }
                        if (temp6 != 0) {
                            if (addIndexNumber == 0 || addIndexNumber == 1 || addIndexNumber == 6) {
                                if (temp6 == 1 && addIndexNumber == 0) {
                                    temp6 = 100;//check 
                                } else if (temp6 == 6 && addIndexNumber == 6) {
                                    temp6 = 99; // 6+6 ÀÏ¶§ Ã¼Å©ÇØ¾ßÇÔ
                                } else {
                                    temp6 = (byte) (temp6 + addIndexNumber);
                                }
                            }
                        }
                        if (temp4 == 6) {
                            temp4 = 0;
                        }
                    } else if (hits == 5) {
                        if (temp2 == 2) {
                            index = (byte) (31 + addIndexNumber);
                        } else {
                            index = (byte) (25 + addIndexNumber);
                        }
                        if (addIndexNumber == 0 || addIndexNumber == 1 || addIndexNumber == 6) { // 6ÀÏ¶§´Â ÀÏÄ¡
                            if (addIndexNumber == 0) {
                                temp4 = 8; //onOff
                                if (temp6 == 99) {
                                    temp6 = 101;
                                }
                            } else {
                                temp4 = addIndexNumber;
                            }
                            if ((addIndexNumber == 1 || addIndexNumber == 0) && temp5 == 7) {
                                if (addIndexNumber == 1) {
                                    temp5 = 37;
                                } else {
                                    temp5 = 36;
                                }
                            }
                            if (temp6 != 0) {
                                if (temp6 == 100 && addIndexNumber == 0) {
                                    temp6 = 8;
                                } else if (temp6 != 101) {
                                    if (temp6 == 100) {
                                        temp6 = (byte) (1 + addIndexNumber);
                                    } else {
                                        if (temp6 == 99) {
                                            temp6 = (byte) (12 + addIndexNumber);
                                        } else {
                                            temp6 = (byte) (temp6 + addIndexNumber);
                                        }
                                    }
                                }
                            }
                        }
                    } else if (hits == 6) {
                        if (temp5 == 36 || temp5 == 37) {
                            if (temp5 == 36) {
                                index = (byte) (36 + addIndexNumber);
                            } else {
                                index = (byte) (37 + addIndexNumber);
                            }
                        } else {
                            if (temp6 == 7 || temp6 == 13 || temp6 == 18) {
                                if (temp6 == 13) {
                                    index = (byte) (31 + addIndexNumber);
                                } else {
                                    index = (byte) (36 + addIndexNumber);
                                }
                            } else {
                                index = (byte) (31 + addIndexNumber);
                            }
                        }
                    }
                }
                //Adjusted Damage By Monster's Physical Defense Rate
                double monsterPDRate = monster.getStats().getPDRate();
                double percentDmgAfterPDRate = Math.max(0.0, 100.0 - monsterPDRate);
                realDamage = percentDmgAfterPDRate / 100.0 * realDamage;

                //Adjusted Damage By Skill
                SkillStatEffect skillEffect = null;
                if (attack.skill > 0) {
                    skillEffect = SkillFactory.getSkill(attack.skill).getEffect(chr.getTotalSkillLevel(attack.skill));
                }
                if (skillEffect != null) {
                    realDamage = realDamage * (double) skillEffect.getDamage() / 100.0;
                }

                //Adjusted Critical Damage
                double criticalRate = RandomInRange(rand[index++ % numRand], 100, 0);
                //·£´ýÀë++;
                //System.out.println(criticalRate + " ::::::::::: " + ·£´ýÀë + " ¹øÂ° ·¡´ý ÀÎµ¦½º´Â? : " + index);
                if (criticalRate < 65 || (attack.skill == 1121008 && hits == 6)) {//chr.getStat().passive_sharpeye_rate()) {
                    int maxCritDamage = chr.getStat().passive_sharpeye_percent();
                    int minCritDamage = chr.getStat().passive_sharpeye_min_percent();
                    int criticalDamageRate = (int) RandomInRange(rand[index++ % numRand], maxCritDamage, minCritDamage);
                    //·£´ýÀë++;
                    //System.out.println(criticalDamageRate + ".00000000000000 ::::::::::: " + ·£´ýÀë + " ¹øÂ° ·¡´ý");
                    realDamage = realDamage + (criticalDamageRate / 100.0 * (int) realDamage);//nexon convert realDamage to int when multiply with criticalDamageRate
                    critical = true;
                    att.right = true;                    
                    System.out.println("Å©¸®");
                    criticaltemp1++;
                }
                hits++;
                if (hits < 3) {
                    double IDK2 = RandomInRange(rand[index++ % numRand], 0, 100);
                }
                realDamageList.add(new Pair<>((int) realDamage, critical));                
            }
        }
        return realDamageList;
    }
}  