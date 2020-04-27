This is the BT garage extension 
create manifest file

Tutorial for search bar
https://youtu.be/v1PeTDrw6OY


//code for reference next time

.search-box{
    position: absolute;
    top: 150px;
    left: 45px;
    background: #2f3640;
    height: 40px;
    border-radius: 40px;
    padding: 10px;
}
.search-box:hover>.search-txt{
    width: 200px;
    padding: 0 6px;
}
.search-box:hover>.search-btn{
    background: white;
}
.search-btn{
    color: #e84118;
    float: right;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-txt{

    border: none;
    background: none;
    outline: none;
    float: left;
    padding:0;
    color: white;
    font-size: 16px;
    transition: .4s;
    line-height: 40px;
    width: 0px;
}
