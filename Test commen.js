$(document).ready(function () {
    'use strict'
    $('.content-comment').readmore({
        maxHeight: 105,
        speed: 100,
        moreLink: '<p class="readmore"><a href="#">Xem Thêm</a></p>',
        lessLink: '<p class="readmore"><a href="#">Rút Gọn</a></p>',
        embedCSS: true,
        sectionCSS: 'display: block; width: 100%;',
        startOpen: false,
        expandedClass: 'readmore-js-expanded',
        collapsedClass: 'readmore-js-collapsed'
    });
});
function validateEmail(email) {
    var re = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return re.test(email);
}

function validateName(name) {
    var nameRegex = /^[a-zA-Z\-\s\_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
    return nameRegex.test(name);
}
function openComment(){
    if(login == 0){
        alert('Vui lòng đăng nhập trước khi bình luận!');
    }else{
        $('.comment-placeholder').addClass('hidden');
        $('.main_comment .mess-input').removeClass('hidden');
        tinymce.init({
            forced_root_block: !1,
            force_br_newlines: !0,
            force_p_newlines: !1,
            entity_encoding: "raw",
            selector: ".mess-input .textarea",
            menubar: !1,
            statusbar: !1,
            plugins: ["autoresize", "emobabysoldier, emoonion, emobafu, emothobua, emothotuzki, emoyoyo, emopanda, emotrollface, emogif", "paste"],
            paste_as_text: !0,
            toolbar: "emotrollface emoonion emobafu emothobua emothotuzki emoyoyo emopanda emobabysoldier emogif",
            height: 100,
            autoresize_min_height: 100,
            autoresize_max_height: 300,
            autoresize_bottom_margin: 0,
            setup: function (t) {
                t.on("init", function () {
                    this.getDoc().body.style.fontSize = "14px";
                });
            },
            init_instance_callback: function () {
                setTimeout(function () {
                    tinyMCE.get("content_comment").focus();
                }, 500);
            },
        })
    }
}
function loadReply(id){
    var book_id = $('#book_id').val();
    $.ajax({
        method: "POST",
        url: urlCommentLoad,
        data: {book_id: book_id, parent_id: id}
    }).done(function (html) {
        $(".list-comment .child_" + id).append(html);
        $(".load_child_" + id).html('');
        $('.list-comment .content-comment').readmore({
            maxHeight: 105,
            speed: 100,
            moreLink: '<p class="readmore"><a href="#">Xem Thêm</a></p>',
            lessLink: '<p class="readmore"><a href="#">Rút Gọn</a></p>',
            embedCSS: true,
            sectionCSS: 'display: block; width: 100%;',
            startOpen: false,
            expandedClass: 'readmore-js-expanded',
            collapsedClass: 'readmore-js-collapsed'
        });
        lazyload();
    });
}
function loadComment(page){
    var book_id = $('#book_id').val();
    $.ajax({
        method: "POST",
        url: urlCommentLoad,
        data: {book_id: book_id, parent_id: 0, page: page}
    }).done(function (html) {
        $(".list-comment").html(html);
        $('.list-comment .content-comment').readmore({
            maxHeight: 105,
            speed: 100,
            moreLink: '<p class="readmore"><a href="#">Xem Thêm</a></p>',
            lessLink: '<p class="readmore"><a href="#">Rút Gọn</a></p>',
            embedCSS: true,
            sectionCSS: 'display: block; width: 100%;',
            startOpen: false,
            expandedClass: 'readmore-js-expanded',
            collapsedClass: 'readmore-js-collapsed'
        });
        lazyload();
    });
}
            },
            init_instance_callback: function () {
                setTimeout(function () {
                    tinyMCE.get("content_comment_" + id).focus();
                }, 500);
            },
        })
    }
}


function sendComment(that) {
    var reply_id = $(that).data("id");
    var parent = $(that).data("parent");
    var reply_name = $(that).data("replyname");
    var user = $(that).data("user");
    var book_id = $('#book_id').val();
    var episode_name = $('#episode_name').val();
    var episode_id = $('#episode_id').val();
    var slug = $('#slug').val();
    if(typeof reply_id != 'undefined'){
        var content = tinymce.get("content_comment_" + reply_id).getContent().trim();
        var name_comment = $('#name_comment_' + reply_id).val().trim();
        var email_comment = $('#email_comment_' + reply_id).val().trim();
    }else{
        var content = tinymce.get("content_comment").getContent().trim();
        var name_comment = $('#name_comment').val().trim();
        var email_comment = $('#email_comment').val().trim();
    }


    var data = {
        name_comment: name_comment,
        email_comment: email_comment,
        slug: slug, content: content,
        book_id: book_id,
        episode_name: episode_name,
        episode_id: episode_id
    };

    if(typeof parent != undefined){
        data.parent_id = parent;
    }

    if(typeof reply_id != undefined){
        data.reply_id = reply_id;
    }

    if (typeof user != undefined) {
        data.reply_user = user;
    }
    if (typeof reply_name != undefined) {
        data.reply_name = reply_name;
    }
    var textError = "";
    if(typeof reply_id != 'undefined'){
        if ($(tinymce.get("content_comment_" + reply_id).getBody()).find('img').length > 3) {
            textError += "Bạn không được dùng quá 3 mặt cười.\n";
        }
    }else{
        if ($(tinymce.get('content_comment').getBody()).find('img').length > 3) {
            textError += "Bạn không được dùng quá 3 mặt cười.\n";
        }
    }
    if(typeof parent != undefined){
        data.parent_id = parent;
    }

    if (content == "") {
        textError += "Vui lòng nhập nội dung bình luận.\n";
    }
    if (name_comment == "") {
        textError += "Vui lòng nhập tên của bạn.\n";
    }
    if(name_comment.length > 16){
        textError += "Tên không được quá 16 ký tự.\n";
    }
    if(email_comment != '' && validateEmail(email_comment) == false) {
        textError += "Định dạng email chưa chính xác\n";
    }
    if(name_comment != '' && validateName(name_comment) == false) {
        textError += "Tên không được sử dụng các ký tự đặc biệt.\n";
    }
    if(textError != ''){
        alert(textError);
    }else{
        $.ajax({
            method: "POST",
            url: urlComment,
            data: data
        }).done(function (html) {
            if(typeof reply_id != 'undefined'){
                $('.child_' + reply_id).after(html);
                tinymce.get("content_comment_" + reply_id).setContent("");
                $('.repcomment_id_' + reply_id).addClass('hidden');
            }else{
                $('.list-comment').prepend(html);
                tinymce.get("content_comment").setContent("");
            }

            $('.content-comment').readmore({
                maxHeight: 105,
                speed: 100,
                moreLink: '<p class="readmore"><a href="#">Xem Thêm</a></p>',
                lessLink: '<p class="readmore"><a href="#">Rút Gọn</a></p>',
                embedCSS: true,
                sectionCSS: 'display: block; width: 100%;',
                startOpen: false,
                expandedClass: 'readmore-js-expanded',
                collapsedClass: 'readmore-js-collapsed'
            });
            lazyload();
        });
    }
}
function removeComment(id) {
    var book_id = $('#book_id').val();
    var result = confirm("Bạn có chắc muốn xoá comment này không?");
    if (result == true) {
        $.ajax({
            method: "POST",
            url: urlCommentRemove,
            data: {id: id, book_id: book_id}
        }).done(function (data) {
            $('.list-comment .parent_' + id).remove();
            $('.list-comment .child_' + id).remove();
        });
    }
}

function lazyload(){
    $('.lazy-image').Lazy({
        enableThrottle: true,
        throttle: 0,
        attribute: "data-src",
        effect: "show",
        afterLoad: function(element) {
            element.removeClass('lazy-image');
        },
    });
}
