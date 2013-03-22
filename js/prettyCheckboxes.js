/* ------------------------------------------------------------------------
	prettyCheckboxes

	Developped By: Stephane Caron (http://www.no-margin-for-errors.com)
	Refactoring by: Norlin (http://github.com/norlin)
	Inspired By: All the non user friendly custom checkboxes solutions ;)
	Version: 1.2

	Copyright: Feel free to redistribute the script/modify it, as
				long as you leave my infos at the top.
------------------------------------------------------------------------- */

jQuery.fn.prettyCheckboxes = function(settings) {
	var classes = {
			checked: 'checked',
			holder: 'holder',
			holderWrap: 'holderWrap',
			hidden: 'hiddenCheckbox'
		},
		template = '<span class="' + classes.holderWrap + '"><span class="' + classes.holder + '"></span></span>';

	settings = jQuery.extend({
				checkboxWidth: 17,
				checkboxHeight: 17,
				className : 'prettyCheckbox',
				display: 'list'
			}, settings);

	$(this).each(function () {
		// Find the label
		var $input = $(this),
			$label = $('label[for="' + $input.attr('id') + '"]');

		// Add the checkbox holder to the label
		$label.prepend(template);

		// If the checkbox is checked, display it as checked
		if ($input.is(':checked')) {
			$label.addClass(classes.checked);
		}

		// Assign the class on the label
		$label.addClass(settings.className).
			addClass($input.attr('type')).
			addClass(settings.display);

		// Assign the dimensions to the checkbox display
		$label.find('.' + classes.holderWrap).
				width(settings.checkboxWidth).
				height(settings.checkboxHeight);

		$label.find('.' + classes.holder).
				width(settings.checkboxWidth);

		// Hide the checkbox
		$input.addClass(classes.hidden);

		// Associate the click event
		$label.click(function(){
			if ($input.is(':disabled')) {
				return false;
			}

			$input.triggerHandler('click');

			if ($input.is(':checkbox')){
				$label.toggleClass(classes.checked);
				$input.checked = true;

				$label.find('.' + classes.holder).css('top',0);
			} else {
				// Uncheck all radio
				$('input[name="' + $input.attr('name') + '"]').each(function () {
					$('label[for="' + this.id + '"]').removeClass(classes.checked);
				});

				$input.addClass(classes.checked);
				$input.checked = true;
			}
		});

		$input.keypress(function(e) {
			if (e.keyCode == 32){
				if ($.browser.msie){
					$label.toggleClass(classes.checked);
				} else {
					$input.trigger('click');
				}

				return false;
			}
		});
	});
};

var checkAllPrettyCheckboxes = function(caller, container){
	var $container = $(container),
		$inputs = $container.find('input[type=checkbox]');

	// Find the label corresponding to each checkbox...
	if ($(caller).is(':checked')) {
		$inputs = $inputs.not(':checked');
	} else {
		$inputs = $inputs.filter(':checked');
	}

	//...and click it
	$inputs.each(function(){
		var $this = $(this);

		$('label[for="' + this.id + '"]').trigger('click');

		if ($.browser.msie) {
			$this.attr('checked','checked');
		} else {
			$this.trigger('click');
		}
	});
};