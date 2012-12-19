/*
 *  Language file for AJAX Cart Javascript
 *  Copyright (c) 2011 DIGICRAFTS. All Right Reserved.
 *
 *  This software is the confidential and proprietary information of
 *  DIGICRAFTS. ("Confidential Information").  You shall not
 *  disclose such Confidential Information and shall use it only in
 *  accordance with the terms of the license agreement you entered into
 *  with DIGICRAFTS. 
 */

// English

DC.cart.lang_en ={
    
    cartwidget:'%S item(s) in cart',
    
    button_update   :'update',
    button_delete   :'delete',
    button_billing  :'Check Out',
    button_cart     :'Review Cart',
    button_shipping :'Edit Shipping',
    button_cancel   :'Cancel',
    
    label_total     :'Total',
    label_item_info  :'You have %S item(s) in your cart.',
    label_noitem     :'You have no item in your cart',   
    label_shipping_info  :'Please enter the shipping details. Total shipping cost: %S.',
    
    label_item_cost  :'You have %S item(s) in your cart and cost %A.',
    label_shipping_cost :'Total shipping cost is %S.',
    label_total_cost :'Total amount is %S.',
    label_payment_info  :'Your order is show below. Process to checkout by click the button below.',     
    
    step1          :'Step 1',
    step2          :'Step 2',
    step3          :'Step 3',
    step1_text     :'Review Cart',
    step2_text     :'Shipping',
    step3_text     :'Check Out'    
    
};
DC.cart.lang_en.Country = [
        {code:"AR", label:"Argentina", iso:"32"},
        {code:"AU", label:"Australia", iso:"36"},
        {code:"AT", label:"Austria", iso:"40"},
        {code:"BE", label:"Belgium", iso:"56"},
        {code:"BO", label:"Bolivia", iso:"68"},
        {code:"BR", label:"Brazil", iso:"76"},
        {code:"CA", label:"Canada", iso:"124"},
        {code:"CL", label:"Chile", iso:"152"},
        {code:"CO", label:"Columbia", iso:"170"},
        {code:"CR", label:"Costa Rica", iso:"188"},
        {code:"DK", label:"Denmark", iso:"208"},
        {code:"DO", label:"Domican Republic", iso:"214"},
        {code:"EC", label:"Ecuador", iso:"218"},
        {code:"SV", label:"El Salvador", iso:"222"},
        {code:"FI", label:"Finland", iso:"246"},
        {code:"FR", label:"France", iso:"250"},
        {code:"DE", label:"Germany", iso:"276"},
        {code:"GT", label:"Guatemala", iso:"320"},
        {code:"GR", label:"Greece", iso:"300"},
        {code:"HN", label:"Honduras", iso:"340"},
        {code:"HU", label:"Hungary", iso:"348"},
        {code:"IE", label:"Ireland", iso:"372"},
        {code:"IT", label:"Italy", iso:"380"},
        {code:"LU", label:"Luxembourg", iso:"442"},
        {code:"MX", label:"Mexico", iso:"484"},
        {code:"NL", label:"Netherlands", iso:"528"},
        {code:"NZ", label:"New Zealand", iso:"554"},
        {code:"NI", label:"Nicaragua", iso:"558"},
        {code:"NO", label:"Norway", iso:"578"},
        {code:"PA", label:"Panama", iso:"591"},
        {code:"PY", label:"Paraguay", iso:"600"},
        {code:"PE", label:"Peru", iso:"604"},
        {code:"PL", label:"Poland", iso:"616"},
        {code:"PT", label:"Portugal", iso:"620"},
        {code:"PR", label:"Puerto Rico", iso:"630"},
        {code:"ES", label:"Spain", iso:"724"},
        {code:"SE", label:"Sweden", iso:"752"},
        {code:"CH", label:"Switzerland", iso:"756"},
        {code:"GB", label:"United Kingdom", iso:"826"},
        {code:"US", label:"United States", iso:"840"},
        {code:"UY", label:"Uruguay", iso:"858"},
        {code:"VE", label:"Venezuela", iso:"862"}
];
DC.cart.lang_en.addressform = [
    [
        {'id':'firstname','type':'textinput','label':'First Name','alt':'Please enter first name'},
        {'id':'lastname','type':'textinput','label':'Last Name','alt':'Please enter last name'},
    ],
    {'id':'line1','type':'textinput','label':'Address','alt':'Please enter address'},
    {'id':'line2','type':'textinput','label':' ','alt':'Please enter address line 2'},
    [
        {'id':'city','type':'textinput','label':'City','alt':'Please enter city'},
        {'id':'zip','type':'textinput','label':'Postcode/ZIP','alt':'Please enter Postcode/ZIP'},
    ],
    {'id':'country','type':'combobox','label':'Country','alt':'help here','data':DC.cart.lang_en.Country,'dataKey':'code'},
    {'id':'phone','type':'textinput','label':'Contact No.','alt':'Please Contact No.'}
];

// Japanese

DC.cart.lang_jp = {
    
    cartwidget:'%S 項目',
    
    button_update:'更新',
    button_delete:'削除',
    button_billing:'チェックアウト',
    button_cart:'カートを編集',
    button_shipping:'配送を編集',
    button_cancel:'キャンセル',
    
    label_total:'合計',
    label_item_info:'あなたが％カートにSのアイテム',
    label_noitem:'あなたのショッピングカートにはアイテムを持っている',
    label_shipping_info:'商品の詳細を入力してください。合計送料：%Sの',
    
    label_item_cost:'カートとコスト%Aであなたが％S個のアイテム）',
    label_shipping_cost:'合計送料は%Sです。',
    label_total_cost:'合計金額は%Sです。',
    label_payment_infoは:'あなたのために以下に示すです。プロセス下のボタンをクリックしてチェックアウトする',
    
    step1:'1',
    step2:'2',
    step3:'3',
    step1_text:'カート',
    step2_text:'配送',
    step3_text:'チェックアウト'
};

DC.cart.lang_jp.Country = DC.cart.lang_en.Country;

DC.cart.lang_jp.addressform = [
    [
        {'id':'firstname','type':'textinput','label':'名前','alt':'名前を入力してください。'},
        {'id':'lastname','type':'textinput','label':'姓','alt':'姓を入力してください。'},
    ],
    {'id':'line1','type':'textinput','label':'アドレス','alt':'アドレスを入力してください。'},
    {'id':'line2','type':'textinput','label':' ','alt':'アドレス2を入力してください。'},
    [
        {'id':'city','type':'textinput','label':'市','alt':'市を入力してください。'},
        {'id':'zip','type':'textinput','label':'郵便番号','alt':'郵便番号を入力してください。'},
    ],
    {'id':'country','type':'combobox','label':'国','alt':'help here','data':DC.cart.lang_jp.Country,'dataKey':'code'},
    {'id':'phone','type':'textinput','label':'テレフォン','alt':'テレフォンを入力してください。'}
];

//German

DC.cart.lang_de = {
    
    cartwidget:'%S item(s) in cart',
    
    button_update: 'update',
    button_delete: 'löschen',
    button_billing: 'Check Out',
    button_cart: 'Review Cart',
    button_shipping: 'Express ',
    button_cancel: 'Abbrechen',

    label_total: 'Total ',
    label_item_info: 'Du hast %S Position in Ihrem Warenkorb. ',
    label_noitem: 'Sie haben keine Artikel in Ihrem Warenkorb',
    label_shipping_info: 'Bitte geben Sie die Details. Insgesamt Versandkosten: %S. ',

    label_item_cost: 'Du hast %S Position in Ihrem Warenkorb und kostengünstige %A. ',
    label_shipping_cost: 'Gesamte Versandkosten ist %S. ',
    label_total_cost: 'Gesamtbetrag ist %S. ',
    label_payment_info: 'Ihre Bestellung ist unten dargestellt. Prozess zur Kasse, indem Sie auf den Button unten.',

    step1: 'Schritt 1',
    step2: 'Schritt 2',
    step3: 'Schritt 3',
    step1_text: 'Review Cart',
    step2_text: 'Express',
    step3_text: 'Check Out'
};
DC.cart.lang_de.Country = DC.cart.lang_en.Country;
DC.cart.lang_de.addressform = [
    [
        {'id':'firstname','type':'textinput','label':'Vorname','alt':'Bitte geben Sie Vorname'},
        {'id':'lastname','type':'textinput','label':'Nachname','alt':'Bitte geben Sie Nachname'},
    ],
    {'id':'line1','type':'textinput','label':'Adresse','alt':'Bitte geben Sie Adresse'},
    {'id':'line2','type':'textinput','label':' ','alt':'Bitte geben Sie Adresse 2'},
    [
        {'id':'city','type':'textinput','label':'City','alt':'Bitte geben Sie City'},
        {'id':'zip','type':'textinput','label':'Postleitzahl','alt':'Bitte geben Sie Postleitzahl'},
    ],
    {'id':'country','type':'combobox','label':'Land','alt':'Bitte geben Sie Land','data':DC.cart.lang_de.Country,'dataKey':'code'},
    {'id':'phone','type':'textinput','label':'Kontakt','alt':'Bitte geben Sie Kontakt'}
];