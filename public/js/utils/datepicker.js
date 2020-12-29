export const date = () => {
    $(document).ready(function () {
        $.fn.datepicker.dates['fr'] = {
            days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
            daysShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
            daysMin: ['d', 'l', 'ma', 'me', 'j', 'v', 's'],
            months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre',
                'novembre', 'décembre'],
            monthsShort: ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.',
                'déc.'],
            today: 'Aujourd\'hui',
            monthsTitle: 'Mois',
            clear: 'Effacer',
            weekStart: 1,
            format: 'dd/mm/yyyy'
        };
        const arrows = {
            leftArrow: '<i class="feather icon-chevron-left"></i>',
            rightArrow: '<i class="feather icon-chevron-right"></i>'
        };
        // minimum setup
        $('#pc-datepicker-1')
            .datepicker({
                todayHighlight: true,
                orientation: 'auto',
                templates: arrows,
                format: 'yyyy/mm/dd',
                autoclose: true,
                language: 'fr'
            });

        $('.pc-datepicker-2').each(function () {
            $(this).datepicker({
                todayHighlight: true,
                templates: arrows,
                format: 'yyyy/mm/dd',
                autoclose: true,
                language: 'fr',
                orientation:'auto'
            });
        });


        // range picker
        $('#pc-datepicker-5').datepicker({
            todayHighlight: true,
            templates: arrows,
            format: 'yyyy/mm/dd'
        });

        $('.pc-datepicker-6').each(function(){
            $(this).datepicker({
                todayHighlight: true,
                templates: arrows,
                format: 'yyyy/mm/dd'
            });
        })



        // // minimum setup for modal demo
        // $('#pc-datepicker-1_modal').datepicker({
        //     todayHighlight: true,
        //     orientation: "bottom left",
        //     templates: arrows
        // });
        //
        // // input group layout
        // $('#pc-datepicker-2').datepicker({
        //     todayHighlight: true,
        //     orientation: "bottom left",
        //     templates: arrows
        // });
        //
        // // input group layout for modal demo
        // $('#pc-datepicker-2_modal').datepicker({
        //     todayHighlight: true,
        //     orientation: "bottom left",
        //     templates: arrows
        // });
        //
        // // enable clear button
        // $('#pc-datepicker-3, #pc-datepicker-3_validate').datepicker({
        //     todayBtn: "linked",
        //     clearBtn: true,
        //     todayHighlight: true,
        //     templates: arrows
        // });
        //
        // // enable clear button for modal demo
        // $('#pc-datepicker-3_modal').datepicker({
        //     todayBtn: "linked",
        //     clearBtn: true,
        //     todayHighlight: true,
        //     templates: arrows
        // });
        //
        // // orientation
        // $('#pc-datepicker-4_1').datepicker({
        //     orientation: "top left",
        //     todayHighlight: true,
        //     templates: arrows
        // });
        //
        // $('#pc-datepicker-4_2').datepicker({
        //     orientation: "top right",
        //     todayHighlight: true,
        //     templates: arrows
        // });
        //
        // $('#pc-datepicker-4_3').datepicker({
        //     orientation: "bottom left",
        //     todayHighlight: true,
        //     templates: arrows
        // });
        //
        // $('#pc-datepicker-4_4').datepicker({
        //     orientation: "bottom right",
        //     todayHighlight: true,
        //     templates: arrows
        // });

        // inline picker
        // $('#pc-datepicker-6').datepicker({
        //     todayHighlight: true,
        //     templates: arrows
        // });

        // $(function() {
        //     $('input[name="daterange"]').daterangepicker({
        //         opens: 'left'
        //     }, function(start, end, label) {
        //
        //     });
        // });
        // $(function() {
        //     $('input[name="datetimes"]').daterangepicker({
        //         timePicker: true,
        //         startDate: moment().startOf('hour'),
        //         endDate: moment().startOf('hour').add(32, 'hour'),
        //         locale: {
        //             format: 'M/DD hh:mm A'
        //         }
        //     });
        // });
        // $(function() {
        //     $('input[name="birthday"]').daterangepicker({
        //         singleDatePicker: true,
        //         showDropdowns: true,
        //         minYear: 1901,
        //         maxYear: parseInt(moment().format('YYYY'),10)
        //     }, function(start, end, label) {
        //         var years = moment().diff(start, 'years');
        //         alert("You are " + years + " years old!");
        //     });
        // });
        // $(function() {
        //
        //     var start = moment().subtract(29, 'days');
        //     var end = moment();
        //
        //     function cb(start, end) {
        //         $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        //     }
        //
        //     $('#reportrange').daterangepicker({
        //         startDate: start,
        //         endDate: end,
        //         ranges: {
        //             'Today': [moment(), moment()],
        //             'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        //             'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        //             'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        //             'This Month': [moment().startOf('month'), moment().endOf('month')],
        //             'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1,
        // 'month').endOf('month')] } }, cb);  cb(start, end);  }); $(function() {
        // $('input[name="datefilter"]').daterangepicker({ autoUpdateInput: false, locale: { cancelLabel: 'Clear' } });
        //  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        // $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY')); });
        // $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) { $(this).val(''); });  });
    });
};