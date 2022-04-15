/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.maps;

import client.MapleClient;
import java.awt.Point;
import tools.RandomStream.Randomizer;

/**
 *
 * @author KSH
 */
public class ObtacleAtom {

    public final int type, sx, sy, ex, ey, range, pdam, mdam, delay, high, speed, len, float_; 
    public ObtacleAtom(final int type, final int sx, final int sy, final int ex, final int ey, final int range, final int pdam, final int mdam, final int delay, final int high, final int speed, final int len, final int float_) {
        this.type = type;
        this.sx = sx;
        this.sy = sy;
        this.ex = ex;
        this.ey = ey;
        this.range = range;
        this.pdam = pdam;
        this.mdam = mdam;
        this.delay = delay;
        this.high = high;
        this.speed = speed;
        this.len = len;
        this.float_ = float_;
    }
}
