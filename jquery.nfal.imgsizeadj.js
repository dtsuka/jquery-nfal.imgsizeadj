/*!
 * NFAL Image Size Adjuster - jQuery Plugin
 *
 * Copyright 2013, Near Future Arts Lab Co.,Ltd.
 * http://kinbi.net
 *
 * Version: 0.0.3 (11/06/2013)
 */
(function ($) {
	$.fn.imgSizeAdj = function(options) {
		return this.each(function(){
			var opts = $.extend({}, $.fn.imgSizeAdj.defaults, options);
			var $this = $(this);
			
			// オリジナルのサイズ
			var osize = {
				h :  (opts.height)?opts.height:$this.attr('height'),
				w :  (opts.width)?opts.width:$this.attr('width')
			}
			if(!osize.h || !osize.w) return;
			
			//親要素の指定
			$parent = (opts.parent)?opts.parent:$this.parent();
			var psize = {
					h : $parent.height(),
					w : $parent.width()
			}
			
			//リサイズ処理
			if(opts.mode == 'inner'){ //親要素を埋めるように配置
				if(osize.h>psize.h){
					$this.css({
						height:psize.h
					});
				}else{
					$this.css({
						height:osize.h
					});
				}
				if(osize.w>psize.w){
					$this.css({
						width:psize.w
					});
				}else{
					$this.css({
						width:osize.w
					});
				}
				var nsize = {
					h : parseFloat($this.css('height')),
					w : parseFloat($this.css('width'))
				}
				if(nsize.h/osize.h > nsize.w/osize.w){
					$this.css({
						height:osize.h*nsize.w/osize.w
					});
				}else{
					$this.css({
						width:osize.w*nsize.h/osize.h
					});
				}
				if(opts.verticalCentring){//上下のセンタリング
					nsize.h = parseFloat($this.css('height'));
					if(psize.h>osize.h){
						$this.css({
							marginTop:(psize.h-osize.h)/2
						});
					}else{
						$this.css({
							marginTop:(psize.h-nsize.h)/2
						});
					}
				}
				if(opts.horizontalCentering){//左右のセンタリング
					nsize.w = parseFloat($this.css('width'));
					if(psize.w>osize.w){
						$this.css({
							marginLeft:(psize.w-osize.w)/2
						});
					}else{
						$this.css({
							marginLeft:(psize.w-nsize.w)/2
						});
					}
				}
			}else if(opts.mode == 'outer'){ //親要素からはみ出すように配置
				if(osize.h/psize.h > osize.w/psize.w){
					$this.css({
						width:psize.w,
						height:osize.h*psize.w/osize.w
					});
					if(opts.verticalCentring){//上下のセンタリング
						$this.css({
							marginTop:(psize.h-osize.h*psize.w/osize.w)/2
						});
					}
				}else{
					$this.css({
						width:osize.w*psize.h/osize.h,
						height:psize.h
					});
					if(opts.horizontalCentering){//左右のセンタリング
						$this.css({
							marginLeft:(psize.w-osize.w*psize.h/osize.h)/2
						});
					}
				}
			}	
		});
	};
	
	$.fn.imgSizeAdj.defaults = {
		mode				: 'outer', //inner / outer
		parent				: null,
		horizontalCentering	: true,
		verticalCentring	: true
	};
})(jQuery);