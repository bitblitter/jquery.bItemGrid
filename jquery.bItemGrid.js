(function($) {
    $.fn.bItemGrid = function(options){
        var settings = $.extend({
            data: null,
            itemCount: 0,
            maxCols: 3,
            cellContent: '',
            cellHandler: null,
            rootTag: 'ul',
            childTag: 'li'
        }, options);

        var maxUserCols = settings.maxCols;
        var itemCount = itemCount;
        var data = settings.data;
        var rootTag = settings.rootTag;
        var childTag = settings.childTag;
        var cellContentFunc = settings.cellHandler;
        var cellContent = settings.cellContent;

        if(data){
            itemCount = data.length;
        }

        if(typeof(cellContentFunc) !== 'function'){
            cellContentFunc = function(cell, cellInfo){
                cell.html(cellContent);
            };
        }

        var $parent = this;
        $parent.html('<'+rootTag+'/>');
        var $container = $parent.find(rootTag);
        var maxCols = Math.min(maxUserCols, Math.ceil(itemCount/2));
        var lastCols = (itemCount % maxCols) || maxCols;
        var rows = Math.ceil(itemCount / maxCols)-1;
        var rowHeight = $container.height() / (rows+1);

        for(var i = 0; i < itemCount; i++)
        {
            var row = Math.floor(i/maxCols);
            var rowCols = (row === rows ? lastCols : maxCols);
            var cellWidth = ($container.width() / rowCols);
            var cellData = null;
            if(data){ cellData = data[i]; }

            var rowItem = $('<'+childTag+'/>').appendTo($container);
            rowItem.css({height: rowHeight+'px', width: cellWidth+'px'});
            cellContentFunc(rowItem, {id: i, row: row, width: cellWidth, height: rowHeight, data: cellData });
        }
    };
} ( jQuery ));
