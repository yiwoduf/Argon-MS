/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client.items;

public enum ItemFlag {

    LOCK(0x01),
    SPIKES(0x02),
    COLD(0x04),
    UNTRADEABLE(0x08),
    KARMA_EQ(0x10),
    KARMA_USE(0x20),
    CHARM_EQUIPPED(0x20),
    ANDROID_ACTIVATED(0x40),
    CRAFT(0x80), //1000 0000 (0x80 & 0xFF)
    PROTECT(0x100), // 프로텍트
    LUKCYDAY(0x200), // 럭키데이
    TRADE_ON_ACCOUNT_USE(0x400), // 악세 카르마
    TRADE_ON_ACCOUNT(0x1000), // 악세 카르마
    SAFETY(0x2000), // 세이프티    
    RECOVERY(0x4000); // 리커버리
  ;
    private final int i;

    private ItemFlag(int i) {
	this.i = i;
    }

    public final int getValue() {
	return i;
    }

    public final boolean check(int flag) {
	return (flag & i) == i;
    }
}
