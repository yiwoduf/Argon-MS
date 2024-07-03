/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.items;

import java.util.List;

/**
 *
 * @author 에반테이르
 */
public class BasicAndroid {
    private List<Integer> hairs;
    private List<Integer> faces;
    private int gender;
    
    public BasicAndroid (List<Integer> h, List<Integer> f, int g) {
        this.hairs = h;
        this.faces = f;
        this.gender = g;
    }
    
    public int getRandomHair() {
        return hairs.get((int) Math.floor(Math.random() * hairs.size()));
    }
    
    public int getRandomFace() {
        return faces.get((int) Math.floor(Math.random() * faces.size()));
    }
    
    public int getGender() {
        return gender;
    }
}
