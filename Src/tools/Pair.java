/*
 Maple Team ProJect
 Á¦ÀÛ ¿ëµµ : ¼­¹ö¿î¿µ¿ë
 ÆÀ¿ø¸ñ·Ï
 * °­µ¿¿ø dongwon1852@nate.com 
 * ±è¼±ÀÏ fileupload@nate.com
 * ±è¼®Çö azxcs3@nate.com
 * ±èÁø¼º m0nday_s@nate.com
 * °øÁØÇù kkong1001@nate.com
 * ±è¹ÎÈ£ rubystory0603@nate.com
 * ÀÌÀç¿Õ ejwj5592@nate.com
 * ÃÖ¿ëÀç virgo_s_t@nate.com
 * ¼­¼º´ö abq1239@nate.com
 */

package tools;

import client.stats.PlayerStat;

public class Pair<E, F> {

    public E left;
    public F right;

    /**
     * Class constructor - pairs two objects together.
     *
     * @param left The left object.
     * @param right The right object.
     */
    public Pair(E left, F right) {
	this.left = left;
	this.right = right;
    }


    /**
     * Gets the left value.
     *
     * @return The left value.
     */
    public E getLeft() {
	return left;
    }

    /**
     * Gets the right value.
     *
     * @return The right value.
     */
    public F getRight() {
	return right;
    }

    /**
     * Turns the pair into a string.
     *
     * @return Each value of the pair as a string joined by a colon.
     */
    @Override
    public String toString() {
	return left.toString() + ":" + right.toString();
    }

    /**
     * Gets the hash code of this pair.
     */
    @Override
    public int hashCode() {
	final int prime = 31;
	int result = 1;
	result = prime * result + ((left == null) ? 0 : left.hashCode());
	result = prime * result + ((right == null) ? 0 : right.hashCode());
	return result;
    }

    /**
     * Checks to see if two pairs are equal.
     */
    @SuppressWarnings("unchecked")
    @Override
    public boolean equals(Object obj) {
	if (this == obj) {
	    return true;
	}
	if (obj == null) {
	    return false;
	}
	if (getClass() != obj.getClass()) {
	    return false;
	}
	final Pair other = (Pair) obj;
	if (left == null) {
	    if (other.left != null) {
		return false;
	    }
	} else if (!left.equals(other.left)) {
	    return false;
	}
	if (right == null) {
	    if (other.right != null) {
		return false;
	    }
	} else if (!right.equals(other.right)) {
	    return false;
	}
	return true;
    }
}
