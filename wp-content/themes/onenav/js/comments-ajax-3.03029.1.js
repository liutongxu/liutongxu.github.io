jQuery(document).ready(function(jQuery) {
	var __cancel = $('#cancel-comment-reply-link'),
	__cancel_text = __cancel.text(),
	__list = 'comment-list'; 
	$(document).on("submit", "#commentform", function() {
		$.ajax({
			url: theme.ajaxurl,
			data: $(this).serialize() + "&action=ajax_comment",
			type: $(this).attr('method'), 
            beforeSend: showAlert(JSON.parse('{"status":2,"msg":"提交中...."}')),
			error: function(request) {
				showAlert(JSON.parse(request.responseText));
			},
			success: function(data) {
				$('textarea').each(function() {
					this.value = ''
				});
				var cancel = document.getElementById('cancel-comment-reply-link'),
					temp = document.getElementById('wp-temp-form-div'),
                    respond = document.getElementById('respond'), 
					post = document.getElementById('comment_post_ID').value,
                    parent = document.getElementById('comment_parent').value;
                    $text = $(data);
				if (parent != '0') {
                    $children = $('<ul class="children"></ul>');
                    $('#respond').before($children);
                    $children.html($text);
				} else if (!$('.' + __list ).length) {
                    $children = $('<ul class="' + __list + '"></ul>');
					if (theme.formpostion == 'bottom') {
						$('#respond').before($children);
					} else {
						$('#respond').after($children);
					}
                    $children.html($text);
				} else {
					if (theme.order == 'asc') {
						$('.' + __list ).append($text); 
					} else {
						$('.' + __list ).prepend($text); 
					}
                }
                $text.children(".new-comment").animate({opacity : 0},2000);
				showAlert(JSON.parse('{"status":1,"msg":"提交成功!"}'));
				cancel.style.display = 'none';
				cancel.onclick = null;
				document.getElementById('comment_parent').value = '0';
				if (temp && respond) {
					temp.parentNode.insertBefore(respond, temp);
					temp.parentNode.removeChild(temp)
				}
			}
		});
		return false;
	});
});
