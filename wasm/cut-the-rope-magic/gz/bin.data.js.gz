
  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'bin.data._.js';
      var REMOTE_PACKAGE_BASE = 'bin.data._.js';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "fx", true, true);
Module['FS_createPath']("/", "maps", true, true);
Module['FS_createPath']("/maps", "Tuts", true, true);
Module['FS_createPath']("/maps", "bosses", true, true);
Module['FS_createPath']("/maps", "pack1a", true, true);
Module['FS_createPath']("/maps", "pack2", true, true);
Module['FS_createPath']("/maps", "pack3a", true, true);
Module['FS_createPath']("/maps", "pack4", true, true);
Module['FS_createPath']("/maps", "pack4a", true, true);
Module['FS_createPath']("/maps", "pack5", true, true);
Module['FS_createPath']("/maps", "pack5a", true, true);
Module['FS_createPath']("/maps", "pack6", true, true);
Module['FS_createPath']("/maps", "pack6a", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency']('fp ' + that.name);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_bin.data._.js');

      };
      Module['addRunDependency']('datafile_bin.data._.js');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/AraJozoor-Regular.otf", "start": 0, "end": 62848}, {"filename": "/GoodDog_New.otf", "start": 62848, "end": 92864}, {"filename": "/about_640_960.raw", "start": 92864, "end": 94516}, {"filename": "/areas_01_640_960.raw", "start": 94516, "end": 140849}, {"filename": "/areas_02_640_960.raw", "start": 140849, "end": 154733}, {"filename": "/areas_dive_640_960.raw", "start": 154733, "end": 157963}, {"filename": "/areas_ghost_640_960.raw", "start": 157963, "end": 160812}, {"filename": "/areas_power_640_960.raw", "start": 160812, "end": 163700}, {"filename": "/areas_walk_640_960.raw", "start": 163700, "end": 165923}, {"filename": "/banner_bar_640_960.raw", "start": 165923, "end": 167237}, {"filename": "/bckgr_1_sky.pb", "start": 167237, "end": 177557}, {"filename": "/bckgr_1_sky_01_640_960.webp", "start": 177557, "end": 199597}, {"filename": "/bckgr_1_sky_02_640_960.webp", "start": 199597, "end": 209420}, {"filename": "/bckgr_1_sky_back_640_960.webp", "start": 209420, "end": 215516}, {"filename": "/bckgr_2_snails.pb", "start": 215516, "end": 222952}, {"filename": "/bckgr_2_snails_01_640_960.webp", "start": 222952, "end": 243048}, {"filename": "/bckgr_2_snails_back_640_960.webp", "start": 243048, "end": 259085}, {"filename": "/bckgr_dive.pb", "start": 259085, "end": 278185}, {"filename": "/bckgr_dive_01_640_960.webp", "start": 278185, "end": 293786}, {"filename": "/bckgr_dive_back_640_960.webp", "start": 293786, "end": 300614}, {"filename": "/bckgr_ghost.pb", "start": 300614, "end": 337951}, {"filename": "/bckgr_ghost_01_640_960.raw", "start": 337951, "end": 344694}, {"filename": "/bckgr_ghost_back_640_960.webp", "start": 344694, "end": 351968}, {"filename": "/bckgr_power_640_960.webp", "start": 351968, "end": 359185}, {"filename": "/bckgr_walk.pb", "start": 359185, "end": 381792}, {"filename": "/bckgr_walk_01_640_960.webp", "start": 381792, "end": 391412}, {"filename": "/bckgr_walk_back_640_960.webp", "start": 391412, "end": 401405}, {"filename": "/binding_button_pump_640_960.raw", "start": 401405, "end": 403822}, {"filename": "/binding_button_pump_old_640_960.raw", "start": 403822, "end": 416141}, {"filename": "/blackout_640_960.raw", "start": 416141, "end": 416714}, {"filename": "/blob.pb", "start": 416714, "end": 418872}, {"filename": "/blob_640_960.raw", "start": 418872, "end": 420147}, {"filename": "/bookshelf.pb", "start": 420147, "end": 421768}, {"filename": "/boss.pb", "start": 421768, "end": 579412}, {"filename": "/boss_640_960.raw", "start": 579412, "end": 590962}, {"filename": "/boss_candy.pb", "start": 590962, "end": 593729}, {"filename": "/btm_popup_more_apps.pb", "start": 593729, "end": 596198}, {"filename": "/bulb.pb", "start": 596198, "end": 600372}, {"filename": "/bulb_640_960.raw", "start": 600372, "end": 603739}, {"filename": "/button_google.pb", "start": 603739, "end": 609164}, {"filename": "/button_google_640_960.raw", "start": 609164, "end": 609951}, {"filename": "/button_long.pb", "start": 609951, "end": 613671}, {"filename": "/button_long_640_960.raw", "start": 613671, "end": 617675}, {"filename": "/button_round.pb", "start": 617675, "end": 623539}, {"filename": "/button_round_640_960.raw", "start": 623539, "end": 666590}, {"filename": "/button_short.pb", "start": 666590, "end": 670666}, {"filename": "/button_short_640_960.raw", "start": 670666, "end": 675298}, {"filename": "/button_square.pb", "start": 675298, "end": 680078}, {"filename": "/button_square_640_960.raw", "start": 680078, "end": 683667}, {"filename": "/buttons.pb", "start": 683667, "end": 743334}, {"filename": "/buttons_640_960.raw", "start": 743334, "end": 767641}, {"filename": "/candy_640_960.png", "start": 767641, "end": 772200}, {"filename": "/candy_leg.pb", "start": 772200, "end": 783970}, {"filename": "/chest_result.pb", "start": 783970, "end": 797646}, {"filename": "/common_screen_640_960.raw", "start": 797646, "end": 805545}, {"filename": "/common_screen_shading_640_960.raw", "start": 805545, "end": 808299}, {"filename": "/coppa_screen_new_640_960.png", "start": 808299, "end": 832562}, {"filename": "/counter_640_960.raw", "start": 832562, "end": 840469}, {"filename": "/decor_back_01_640_960.raw", "start": 840469, "end": 844143}, {"filename": "/decor_back_02_640_960.raw", "start": 844143, "end": 846686}, {"filename": "/decor_dive_640_960.raw", "start": 846686, "end": 849450}, {"filename": "/decor_ghost_640_960.raw", "start": 849450, "end": 854495}, {"filename": "/decor_ice_640_960.raw", "start": 854495, "end": 858619}, {"filename": "/decor_power_640_960.raw", "start": 858619, "end": 862775}, {"filename": "/decor_walk_640_960.raw", "start": 862775, "end": 866602}, {"filename": "/disconnect_popup_640_960.raw", "start": 866602, "end": 868912}, {"filename": "/endgame_popup_magic_640_960.raw", "start": 868912, "end": 877819}, {"filename": "/energy.pb", "start": 877819, "end": 953094}, {"filename": "/energy_640_960.raw", "start": 953094, "end": 962985}, {"filename": "/energy_common_640_960.raw", "start": 962985, "end": 972216}, {"filename": "/energy_common_bg_640_960.raw", "start": 972216, "end": 972476}, {"filename": "/explosion_dragon.pb", "start": 972476, "end": 1000746}, {"filename": "/explosion_dragon_640_960.raw", "start": 1000746, "end": 1001980}, {"filename": "/ftp_player_new_640_960.raw", "start": 1001980, "end": 1012294}, {"filename": "/fx/ability_bloc.zps", "start": 1012294, "end": 1015447}, {"filename": "/fx/ability_btn.zps", "start": 1015447, "end": 1017075}, {"filename": "/fx/ability_btn_idle.zps", "start": 1017075, "end": 1018075}, {"filename": "/fx/ability_btn_idle_2.zps", "start": 1018075, "end": 1018782}, {"filename": "/fx/blob.zps", "start": 1018782, "end": 1022712}, {"filename": "/fx/blok.zps", "start": 1022712, "end": 1030576}, {"filename": "/fx/cheese_smell.zps", "start": 1030576, "end": 1032479}, {"filename": "/fx/chest_part.zps", "start": 1032479, "end": 1034069}, {"filename": "/fx/dust_collection.zps", "start": 1034069, "end": 1038659}, {"filename": "/fx/dust_collection_hint.zps", "start": 1038659, "end": 1041402}, {"filename": "/fx/iceb_crach.zps", "start": 1041402, "end": 1043731}, {"filename": "/fx/iceb_idle.zps", "start": 1043731, "end": 1044731}, {"filename": "/fx/iceb_sl.zps", "start": 1044731, "end": 1046812}, {"filename": "/fx/loading_end.zps", "start": 1046812, "end": 1048369}, {"filename": "/fx/loading_idle.zps", "start": 1048369, "end": 1056594}, {"filename": "/fx/pack06_bg_fire_01.zps", "start": 1056594, "end": 1060325}, {"filename": "/fx/part_thank.zps", "start": 1060325, "end": 1063931}, {"filename": "/fx/restartb_fx_tutorial.zps", "start": 1063931, "end": 1066189}, {"filename": "/fx/shop_energy.zps", "start": 1066189, "end": 1067199}, {"filename": "/fx/shop_hint.zps", "start": 1067199, "end": 1068768}, {"filename": "/fx/shop_stardust.zps", "start": 1068768, "end": 1070337}, {"filename": "/fx/star_1_2.zps", "start": 1070337, "end": 1072630}, {"filename": "/fx/star_3.zps", "start": 1072630, "end": 1079712}, {"filename": "/fx/star__collecting.zps", "start": 1079712, "end": 1084078}, {"filename": "/fx/star_collection_result.zps", "start": 1084078, "end": 1086445}, {"filename": "/fx/star_part__idle.zps", "start": 1086445, "end": 1087463}, {"filename": "/fx/star_result .zps", "start": 1087463, "end": 1087947}, {"filename": "/fx/teleporl_idle.zps", "start": 1087947, "end": 1089584}, {"filename": "/fx/teleport_output.zps", "start": 1089584, "end": 1092304}, {"filename": "/fx/thank_1.zps", "start": 1092304, "end": 1094069}, {"filename": "/fx/thank_2.zps", "start": 1094069, "end": 1096338}, {"filename": "/fx/transformation.zps", "start": 1096338, "end": 1103330}, {"filename": "/fx/transformation_bulb.zps", "start": 1103330, "end": 1110279}, {"filename": "/fx/transformation_candy.zps", "start": 1110279, "end": 1116415}, {"filename": "/fx/transformation_short.zps", "start": 1116415, "end": 1123407}, {"filename": "/fx/trigger_constant.zps", "start": 1123407, "end": 1126125}, {"filename": "/fx/trigger_idle.zps", "start": 1126125, "end": 1127195}, {"filename": "/fx/trigger_pulsar.zps", "start": 1127195, "end": 1128720}, {"filename": "/fx/tutorial_hint.zps", "start": 1128720, "end": 1130230}, {"filename": "/fx/water_part.zps", "start": 1130230, "end": 1135734}, {"filename": "/fx_640_960.raw", "start": 1135734, "end": 1179596}, {"filename": "/gpx.resources", "start": 1179596, "end": 1189841}, {"filename": "/gradients_640_960.raw", "start": 1189841, "end": 1192137}, {"filename": "/hint_appearance.pb", "start": 1192137, "end": 1208594}, {"filename": "/hint_appearance_640_960.png", "start": 1208594, "end": 1217244}, {"filename": "/hint_firefly.pb", "start": 1217244, "end": 1360339}, {"filename": "/hint_firefly_640_960.raw", "start": 1360339, "end": 1366632}, {"filename": "/hud_640_960.png", "start": 1366632, "end": 1373865}, {"filename": "/hud_abilities.pb", "start": 1373865, "end": 1420238}, {"filename": "/hud_btn_hint.pb", "start": 1420238, "end": 1462089}, {"filename": "/hud_btn_pause.pb", "start": 1462089, "end": 1468808}, {"filename": "/hud_btn_restart.pb", "start": 1468808, "end": 1475653}, {"filename": "/hud_common.pb", "start": 1475653, "end": 1483872}, {"filename": "/hud_common_640_960.raw", "start": 1483872, "end": 1487752}, {"filename": "/hud_star.pb", "start": 1487752, "end": 1491349}, {"filename": "/icon_640_960.png", "start": 1491349, "end": 1496166}, {"filename": "/language_640_960.raw", "start": 1496166, "end": 1502491}, {"filename": "/loaderbar_empty_640_960.png", "start": 1502491, "end": 1504067}, {"filename": "/loaderbar_full_640_960.png", "start": 1504067, "end": 1507527}, {"filename": "/loading.pb", "start": 1507527, "end": 1538270}, {"filename": "/loading_640_960.raw", "start": 1538270, "end": 1547915}, {"filename": "/loading_bgr_640_960.raw", "start": 1547915, "end": 1553176}, {"filename": "/map_01.pb", "start": 1553176, "end": 1605894}, {"filename": "/map_02.pb", "start": 1605894, "end": 1639222}, {"filename": "/map_03.pb", "start": 1639222, "end": 1675649}, {"filename": "/map_04.pb", "start": 1675649, "end": 1721770}, {"filename": "/map_05.pb", "start": 1721770, "end": 1765563}, {"filename": "/map_06.pb", "start": 1765563, "end": 1799804}, {"filename": "/map_640_960.raw", "start": 1799804, "end": 1867290}, {"filename": "/map_bowl.pb", "start": 1867290, "end": 1966782}, {"filename": "/map_bowl_beeline.pb", "start": 1966782, "end": 2066709}, {"filename": "/map_bowl_panda.pb", "start": 2066709, "end": 2166374}, {"filename": "/map_bowl_touch.pb", "start": 2166374, "end": 2268097}, {"filename": "/map_bowl_zain.pb", "start": 2268097, "end": 2369819}, {"filename": "/map_bowl_zain_iraq.pb", "start": 2369819, "end": 2472646}, {"filename": "/map_cartoons.pb", "start": 2472646, "end": 2483085}, {"filename": "/map_corner.pb", "start": 2483085, "end": 2512310}, {"filename": "/map_decor_01_640_960.raw", "start": 2512310, "end": 2524267}, {"filename": "/map_decor_02_640_960.raw", "start": 2524267, "end": 2533362}, {"filename": "/map_decor_03_640_960.raw", "start": 2533362, "end": 2570024}, {"filename": "/map_decor_04_640_960.raw", "start": 2570024, "end": 2579442}, {"filename": "/map_decor_05_640_960.raw", "start": 2579442, "end": 2592103}, {"filename": "/map_decor_06_640_960.raw", "start": 2592103, "end": 2602495}, {"filename": "/map_fx.pb", "start": 2602495, "end": 2604330}, {"filename": "/map_level.pb", "start": 2604330, "end": 2724231}, {"filename": "/map_level_boss_fx.pb", "start": 2724231, "end": 2763417}, {"filename": "/map_level_highlight.pb", "start": 2763417, "end": 2764200}, {"filename": "/map_moregames.pb", "start": 2764200, "end": 2769371}, {"filename": "/map_omnom.pb", "start": 2769371, "end": 2888200}, {"filename": "/map_promo.pb", "start": 2888200, "end": 2906103}, {"filename": "/map_side_640_960.webp", "start": 2906103, "end": 2930604}, {"filename": "/map_side_beeline_640_960.webp", "start": 2930604, "end": 2940800}, {"filename": "/map_side_panda_640_960.webp", "start": 2940800, "end": 2957036}, {"filename": "/map_side_touch_640_960.webp", "start": 2957036, "end": 2962252}, {"filename": "/map_side_zain_640_960.webp", "start": 2962252, "end": 2969526}, {"filename": "/map_side_zain_iraq_640_960.webp", "start": 2969526, "end": 2978173}, {"filename": "/map_tab.pb", "start": 2978173, "end": 3004603}, {"filename": "/maps/!_MapSelectController.xml", "start": 3004603, "end": 3024437}, {"filename": "/maps/!_MasterGameDesignDocument.xml", "start": 3024437, "end": 3045210}, {"filename": "/maps/Tuts/CircleSquare.xml", "start": 3045210, "end": 3047583}, {"filename": "/maps/Tuts/Flow_01.xml", "start": 3047583, "end": 3049561}, {"filename": "/maps/Tuts/Ghost_03c.xml", "start": 3049561, "end": 3052150}, {"filename": "/maps/Tuts/WalkingCandy2.xml", "start": 3052150, "end": 3053765}, {"filename": "/maps/Tuts/tri_rotate.xml", "start": 3053765, "end": 3056080}, {"filename": "/maps/allmaps.xml", "start": 3056080, "end": 3056711}, {"filename": "/maps/bosses/2p08newold.xml", "start": 3056711, "end": 3059598}, {"filename": "/maps/bosses/2p10ss.xml", "start": 3059598, "end": 3064061}, {"filename": "/maps/bosses/2p18a.xml", "start": 3064061, "end": 3069071}, {"filename": "/maps/bosses/2p19aa.xml", "start": 3069071, "end": 3072167}, {"filename": "/maps/bosses/4p01abc.xml", "start": 3072167, "end": 3078709}, {"filename": "/maps/bosses/4p08az.xml", "start": 3078709, "end": 3082314}, {"filename": "/maps/bosses/6p04tt.xml", "start": 3082314, "end": 3085907}, {"filename": "/maps/bosses/6p05q.xml", "start": 3085907, "end": 3089533}, {"filename": "/maps/bosses/timed3_02f.xml", "start": 3089533, "end": 3091859}, {"filename": "/maps/bosses/timed3_05d.xml", "start": 3091859, "end": 3094251}, {"filename": "/maps/bosses/timed_12b.xml", "start": 3094251, "end": 3097004}, {"filename": "/maps/pack1a/a_015b.xml", "start": 3097004, "end": 3099387}, {"filename": "/maps/pack1a/a_017easy.xml", "start": 3099387, "end": 3101753}, {"filename": "/maps/pack1a/a_25b.xml", "start": 3101753, "end": 3103617}, {"filename": "/maps/pack1a/a_28b.xml", "start": 3103617, "end": 3106301}, {"filename": "/maps/pack1a/a_29.xml", "start": 3106301, "end": 3108202}, {"filename": "/maps/pack1a/a_30.xml", "start": 3108202, "end": 3109879}, {"filename": "/maps/pack1a/a_31.xml", "start": 3109879, "end": 3113694}, {"filename": "/maps/pack1a/a_34.xml", "start": 3113694, "end": 3117517}, {"filename": "/maps/pack1a/a_36.xml", "start": 3117517, "end": 3119295}, {"filename": "/maps/pack1a/a_43d.xml", "start": 3119295, "end": 3121401}, {"filename": "/maps/pack1a/a_44c.xml", "start": 3121401, "end": 3123248}, {"filename": "/maps/pack1a/a_46b.xml", "start": 3123248, "end": 3125294}, {"filename": "/maps/pack1a/a_48easy.xml", "start": 3125294, "end": 3127855}, {"filename": "/maps/pack2/16abcd.xml", "start": 3127855, "end": 3129808}, {"filename": "/maps/pack2/K100.xml", "start": 3129808, "end": 3132781}, {"filename": "/maps/pack2/K102.xml", "start": 3132781, "end": 3134602}, {"filename": "/maps/pack2/K103.xml", "start": 3134602, "end": 3137048}, {"filename": "/maps/pack2/K12neww.xml", "start": 3137048, "end": 3141035}, {"filename": "/maps/pack2/K14.xml", "start": 3141035, "end": 3144075}, {"filename": "/maps/pack2/K17d.xml", "start": 3144075, "end": 3146878}, {"filename": "/maps/pack2/K21aa.xml", "start": 3146878, "end": 3149906}, {"filename": "/maps/pack2/K23.xml", "start": 3149906, "end": 3153317}, {"filename": "/maps/pack2/K30ff.xml", "start": 3153317, "end": 3155189}, {"filename": "/maps/pack2/K32s.xml", "start": 3155189, "end": 3158726}, {"filename": "/maps/pack2/K37z.xml", "start": 3158726, "end": 3161449}, {"filename": "/maps/pack2/K3y.xml", "start": 3161449, "end": 3163959}, {"filename": "/maps/pack2/K4aa.xml", "start": 3163959, "end": 3166355}, {"filename": "/maps/pack2/K8aa.xml", "start": 3166355, "end": 3169867}, {"filename": "/maps/pack3a/a3_09b.xml", "start": 3169867, "end": 3172431}, {"filename": "/maps/pack3a/a3_13c.xml", "start": 3172431, "end": 3174645}, {"filename": "/maps/pack3a/a3_17.xml", "start": 3174645, "end": 3176117}, {"filename": "/maps/pack3a/a3_19.xml", "start": 3176117, "end": 3178239}, {"filename": "/maps/pack3a/a3_21b.xml", "start": 3178239, "end": 3180999}, {"filename": "/maps/pack3a/a3_23.xml", "start": 3180999, "end": 3183834}, {"filename": "/maps/pack3a/a3_24b.xml", "start": 3183834, "end": 3187044}, {"filename": "/maps/pack3a/a3_27b.xml", "start": 3187044, "end": 3190638}, {"filename": "/maps/pack3a/a3_27n.xml", "start": 3190638, "end": 3193659}, {"filename": "/maps/pack3a/a3_28c.xml", "start": 3193659, "end": 3197165}, {"filename": "/maps/pack3a/a3_31c.xml", "start": 3197165, "end": 3200290}, {"filename": "/maps/pack3a/a3_33.xml", "start": 3200290, "end": 3202278}, {"filename": "/maps/pack3a/a3_34d.xml", "start": 3202278, "end": 3204586}, {"filename": "/maps/pack3a/a3_36.xml", "start": 3204586, "end": 3207336}, {"filename": "/maps/pack3a/a3_37.xml", "start": 3207336, "end": 3209592}, {"filename": "/maps/pack3a/a3_38c.xml", "start": 3209592, "end": 3211118}, {"filename": "/maps/pack3a/a3_41c.xml", "start": 3211118, "end": 3213207}, {"filename": "/maps/pack3a/a3_43.xml", "start": 3213207, "end": 3215168}, {"filename": "/maps/pack3a/a3_44.xml", "start": 3215168, "end": 3217113}, {"filename": "/maps/pack3a/a3_45b.xml", "start": 3217113, "end": 3219979}, {"filename": "/maps/pack4/M11a.xml", "start": 3219979, "end": 3223602}, {"filename": "/maps/pack4/M19.xml", "start": 3223602, "end": 3228148}, {"filename": "/maps/pack4/M2aa.xml", "start": 3228148, "end": 3231378}, {"filename": "/maps/pack4/M32w.xml", "start": 3231378, "end": 3235283}, {"filename": "/maps/pack4/M38.xml", "start": 3235283, "end": 3238133}, {"filename": "/maps/pack4/M46rr.xml", "start": 3238133, "end": 3242272}, {"filename": "/maps/pack4/M49.xml", "start": 3242272, "end": 3245945}, {"filename": "/maps/pack4/M50aa.xml", "start": 3245945, "end": 3249390}, {"filename": "/maps/pack4/M51aa.xml", "start": 3249390, "end": 3252740}, {"filename": "/maps/pack4/M53mir.xml", "start": 3252740, "end": 3254503}, {"filename": "/maps/pack4/M7.xml", "start": 3254503, "end": 3257859}, {"filename": "/maps/pack4/M9i.xml", "start": 3257859, "end": 3261049}, {"filename": "/maps/pack4a/a4_02c.xml", "start": 3261049, "end": 3262808}, {"filename": "/maps/pack4a/a4_03d.xml", "start": 3262808, "end": 3265237}, {"filename": "/maps/pack4a/a4_04d.xml", "start": 3265237, "end": 3268070}, {"filename": "/maps/pack4a/a4_05e.xml", "start": 3268070, "end": 3270581}, {"filename": "/maps/pack4a/a4_06k.xml", "start": 3270581, "end": 3272982}, {"filename": "/maps/pack4a/a4_07.xml", "start": 3272982, "end": 3276172}, {"filename": "/maps/pack4a/a4_08b.xml", "start": 3276172, "end": 3278223}, {"filename": "/maps/pack5/L02.xml", "start": 3278223, "end": 3281451}, {"filename": "/maps/pack5/L04.xml", "start": 3281451, "end": 3285570}, {"filename": "/maps/pack5/L05.xml", "start": 3285570, "end": 3287975}, {"filename": "/maps/pack5/L06.xml", "start": 3287975, "end": 3291865}, {"filename": "/maps/pack5/L08aa.xml", "start": 3291865, "end": 3294893}, {"filename": "/maps/pack5/L17aaa.xml", "start": 3294893, "end": 3298097}, {"filename": "/maps/pack5/L18.xml", "start": 3298097, "end": 3300927}, {"filename": "/maps/pack5/L20s.xml", "start": 3300927, "end": 3304556}, {"filename": "/maps/pack5a/a5_01b.xml", "start": 3304556, "end": 3307748}, {"filename": "/maps/pack5a/a5_02.xml", "start": 3307748, "end": 3310014}, {"filename": "/maps/pack5a/a5_05c.xml", "start": 3310014, "end": 3313535}, {"filename": "/maps/pack5a/a5_06.xml", "start": 3313535, "end": 3316194}, {"filename": "/maps/pack5a/a5_09c.xml", "start": 3316194, "end": 3319047}, {"filename": "/maps/pack5a/a5_12e.xml", "start": 3319047, "end": 3321948}, {"filename": "/maps/pack5a/a5_13.xml", "start": 3321948, "end": 3323750}, {"filename": "/maps/pack5a/a5_14.xml", "start": 3323750, "end": 3326419}, {"filename": "/maps/pack5a/a5_15b.xml", "start": 3326419, "end": 3329161}, {"filename": "/maps/pack5a/a5_17d.xml", "start": 3329161, "end": 3331811}, {"filename": "/maps/pack6/P03.xml", "start": 3331811, "end": 3335396}, {"filename": "/maps/pack6/P05.xml", "start": 3335396, "end": 3339378}, {"filename": "/maps/pack6/P06.xml", "start": 3339378, "end": 3342969}, {"filename": "/maps/pack6/P07.xml", "start": 3342969, "end": 3345724}, {"filename": "/maps/pack6/P10.xml", "start": 3345724, "end": 3348764}, {"filename": "/maps/pack6/P11a.xml", "start": 3348764, "end": 3352309}, {"filename": "/maps/pack6/P13.xml", "start": 3352309, "end": 3354404}, {"filename": "/maps/pack6/P14.xml", "start": 3354404, "end": 3356277}, {"filename": "/maps/pack6/P15.xml", "start": 3356277, "end": 3359946}, {"filename": "/maps/pack6/P17b.xml", "start": 3359946, "end": 3362280}, {"filename": "/maps/pack6/P18.xml", "start": 3362280, "end": 3366363}, {"filename": "/maps/pack6/P24a.xml", "start": 3366363, "end": 3369419}, {"filename": "/maps/pack6/P26a.xml", "start": 3369419, "end": 3372721}, {"filename": "/maps/pack6a/a6_01.xml", "start": 3372721, "end": 3374639}, {"filename": "/maps/pack6a/a6_02dd.xml", "start": 3374639, "end": 3376782}, {"filename": "/maps/pack6a/a6_03b.xml", "start": 3376782, "end": 3379001}, {"filename": "/maps/pack6a/a6_05b.xml", "start": 3379001, "end": 3381964}, {"filename": "/maps/pack6a/a6_07c.xml", "start": 3381964, "end": 3387493}, {"filename": "/maps/pack6a/a6_11.xml", "start": 3387493, "end": 3389876}, {"filename": "/maps/sortedlist.xml", "start": 3389876, "end": 3393999}, {"filename": "/menu_native_ad_640_960.raw", "start": 3393999, "end": 3400501}, {"filename": "/menu_popup_achiev_640_960.raw", "start": 3400501, "end": 3401656}, {"filename": "/menu_popup_achiev_icons_640_960.raw", "start": 3401656, "end": 3402164}, {"filename": "/menu_promo_banner_640_960.jpeg", "start": 3402164, "end": 3402808}, {"filename": "/mission_pause.pb", "start": 3402808, "end": 3404799}, {"filename": "/mission_pause_640_960.raw", "start": 3404799, "end": 3406123}, {"filename": "/numbers_640_960.png", "start": 3406123, "end": 3407140}, {"filename": "/numbers_f2p.pb", "start": 3407140, "end": 3408945}, {"filename": "/obj_candy.pb", "start": 3408945, "end": 3412877}, {"filename": "/obj_hook_640_960.raw", "start": 3412877, "end": 3416506}, {"filename": "/obj_pump.pb", "start": 3416506, "end": 3422373}, {"filename": "/obj_rope.pb", "start": 3422373, "end": 3423103}, {"filename": "/obj_rope_640_960.raw", "start": 3423103, "end": 3423516}, {"filename": "/obj_star_640_960.raw", "start": 3423516, "end": 3426477}, {"filename": "/off_advertising_640_960.raw", "start": 3426477, "end": 3433008}, {"filename": "/omnom.pb", "start": 3433008, "end": 4250485}, {"filename": "/omnom_640_960.raw", "start": 4250485, "end": 4391035}, {"filename": "/omnom_bird.pb", "start": 4391035, "end": 4859145}, {"filename": "/omnom_dragon.pb", "start": 4859145, "end": 4932239}, {"filename": "/omnom_fish.pb", "start": 4932239, "end": 5039168}, {"filename": "/omnom_ghost.pb", "start": 5039168, "end": 5123787}, {"filename": "/omnom_glow.pb", "start": 5123787, "end": 5125509}, {"filename": "/omnom_mouse.pb", "start": 5125509, "end": 5484636}, {"filename": "/omnom_particles.pb", "start": 5484636, "end": 5485250}, {"filename": "/omnom_particles_640_960.raw", "start": 5485250, "end": 5485629}, {"filename": "/omnom_result.pb", "start": 5485629, "end": 5681161}, {"filename": "/omnom_small.pb", "start": 5681161, "end": 5892939}, {"filename": "/omnom_ui_640_960.raw", "start": 5892939, "end": 5904941}, {"filename": "/panda_banner.pb", "start": 5904941, "end": 5911753}, {"filename": "/panda_banner_640_960.webp", "start": 5911753, "end": 5922153}, {"filename": "/pop_up_new_640_960.raw", "start": 5922153, "end": 5932023}, {"filename": "/popup.pb", "start": 5932023, "end": 5933942}, {"filename": "/popup_640_960.raw", "start": 5933942, "end": 5946734}, {"filename": "/popup_ctr3_640_960.raw", "start": 5946734, "end": 5947681}, {"filename": "/popup_facebook_picture_640_960.raw", "start": 5947681, "end": 5950512}, {"filename": "/popup_more_apps_640_960.raw", "start": 5950512, "end": 5951954}, {"filename": "/processing.pb", "start": 5951954, "end": 5959244}, {"filename": "/processing_assets_640_960.raw", "start": 5959244, "end": 5962140}, {"filename": "/progress_640_960.raw", "start": 5962140, "end": 5962208}, {"filename": "/promo.pb", "start": 5962208, "end": 5966483}, {"filename": "/promo_640_960.raw", "start": 5966483, "end": 5971100}, {"filename": "/promobanner_640_960.jpeg", "start": 5971100, "end": 5971726}, {"filename": "/reset_640_960.raw", "start": 5971726, "end": 5971794}, {"filename": "/result_2.pb", "start": 5971794, "end": 6054751}, {"filename": "/result_2_640_960.raw", "start": 6054751, "end": 6131644}, {"filename": "/result_bgr.pb", "start": 6131644, "end": 6203164}, {"filename": "/segoeprb.ttf", "start": 6203164, "end": 6375256}, {"filename": "/settings_640_960.raw", "start": 6375256, "end": 6375324}, {"filename": "/shop.pb", "start": 6375324, "end": 6489917}, {"filename": "/shop_640_960.raw", "start": 6489917, "end": 6521192}, {"filename": "/shop_bonus_beeline_640_960.webp", "start": 6521192, "end": 6528236}, {"filename": "/shop_bonus_panda_640_960.webp", "start": 6528236, "end": 6535786}, {"filename": "/shop_bonus_touch_640_960.webp", "start": 6535786, "end": 6541384}, {"filename": "/shop_bonus_zain_640_960.webp", "start": 6541384, "end": 6547409}, {"filename": "/shop_bonus_zain_iraq_640_960.webp", "start": 6547409, "end": 6553054}, {"filename": "/sponsorship_640_960.raw", "start": 6553054, "end": 6561901}, {"filename": "/sponsorship_map_obj_1.pb", "start": 6561901, "end": 6573632}, {"filename": "/sponsorship_map_obj_1_640_960.webp", "start": 6573632, "end": 6577687}, {"filename": "/sponsorship_map_obj_2_640_960.webp", "start": 6577687, "end": 6582691}, {"filename": "/sponsorship_map_obj_3.pb", "start": 6582691, "end": 6594422}, {"filename": "/sponsorship_map_obj_3_640_960.webp", "start": 6594422, "end": 6598474}, {"filename": "/sponsorship_map_obj_4.pb", "start": 6598474, "end": 6610205}, {"filename": "/sponsorship_map_obj_4_640_960.webp", "start": 6610205, "end": 6614092}, {"filename": "/sponsorship_map_obj_5.pb", "start": 6614092, "end": 6625853}, {"filename": "/sponsorship_map_obj_5_640_960.webp", "start": 6625853, "end": 6629908}, {"filename": "/star.pb", "start": 6629908, "end": 6658581}, {"filename": "/star_640_960.raw", "start": 6658581, "end": 6666259}, {"filename": "/strings.xml", "start": 6666259, "end": 7299782}, {"filename": "/teleport.pb", "start": 7299782, "end": 7313244}, {"filename": "/teleport_640_960.raw", "start": 7313244, "end": 7318485}, {"filename": "/texture_01_640_960.raw", "start": 7318485, "end": 7325343}, {"filename": "/texture_02_640_960.raw", "start": 7325343, "end": 7329792}, {"filename": "/texture_dive_640_960.raw", "start": 7329792, "end": 7336400}, {"filename": "/texture_ghost_640_960.raw", "start": 7336400, "end": 7345504}, {"filename": "/texture_ice_640_960.raw", "start": 7345504, "end": 7348528}, {"filename": "/texture_power_640_960.raw", "start": 7348528, "end": 7354631}, {"filename": "/texture_walk_640_960.raw", "start": 7354631, "end": 7360326}, {"filename": "/thanks.pb", "start": 7360326, "end": 7396699}, {"filename": "/thanks_640_960.raw", "start": 7396699, "end": 7399319}, {"filename": "/trajectory_point_640_960.raw", "start": 7399319, "end": 7399742}, {"filename": "/transition.pb", "start": 7399742, "end": 7406729}, {"filename": "/transition_640_960.raw", "start": 7406729, "end": 7415258}, {"filename": "/triger.pb", "start": 7415258, "end": 7424118}, {"filename": "/triger_640_960.raw", "start": 7424118, "end": 7426310}, {"filename": "/tutor.pb", "start": 7426310, "end": 7460554}, {"filename": "/tutor_640_960.raw", "start": 7460554, "end": 7462541}, {"filename": "/water_640_960.raw", "start": 7462541, "end": 7466545}, {"filename": "/wood_plank_640_960.raw", "start": 7466545, "end": 7474655}, {"filename": "/zepto_logo_640_960.raw", "start": 7474655, "end": 7489697}, {"filename": "/zepto_splash.pb", "start": 7489697, "end": 7512158}], "remote_package_size": 7512158});

  })();
