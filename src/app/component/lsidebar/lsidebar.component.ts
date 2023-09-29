import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lsidebar',
  templateUrl: './lsidebar.component.html',
  styleUrls: ['./lsidebar.component.css']
})
export class LsidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    var self= this;

  $('.menu-btn').on('click', function (e) {
    e.stopPropagation();
    if ($('body').hasClass('sidemenu-open') == true) {
      $('body').removeClass('sidemenu-open');
    } else {
      $('body').addClass('sidemenu-open');
    };
   
  });

  if ($(document).width() <= 992) {
    $('body').removeClass('sidemenu-open');

  }
  $('.wrapper').on('click', function () {
    if ($('body').hasClass('sidemenu-open') == true) {
      $('body').removeClass('sidemenu-open');
    }
  });
  /* Sidebar navigation expand collapse */
  $('.sidebar .nav .dropdown-toggle').on('click', function () {
    if ($(this).closest('.dropdown').hasClass('show') === true) {
      $(this).next().slideToggle().closest('.dropdown').removeClass('show');
    } else {
      $(this).closest('.nav').find('.dropdown').removeClass('show').find('.nav').slideUp();
      $(this).next().slideToggle().closest('.dropdown').addClass('show');

    }

  });
  
  $('.nav-files .dropdown-toggle').on('click', function () {
    if ($(this).closest('.dropdown').hasClass('show') === true) {
      $(this).next().slideUp().closest('.dropdown').removeClass('show');
    } else {
      $(this).next().slideDown().closest('.dropdown').addClass('show');
    }

  });

  /* stop defualt event in card dropdown */
  $('.no-defaults').on('click', function (e) {
    e.stopPropagation();
  });

  /* select flag */
  $('.select-flag .dropdown-item').on('click', function () {
    var flagname = $(this).find('.flag-icon').attr('class');
    $(this).closest('.select-flag').find('.dropdown-toggle span').attr('class', flagname);
  });

  /* filter click open filter */
  if ($('body').hasClass('filtermenu-open') == true) {
    $('.filter-btn').find('i').html('close');
  }
  $('.filter-btn').on('click', function () {
    if ($('body').hasClass('filtermenu-open') == true) {
      $('body').removeClass('filtermenu-open');
      $(this).find('i').html('filter_list')

    } else {
      $('body').addClass('filtermenu-open');
      $(this).find('i').html('close')
    }
  });


  /* background image to cover */
  $('.background').each(function () {
    var imagewrap = $(this);
    var imagecurrent = $(this).find('img').attr('src');
    imagewrap.css('background-image', 'url("' + imagecurrent + '")');
    $(this).find('img').remove();
  });

  // $('.dropdown-toggle').on('click', function () {
  //   console.log("presiono")
  //   var thisdd = $(this);
  //   thisdd.removeClass('active');
  //   setTimeout(function () {
  //     thisdd.addClass('active');
  //   }, 100);
  //   $('.dropdown').on('hidden.bs.dropdown', function () {
  //     var thisddopen = $(this).find('.dropdown-toggle');
  //     thisddopen.removeClass('active');
  //   });
  // });

  /* chat btn floating script */
  $('.chat-btn ').on('click', function () {
    if ($(this).hasClass('active') != true) {
      var thiscb = $(this);
      thiscb.addClass('active');
      thiscb.next().addClass('active');
      setTimeout(function () {
        thiscb.next().addClass('show');
      }, 100);
    }

  });
  $('.chat-close').on('click', function () {
    var thisccb = $(this);
    thisccb.closest('.chat-window').removeClass('show');

    setTimeout(function () {
      thisccb.closest('.chat-window').removeClass('active');
      thisccb.closest('.chat-window').prev('.chat-btn').removeClass('active');
    }, 250);

  });



  /* footer and responive sizing */
  var footerheight = $('.footer').outerHeight();
  $('.footer').css('margin-top', -(footerheight)).prev('.content ').css('padding-bottom', footerheight);

  if ($(window).height() > 767) {
    /* mail-row height */
    $('.login-row-height').css('height', $(window).outerHeight() - $('.header').outerHeight() - $('.footer').outerHeight() - 50);
    $('.compose-row-height').css('height', $(window).outerHeight() - $('.header-container').outerHeight() - $('.footer').outerHeight() - 170);
    $('.mail-row-height').css('height', $(window).outerHeight() - $('.header-container').outerHeight() - $('.mail-header').outerHeight() - $('.footer').outerHeight() - 30);
    $('.file-row').css('min-height', $(window).outerHeight() - $('.header-container').outerHeight() - $('.mail-header').outerHeight() - $('.footer').outerHeight() - 30);
  }

  /* sidebar compact */
  if ($('body').hasClass('sidebar-compact') == true) {
    $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();
  }

  /* sidebar small */
  if ($('body').hasClass('sidebar-icon') == true) {
    $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();
  }
  $('.sidebar').on('mouseleave', function () {
    if ($('body').hasClass('sidebar-icon') || $('body').hasClass('sidebar-compact')) {
      $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();
    }
  })

  /*  fixed header */
  if ($('body').hasClass('header-fixed-top') == true) {
    var headerheight = $('.header-container').outerHeight() + 15;
    $('.wrapper').css('padding-top', headerheight);
  }

  $(window).on('resize', function () {

    /* footer and responive sizing */
    var footerheight = $('.footer').outerHeight();
    $('.footer').css('margin-top', -(footerheight)).prev('.content ').css('padding-bottom', footerheight);
  });

}

cerrarSesion(){
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  //localStorage.clear();
  localStorage.setItem('isLoggedIn', 'false');
  this.router.navigate(['login']);
 }

 recargar(){
   window.location.reload();
 }


}