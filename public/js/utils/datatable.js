export const table = ()=>{
    // [ Individual Column Searching (Text Inputs) ]
    $('#footer-search tfoot th').each(function() {
        const title = $(this).text();
        $(this).html('<input type="text" class="form-control form-control-sm rounded-0" placeholder="Search ' + title + '" />');
    });

    const table = $('#footer-search').DataTable({
        //ordering:  false,
        "order": [],
        "columnDefs": [
            { "width": "100px", "targets": -1 }
        ]
    });

    // [ Apply the search ]
    table.columns().every(function() {
        const that = this;

        $('input', this.footer()).on('keyup change', function() {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });

    /******************************************************************
     *TABLE N°2*/

    // [ Individual Column Searching (Text Inputs) ]
    $('#footer-search2 tfoot th').each(function() {
        const title = $(this).text();
        $(this).html('<input type="text" class="form-control form-control-sm rounded-0" placeholder="Search ' + title + '" />');
    });

    const table2 = $('#footer-search2').DataTable({
        //ordering:  false,
        "order": []
    });

    // [ Apply the search ]
    table2.columns().every(function() {
        const that = this;

        $('input', this.footer()).on('keyup change', function() {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });
}
