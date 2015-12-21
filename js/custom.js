$(document).ready(function(){
	var swiper = new Swiper('.carousel', 
		{
			speed: 400,
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			pagination: '.swiper-pagination',
			paginationClickable: true
		});

	var picker = new Pikaday({
		field: $('.search.advanced .datepicker input[type="text"]')[0],
		format: 'DD MMM YYYY',
	});
});