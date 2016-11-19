package com.active.common.annotation;

import java.lang.annotation.*;

@Target({ ElementType.TYPE })
 @Retention(RetentionPolicy.RUNTIME)
 @Inherited
 @Documented
 public @interface TableSeg {
	/**
	 * 表名
	 * @return
	 */
	public String tableName();

}