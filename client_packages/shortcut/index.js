const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;

const ScreenRes = mp.game.graphics.getScreenResolution(0,0);
const MenuPoint = new Point(ScreenRes.x +150, 50);


mp.events.add("client:anim:openShortcut", (json) => {
    let ui_shortcut = new Menu("Shortcut Festlegen", "Speicher die Shortcuts", MenuPoint);
    json = JSON.parse(json);
    json.forEach(shortcut => {
          let num1 = new UIMenuItem("Numpad 1", "1");
          ui_shortcut.AddItem(num1);
          num1.SetRightLabel(""+shortcut.num1name);
          let num2 = new UIMenuItem("Numpad 2", "2");
          ui_shortcut.AddItem(num2);
          num2.SetRightLabel(""+shortcut.num2name);
          let num3 = new UIMenuItem("Numpad 3", "3");
          ui_shortcut.AddItem(num3);
          num3.SetRightLabel(""+shortcut.num3name);
          let num4 = new UIMenuItem("Numpad 4", "4");
          ui_shortcut.AddItem(num4);
          num4.SetRightLabel(""+shortcut.num4name);
          let num5 = new UIMenuItem("Numpad 5", "5");
          ui_shortcut.AddItem(num5);
          num5.SetRightLabel(""+shortcut.num5name);
          let num6 = new UIMenuItem("Numpad 6", "6");
          ui_shortcut.AddItem(num6);
          num6.SetRightLabel(""+shortcut.num6name);
          let num7 = new UIMenuItem("Numpad 7", "7");
          ui_shortcut.AddItem(num7);
          num7.SetRightLabel(""+shortcut.num7name);
          let num8 = new UIMenuItem("Numpad 8", "8");
          ui_shortcut.AddItem(num8);
          num8.SetRightLabel(""+shortcut.num8name);
          let num9 = new UIMenuItem("Numpad 9", "9");
          ui_shortcut.AddItem(num9);
          num9.SetRightLabel(""+shortcut.num9name);
      });
      ui_shortcut.Visible = true;
      ui_shortcut.ItemSelect.on((item, index, value) => {
      if (item.Text !== "Schließen") {
        mp.events.call("client:shortcut:step2",item.Description);
        ui_shortcut.Close();    
      } else if (item.Text == "Schließen") {
        ui_shortcut.Close();
      }
    });
  });
  
  mp.events.add("client:shortcut:step2", (id) => {
    let ui_shortsub = new Menu("Animations", "Wähle eine Animation aus", MenuPoint);
    ui_shortsub.AddItem(new UIMenuItem("Sitzen (Männl.)",""));
    ui_shortsub.AddItem(new UIMenuItem("Sitzen (Weibl.)",""));
    ui_shortsub.AddItem(new UIMenuItem("Sitzen (Stuhl)",""));
    ui_shortsub.AddItem(new UIMenuItem("Sitzen (Stuhl) 2",""));
    ui_shortsub.AddItem(new UIMenuItem("Sitzen (Stuhl Weibl.)","")); 
    ui_shortsub.AddItem(new UIMenuItem("Weinerlich Sitzen",""));    
    ui_shortsub.AddItem(new UIMenuItem("Auf dem Rücken liegen",""));  
    ui_shortsub.AddItem(new UIMenuItem("Auf dem Bauch liegen (Weibl.)","")); 
    ui_shortsub.AddItem(new UIMenuItem("Auf dem Bauch liegen (Männl.)",""));  
    ui_shortsub.AddItem(new UIMenuItem("Seitlich liegen",""));
    ui_shortsub.AddItem(new UIMenuItem("Betrunken liegen",""));
    ui_shortsub.AddItem(new UIMenuItem("Liegen (Ohnmacht)",""));
    ui_shortsub.AddItem(new UIMenuItem("Schlafen",""));
    ui_shortsub.AddItem(new UIMenuItem("Arme Verschränken (Männl.)", ""));
    ui_shortsub.AddItem(new UIMenuItem("Arme Verschränken (Weibl.)", ""));
    ui_shortsub.AddItem(new UIMenuItem("Security", ""));
    ui_shortsub.AddItem(new UIMenuItem("Anlehnen", ""));
    ui_shortsub.AddItem(new UIMenuItem("Anlehnen 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Arrogant", ""));
    ui_shortsub.AddItem(new UIMenuItem("Eingebildet", ""));
    ui_shortsub.AddItem(new UIMenuItem("Depressiv", ""));
    ui_shortsub.AddItem(new UIMenuItem("Salutieren", ""));
    ui_shortsub.AddItem(new UIMenuItem("Knien", ""));
    ui_shortsub.AddItem(new UIMenuItem("Auf die Knie", ""));
    ui_shortsub.AddItem(new UIMenuItem("Auf die Knie 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Verzweifelt Knien", ""));
    ui_shortsub.AddItem(new UIMenuItem("Gangzeichen 1", ""));
    ui_shortsub.AddItem(new UIMenuItem("Gangzeichen 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Strip 1", ""));
    ui_shortsub.AddItem(new UIMenuItem("Strip 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Strip 3", ""));
    ui_shortsub.AddItem(new UIMenuItem("Strip 4", ""));
    ui_shortsub.AddItem(new UIMenuItem("Strip 5", ""));
    ui_shortsub.AddItem(new UIMenuItem("Strip 6", ""));
    ui_shortsub.AddItem(new UIMenuItem("Ghetto", ""));
    ui_shortsub.AddItem(new UIMenuItem("Tao 1", ""));
    ui_shortsub.AddItem(new UIMenuItem("Tao 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Stepptanz 1", ""));
    ui_shortsub.AddItem(new UIMenuItem("Po wackeln", ""));
    ui_shortsub.AddItem(new UIMenuItem("Po wackeln 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Zumba 1", ""));
    ui_shortsub.AddItem(new UIMenuItem("Zumba 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Zumba 3", ""));
    ui_shortsub.AddItem(new UIMenuItem("Zumba 4", ""));
    ui_shortsub.AddItem(new UIMenuItem("Zumba 5", ""));
    ui_shortsub.AddItem(new UIMenuItem("Geiles lied", ""));
    ui_shortsub.AddItem(new UIMenuItem("Feminines Tanzen"))
    ui_shortsub.AddItem(new UIMenuItem("Tanzfaul"));
    ui_shortsub.AddItem(new UIMenuItem("Luftgitarre", ""));
    ui_shortsub.AddItem(new UIMenuItem("Banging Tunes", ""));
    ui_shortsub.AddItem(new UIMenuItem("Onkel Disco", ""));
    ui_shortsub.AddItem(new UIMenuItem("Der Fisch", ""));
    ui_shortsub.AddItem(new UIMenuItem("Herzrasen", ""));
    ui_shortsub.AddItem(new UIMenuItem("Snap", ""));
    ui_shortsub.AddItem(new UIMenuItem("Raise", ""));
    ui_shortsub.AddItem(new UIMenuItem("Salsa", ""));
    ui_shortsub.AddItem(new UIMenuItem("Cats Cradle", ""));
    ui_shortsub.AddItem(new UIMenuItem("Yoga 1", ""));
    ui_shortsub.AddItem(new UIMenuItem("Yoga 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Yoga 3", ""));
    ui_shortsub.AddItem(new UIMenuItem("Yoga 4", ""));
    ui_shortsub.AddItem(new UIMenuItem("Yoga 5", ""));
    ui_shortsub.AddItem(new UIMenuItem("Liegestütze 1", ""));
    ui_shortsub.AddItem(new UIMenuItem("Liegestütze 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Situps", ""));
    ui_shortsub.AddItem(new UIMenuItem("Flex", ""));
    ui_shortsub.AddItem(new UIMenuItem("Flex 2", ""));
    ui_shortsub.AddItem(new UIMenuItem("Begutachten", ""));
    ui_shortsub.AddItem(new UIMenuItem("Reparieren", ""));
    ui_shortsub.AddItem(new UIMenuItem("Putzen", ""));
    ui_shortsub.AddItem(new UIMenuItem("Pfeifen", ""));
    ui_shortsub.AddItem(new UIMenuItem("Ironisches Klatschen", ""));
    ui_shortsub.AddItem(new UIMenuItem("Peace", ""));
    ui_shortsub.AddItem(new UIMenuItem("2 Bier", ""));
    ui_shortsub.AddItem(new UIMenuItem("Double Peace", ""));
    ui_shortsub.AddItem(new UIMenuItem("Luftküssen", ""));
    ui_shortsub.AddItem(new UIMenuItem("Fuck you", ""));
    ui_shortsub.AddItem(new UIMenuItem("Daumen hoch", ""));
    ui_shortsub.AddItem(new UIMenuItem("Winken", ""));
    ui_shortsub.AddItem(new UIMenuItem("Facepalm", ""));
    ui_shortsub.AddItem(new UIMenuItem("Ausrasten", ""));
    ui_shortsub.AddItem(new UIMenuItem("Pinkeln", ""));
    ui_shortsub.AddItem(new UIMenuItem("Notieren", ""));
  
    ui_shortsub.AddItem( new UIMenuItem("Schließen", ""));
    ui_shortsub.Visible = true;
  
    ui_shortsub.ItemSelect.on((item, index, value) => {
     if (item.Text == "Sitzen (Männl.)") {
       let p1 = '"anim@heists@fleeca_bank@ig_7_jetski_owner"'
       let p2 = '"owner_idle"'
       mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
       ui_shortsub.Close();
      } else if (item.Text == "Sitzen (Weibl.)") {
        let p1 = '"amb@lo_res_idles@"'
        let p2 = '"world_human_picnic_female_lo_res_base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();    
      } else if (item.Text == "Sitzen (Stuhl)") {
        let p1 = '"switch@michael@sitting"'
        let p2 = '"idle"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close(); 
      } else if (item.Text == "Sitzen (Stuhl) 2") {
        let p1 = '"missfam2leadinoutmcs3"'
        let p2 = '"onboat_leadin_pornguy_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close(); 
      } else if (item.Text == "Sitzen (Stuhl Weibl.)") {
        let p1 = '"timetable@reunited@ig_10"'
        let p2 = '"base_amanda"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close(); 
      } else if (item.Text == "Weinerlich Sitzen") {
        let p1 = '"switch@trevor@floyd_crying"'
        let p2 = '"console_end_loop_floyd"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close(); 
      } else if (item.Text == "Auf dem Rücken liegen") {
        let p1 = '"amb@world_human_sunbathe@male@back@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,35);               
        ui_shortsub.Close(); 
      } else if (item.Text == "Auf dem Bauch liegen (Weibl.)") {
        let p1 = '"amb@world_human_sunbathe@male@front@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,35);
        ui_shortsub.Close(); 
      } else if (item.Text == "Auf dem Bauch liegen (Männl.)") {
        let p1 = '"amb@world_human_sunbathe@male@front@idle_a"'
        let p2 = '"idle"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,35);
        ui_shortsub.Close(); 
      } else if (item.Text == "Seitlich liegen") {
        let p1 = '"amb@lo_res_idles@"'
        let p2 = '"world_human_bum_slumped_right_lo_res_base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close(); 
      } else if (item.Text == "Betrunken liegen") {
        let p1 = '"timetable@amanda@drunk@idle_a"'
        let p2 = '"idle_pinot"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close(); 
      } else if (item.Text == "Liegen (Ohnmacht)") {
        let p1 = '"misssolomon_5@end"'
        let p2 = '"dead_black_ops"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close(); 
      } else if (item.Text == "Schlafen") {
        let p1 = '"missfinale_c1@"'
        let p2 = '"lying_dead_player0"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close(); 
      } else if (item.Text == "Arme Verschränken (Männl.)") {
        let p1 = '"anim@heists@heist_corona@single_team'
        let p2 = '"single_team_loop_boss"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close(); 
      } else if (item.Text == "Arme Verschränken (Weibl.)") {
        let p1 = '"amb@world_human_hang_out_street@female_arms_crossed@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close(); 
      } else if (item.Text == "Security") {
        let p1 = '"mini@strip_club@idles@bouncer@idle_a"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close(); 
      } else if (item.Text == "Anlehnen") {
        let p1 = '"amb@world_human_leaning@male@wall@back@foot_up@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,35);
        ui_shortsub.Close(); 
      } else if (item.Text == "Anlehnen 2") {
        let p1 = '"amb@world_human_leaning@male@wall@back@legs_crossed@idle_a"'
        let p2 = '"idle_c"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,35);
        ui_shortsub.Close(); 
      } else if (item.Text == "Arrogant") {
        let p1 = '"missmic_3_ext@leadin@mic_3_ext"'
        let p2 = '"_leadin_trevor"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close(); 
      } else if (item.Text == "Eingebildet") {
        let p1 = '"mp_move@prostitute@m@hooker"'
        let p2 = '"idle"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close(); 
      } else if (item.Text == "Salutieren") {
        let p1 = '"anim@mp_player_intuppersalute"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close(); 
      } else if (item.Text == "Depressiv") {
        let p1 = '"amb@world_human_bum_standing@depressed@idle_a"'
        let p2 = '"idle_c"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close(); 
      } else if (item.Text == "Auf die Knie 2") {
        let p1 = '"random@arrests"'
        let p2 = '"kneeling_arrest_idle"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Knien") {
        let p1 = '"amb@medic@standing@kneel@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Auf die Knie") {
        let p1 = '"missheist_jewel"'
        let p2 = '"manageress_kneel_loop"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Verzweifelt Knien") {
        let p1 = '"missfra2"'
        let p2 = '"lamar_base_idle"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Gangzeichen 1") {
        let p1 = '"mp_player_int_uppergang_sign_b"'
        let p2 = '"mp_player_int_gang_sign_b_exit"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Gangzeichen 2") {
        let p1 = '"mp_player_int_uppergang_sign_a"'
        let p2 = '"mp_player_int_gang_sign_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Strip 1") {
        let p1 = '"oddjobs@assassinate@multi@yachttarget@lapdance"'
        let p2 = '"yacht_ld_f"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Strip 2") {
        let p1 = '"mini@strip_club@private_dance@idle"'
        let p2 = '"priv_dance_idle"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Strip 3") {
        let p1 = '"mini@strip_club@private_dance@part1"'
        let p2 = '"priv_dance_p1"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Strip 4") {
        let p1 = '"mini@strip_club@private_dance@part2"'
        let p2 = '"priv_dance_p2"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Strip 5") {
        let p1 = '"mini@strip_club@private_dance@part3"'
        let p2 = '"priv_dance_p3"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();        
      } else if (item.Text == "Strip 6") {
        let p1 = '"mp_am_stripper"'
        let p2 = '"lap_dance_girl"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Ghetto") {
        let p1 = '"missfbi3_sniping"'
        let p2 = '"dance_m_default"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Tao 1") {
        let p1 = '"misschinese2_crystalmazemcs1_cs"'
        let p2 = '"dance_loop_tao"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Tao 2") {
        let p1 = '"misschinese2_crystalmazemcs1_ig"'
        let p2 = '"dance_loop_tao"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Stepptanz 1") {
        let p1 = '"special_ped@mountain_dancer@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Po wackeln") {
        let p1 = '"switch@trevor@mocks_lapdance"'
        let p2 = '"001443_01_trvs_28_idle_stripper"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Po wackeln 2") {
        let p1 = '"switch@trevor@mocks_lapdance"'
        let p2 = '"001443_01_trvs_28_exit_stripper"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Zumba 1") {
        let p1 = '"timetable@tracy@ig_5@idle_a"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Zumba 2") {
        let p1 = '"timetable@tracy@ig_5@idle_a"'
        let p2 = '"idle_b"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Zumba 3") {
        let p1 = '"timetable@tracy@ig_5@idle_a"'
        let p2 = '"idle_c"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Zumba 4") {
        let p1 = '"timetable@tracy@ig_5@idle_b"'
        let p2 = '"idle_d"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Zumba 5") {
        let p1 = '"timetable@tracy@ig_5@idle_b"'
        let p2 = '"idle_e"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Geiles lied") {
        let p1 = '"amb@world_human_cheering@female_b"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Feminines Tanzen") {
        let p1 = '"amb@world_human_jog_standing@female@idle_a"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Tanzfaul") {
        let p1 = '"amb@world_human_partying@female@partying_beer@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Luftgitarre") {
        let p1 = '"anim@mp_player_intcelebrationfemale@air_guitar"'
        let p2 = '"air_guitar"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Banging Tunes") {
        let p1 = '"anim@mp_player_intcelebrationmale@banging_tunes"'
        let p2 = '"banging_tunes"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,47);
        ui_shortsub.Close();
      } else if (item.Text == "Onkel Disco") {
        let p1 = '"anim@mp_player_intcelebrationmale@uncle_disco"'
        let p2 = '"uncle_disco"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,47);
        ui_shortsub.Close();
      } else if (item.Text == "Herzrasen") {
        let p1 = '"anim@mp_player_intcelebrationmale@heart_pumping"'
        let p2 = '"heart_pumping"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,47);
        ui_shortsub.Close();
      } else if (item.Text == "Der Fisch") {
        let p1 = '"anim@mp_player_intcelebrationmale@oh_snap"'
        let p2 = '"oh_snap"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,47);
        ui_shortsub.Close();
      } else if (item.Text == "Snap") {
        let p1 = '"mp_player_int_uppergang_sign_a"'
        let p2 = '"mp_player_int_gang_sign_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Raise") {
        let p1 = '"anim@mp_player_intcelebrationmale@raise_the_roof"'
        let p2 = '"raise_the_roof"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,47);
        ui_shortsub.Close();
      } else if (item.Text == "Salsa") {
        let p1 = '"anim@mp_player_intcelebrationmale@salsa_roll"'
        let p2 = '"salsa_roll"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,47);
        ui_shortsub.Close();
      } else if (item.Text == "Cats Cradle") {
        let p1 = '"anim@mp_player_intcelebrationmale@cats_cradle"'
        let p2 = '"cats_cradle"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,47);
        ui_shortsub.Close();
      } else if (item.Text == "Yoga 1") {
        let p1 = '"rcmepsilonism3"'
        let p2 = '"ep_3_rcm_marnie_meditating"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Yoga 2") {
        let p1 = '"rcmepsilonism3"'
        let p2 = '"base_loop"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Yoga 3") {
        let p1 = '"rcmfanatic1maryann_stretchidle_b"'
        let p2 = '"idle_e"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Yoga 4") {
        let p1 = '"timetable@amanda@ig_4"'
        let p2 = '"ig_4_idle"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Yoga 5") {
        let p1 = '"amb@world_human_yoga@female@base"'
        let p2 = '"base_c"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Liegestütze 1") {
        let p1 = '"rcmfanatic3"'
        let p2 = '"ef_3_rcm_loop_maryann"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Liegestütze 2") {
        let p1 = '"amb@world_human_push_ups@male@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Situps") {
        let p1 = '"amb@world_human_sit_ups@male@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Flex") {
        let p1 = '"amb@world_human_muscle_flex@arms_at_side@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Flex 2") {
        let p1 = '"amb@world_human_muscle_flex@arms_in_front@idle_a"'
        let p2 = '"idle_b"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Begutachten") {
        let p1 = '"oddjobs@taxi@gyn@"'
        let p2 = '"idle_b_ped"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Reparieren") {
        let p1 = '"amb@world_human_vehicle_mechanic@male@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Putzen") {
        let p1 = '"timetable@maid@cleaning_window@base"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Pfeifen") {
        let p1 = '"rcmnigel1c"'
        let p2 = '"hailing_whistle_waive_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Ironisches Klatschen") {
        let p1 = '"amb@world_human_cheering@male_e"'
        let p2 = '"base"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Peace") {
        let p1 = '"anim@mp_player_intincarpeacestd@ds@"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "2 Bier") {
        let p1 = '"amb@code_human_in_car_mp_actions@v_sign@bodhi@rps@base"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Double Peace") {
        let p1 = '"anim@mp_player_intcelebrationmale@peace"'
        let p2 = '"peace"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Luftküssen") {
        let p1 = '"anim@mp_player_intcelebrationfemale@blow_kiss"'
        let p2 = '"blow_kiss"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Fuck you") {
        let p1 = '"anim@mp_player_intselfiethe_bird"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Daumen hoch") {
        let p1 = '"anim@mp_player_intupperthumbs_up"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Winken") {
        let p1 = '"anim@mp_player_intupperwave"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Facepalm") {
        let p1 = '"anim@mp_player_intupperface_palm"'
        let p2 = '"idle_a"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Ausrasten") {
        let p1 = '"anim@mp_player_intcelebrationmale@freakout"'
        let p2 = '"freakout"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Pinkeln") {
        let p1 = '"missbigscore1switch_trevor_piss"'
        let p2 = '"piss_loop"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,33);
        ui_shortsub.Close();
      } else if (item.Text == "Notieren") {
        let p1 = '"amb@world_human_clipboard@male@idle_a"'
        let p2 = '"idle_c"'
        mp.events.callRemote("server:shortcut:save",item.Text, id,p1,p2,1,49);
        ui_shortsub.Close();
      } else if (item.Text == "Schließen") {
        ui_shortsub.Close();
     }
   });
  });