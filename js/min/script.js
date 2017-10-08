$.ajax({
    // url: 'http://localhost:8000/TrainBooking/Ajax/SearchListHandler.ash',
    success: function(res){
        var data = JSON.parse(res);
        var str = '';
        str += `<div class="content">
            <table>
                <tr>
                    <td>${data.TrainName}</td>
                    <td>${data.StratTime}</td>
                    <td><b>始</b>${data.StartStationName}</td>
                    <td>${data.TakeTime}</td>
                    <td>${data.SeatBookingItem[0].SeatName}</td>
                    <td>￥${data.SeatBookingItem[0].Price}</td>
                    <td>余${data.SeatBookingItem[0].Inventory}张</td>
                    <td><span>预订</span></td>
                </tr>
                <tr>
                    <td>经停站</td>
                    <td>${data.EndTime}</td>
                    <td><b>过</b>${data.EndStationName}</td>
                    <td></td>
                    <td>${data.SeatBookingItem[1].SeatName}</td>
                    <td>￥${data.SeatBookingItem[1].Price}</td>
                    <td>余${data.SeatBookingItem[1].Inventory}张</td>
                    <td><span>预订</span></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>${data.SeatBookingItem[2].SeatName}</td>
                    <td>￥${data.SeatBookingItem[2].Price}</td>
                    <td>余${data.SeatBookingItem[2].Inventory}张</td>
                    <td><span>预订</span></td>
                </tr>
            </table>
        </div>`;
        document.getElementsByTagName('body')[0].innerHTML += str;
    },
    error: function(err){
        console.log(err);
    }
})