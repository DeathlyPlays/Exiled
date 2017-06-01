/*
Emoticon plugin
This plugin allows you to use emoticons in both chat rooms (as long as they are enabled in the room) and private messages.
*/
'use strict';

const fs = require('fs');
let emoticons = {
	'feelscri': 'http://i.imgur.com/QAuUW7u.jpg',
	'#murica': 'http://i.imgur.com/d4XueEr.jpg',
	'#applejuice': 'http://i.imgur.com/s3TJfOB.jpg',
	'urmom': 'https://static-cdn.jtvnw.net/emoticons/v1/35218/1.0',
	'facepalm': 'http://i.imgur.com/lv3GmpM.png',
	'feelscool': 'http://i.imgur.com/qdGngVl.jpg',
	'FacePalm': 'http://i.imgur.com/ylrqFwJ.png',
	'feelsemo': 'http://i.imgur.com/FPolh5d.jpg',
	'feelsfdra': 'http://i.imgur.com/ZIcl9Zy.jpg',
	'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
	'feelsbm': 'http://i.imgur.com/xwfJb2z.png',
	'feelswtf': 'http://i.imgur.com/BzZJedC.jpg',
	'feelsgro': 'http://i.imgur.com/jLhP0bZ.png',
	'feelsky': 'http://i.imgur.com/BtATPId.png',
	'udonsay': 'http://r32.imgfast.net/users/3215/23/26/64/smiles/280467785.jpg',
	'feelslot': 'http://i.imgur.com/tl88F7i.png',
	'feelsarbk': 'http://i.imgur.com/HqyjN7G.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'feelsdd': 'http://i.imgur.com/fXtdLtV.png',
	'feelsdoge': 'http://i.imgur.com/GklYWvi.png',
	'feelsgd': 'http://i.imgur.com/Jf0n4BL.png',
	'feelsgn': 'http://i.imgur.com/juJQh0J.png',
	'feelsjig': 'http://i.imgur.com/hSzqy5z.png',
	'feelsshrk': 'http://i.imgur.com/amTG3jF.jpg',
	'kappa': 'http://i.imgur.com/ZxRU4z3.png',
	'feelsHigh': 'http://i.imgur.com/s9I2bxp.jpg',
	'meGusta': 'http://cdn.overclock.net/3/36/50x50px-ZC-369517fd_me-gusta-me-gusta-s.png',
	'feelshp': 'http://i.imgur.com/1W19BDG.png',
	'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
	'feelsnv': 'http://i.imgur.com/XF6kIdJ.png',
	'feelsok': 'http://i.imgur.com/gu3Osve.png',
	'feelspika': 'http://i.imgur.com/mBq3BAW.png',
	'feelspink': 'http://i.imgur.com/jqfB8Di.png',
	'feelspn': 'http://i.imgur.com/wSSM6Zk.png',
	'feelspr': 'http://i.imgur.com/3VtkKfJ.png',
	'feelsrg': 'http://i.imgur.com/DsRQCsI.png',
	'feelsrs': 'http://i.imgur.com/qGEot0R.png',
	'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
	'feelscrazy': 'http://i.imgur.com/NiJsT5W.png',
	'fukya': 'http://i.imgur.com/ampqCZi.gif',
	'fukno': 'http://i.imgur.com/QjQTx9W.png',
	'funnylol': 'http://i.imgur.com/SlzCghq.png',
	'hmmface': 'http://i.imgur.com/Z5lOwfZ.png',
	'noface': 'http://i.imgur.com/H744eRE.png',
	'durp': 'http://i.imgur.com/2BloGXG.jpg',
	'Obama': 'http://i.imgur.com/rBA9M7A.png',
	'oshet': 'http://i.imgur.com/yr5DjuZ.png',
	'Sanic': 'http://i.imgur.com/Y6etmna.png',
	'wtfman': 'http://i.imgur.com/kwR8Re9.png',
	'waitwat': 'http://i.imgur.com/FpxTQxU.jpg',
	'xaa': 'http://i.imgur.com/V728AvL.png',
	'yayface': 'http://i.imgur.com/anY1jf8.png',
	'trollface': 'http://cdn.overclock.net/a/a0/50x50px-ZC-a0e3f9a7_troll-troll-face.png',
	'feelswin': 'http://i.imgur.com/rbs9pZG.png',
	'hypnotoad': 'http://i.imgur.com/lJtbSfl.gif',
	'Kreygasm': 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
	'feelsilum': 'http://i.imgur.com/CnyGTTD.png',
	'PeoplesChamp': 'http://i.imgur.com/QMiMBKe.png',
	'nicememe': 'http://i.imgur.com/61SelMS.png',
	'spongegar': 'http://i.imgur.com/L0mK1f5.jpg',
	'TrashCan': 'http://i.imgur.com/rghiV9b.png',
	'feelsrb': 'http://i.imgur.com/L6ak1Uk.png',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/2.0',
	'4Head': 'https://static-cdn.jtvnw.net/emoticons/v1/354/1.0',
	'DansGame': 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
	'feelspix': 'https://38.media.tumblr.com/260fdf377f5ac9e90b8ee9e609df5e69/tumblr_n3wgykjcVB1s5h198o1_500.gif',
	'feelstea': 'http://i.imgur.com/M0f2zgJ.jpg',
	'gudone': 'http://i.imgur.com/USkp1b9.png',
	'brkgod': 'http://i.imgur.com/SQgq5wU.png',
	'UTgod': 'http://i.imgur.com/DdShUbi.png',
	'afruca': 'http://i.imgur.com/jojooyw.png',
	'feelsFU': 'http://i.imgur.com/3SBUEuY.jpg',
	'feelscreep': 'http://i.imgur.com/zJp7oJL.gif',
	'feelsWave': 'http://i.imgur.com/VwCJqjD.gif',
	'feelsacid': 'http://i.imgur.com/8JLSPcr.gif',
	'feelssprout': 'http://i.imgur.com/D1p76vd.gif',
	'feelsevil': 'http://i.imgur.com/OPmBOeJ.jpg',
	'feels9000': 'http://i.imgur.com/1J8r5wR.jpg',
	'feelsskel': 'http://i.imgur.com/4oMCCSf.jpg',
	'feelscompton': 'http://i.imgur.com/mhbfJjF.jpg',
	'feelsShkspr': 'http://i.imgur.com/LSPY5ui.png',
	'feelssuggest': 'http://i.imgur.com/MErmMby.jpg',
	'feelsterror': 'http://i.imgur.com/U5v9uOY.jpg',
	'feelsdepressed': 'http://i.imgur.com/tO1qB32.jpg',
	'feelsgiggle': 'http://i.imgur.com/7GEK2iS.jpg',
	'feelsshade': 'http://i.imgur.com/Tuza6Y4.png',
	'feelsorly': 'http://i.imgur.com/iMd6UE8.jpg',
	'feelsmage': 'http://i.imgur.com/bCsvhJO.gif',
	'feelsgyara': 'http://i.imgur.com/qHR0leo.png',
	'Thumbsup': 'http://i.imgur.com/kCqFQtU.jpg',
	'feelshill': 'http://i.imgur.com/cE94TBS.jpg',
	'kittymadness': 'http://i.imgur.com/9Zjff5d.gif',
	'feelstoast': 'http://i.imgur.com/M3Xj8RB.png',
	'passbleach': 'http://i.imgur.com/jf2ZNoZ.jpg',
	'feelshitler': 'http://i.imgur.com/OAB7tBi.jpg',
	'feels10yrold': 'http://i.imgur.com/su7hKmw.gif',
	'feelsbug': 'http://i.imgur.com/XSHQvAr.png',
	'feelsbomber': 'http://i.imgur.com/mFHjb4B.jpg',
	'feelsfreezer': 'http://i.imgur.com/EnmDAxX.png',
	'feelssuper': 'http://i.imgur.com/aheEov7.jpg',
	'feelsck': 'http://i.imgur.com/IUB7N1D.png',
	'Pnoivern': 'http://i.imgur.com/M2sHXyB.png',
	'Ppyroar': 'http://i.imgur.com/kz35y1U.png',
	'feelschime': 'http://i.imgur.com/uIIBChH.png',
	'feelsreally': 'https://cdn.betterttv.net/emote/55b0fa13f54d6ecb7927ec54/2x',
	'feelssans': 'http://i.imgur.com/DPr9ifK.gif',
	'feelstired': 'http://i.imgur.com/EgYViOs.jpg',
	'lenny': 'http://i.imgur.com/FhOwY2P.png',
	'feelsgoomy': 'https://orig03.deviantart.net/fcd4/f/2013/339/2/b/free_squishy_goomy_icon_by_glitchedvirus-d6wway3.gif',
	'feelsvulpix': 'https://a.deviantart.net/avatars/d/a/daneisthebest.gif',
	'datboi': 'http://i.imgur.com/9s6gd3U.gif',
	'feelssota': 'https://puu.sh/rrfeJ/ae2712ab63.gif',
	'tinitini': 'http://i.imgur.com/kfzNCWe.gif',
	'sotalove': 'http://i.imgur.com/hbNn3le.gif',
	'feelstini': 'http://pa1.narvii.com/5767/7d80ccca95ec841d7a21b7b19fdd6ce9262fc6e3_hq.gif',
	'feelslatias': 'http://i.imgur.com/OPZuG3f.gif',
	'feelslatios': 'http://i.imgur.com/QCoBmpe.gif',
	'feelsincog': 'http://i.imgur.com/o4KxmWe.png',
	'feelsScizor': 'http://i.imgur.com/sDWpTYN.gif',
	'feelsamp': 'http://orig06.deviantart.net/d756/f/2015/255/f/3/pokemon_ampharos_lick_icon___free_to_use_by_icelemontea83-d97jr15.gif',
	'feelseevee': 'http://a.deviantart.net/avatars/f/r/frostrus.gif',
	'feelstorchic': 'http://orig11.deviantart.net/477e/f/2010/113/f/7/torchic_free_lick_avatar_by_yakalentos.gif',
	'feelsshaymin': 'http://i.imgur.com/Aw8KAmi.gif',
	'feelsespeon': 'http://i.imgur.com/R6uJPav.gif',
	'feelspichu': 'http://i.imgur.com/vqEpogr.gif',
	'feelscx': 'http://i.imgur.com/zRSUw2n.gif',
	'feelsfox': 'http://orig10.deviantart.net/4383/f/2012/172/f/1/victini_lick_avatar_by_neogalactic54-d54daqi.gif',
	'feelskairak': 'http://orig12.deviantart.net/e443/f/2010/297/e/8/nidorina_lick_icon_by_aquamightyena-d31f7ry.gif',
	'feelslucario': 'http://i.imgur.com/ZQbYp9l.gif',
	'feelsfloat': 'http://i.imgur.com/XKP1Kpf.gif',
	'feelslux': 'http://i.imgur.com/hDKCZMt.gif',
	'feelsnii': 'http://orig11.deviantart.net/9d39/f/2011/165/8/6/request_from_colleenkat_by_kisa013-d3iwvbv.gif',
	'feelsvpn': 'http://i.imgur.com/ODTZISl.gif',
	'feelsChar': 'https://orig04.deviantart.net/9abc/f/2013/118/8/e/charizard_lick_icon_by_spritegirl999-d63d7sf.gif',
	'feelsem': 'http://orig01.deviantart.net/3f09/f/2010/128/0/a/pika_lick_icon_by_brawler_pika.gif',
	'feelsnyan': 'http://i.imgur.com/sUZkR32.gif',
	'feelstyph': 'http://orig13.deviantart.net/50f8/f/2010/193/1/2/typhlosion_lick_icon_by_aquamightyena.gif',
	'feelssneasel': 'http://orig02.deviantart.net/3443/f/2010/182/0/a/shiny_sneasel_avatar_by_oh_2beatoa.gif',
	'feelsabsol': 'http://orig10.deviantart.net/ab3e/f/2011/160/7/5/absol_lick_by_missdrawsalot-d3ii5pq.gif',
	'feelsflare': 'http://orig05.deviantart.net/1afa/f/2011/177/9/4/flareon_lick_by_9000boy-d3k3g36.gif',
	'feelsarcanine': 'http://orig12.deviantart.net/afca/f/2010/154/7/5/free_arcanine_lick_icon_by_fennekvee.gif',
	'feelsgatr': 'http://orig15.deviantart.net/4032/f/2010/229/0/b/_rq__feraligatr_lick_icon_by_fennekvee.gif',
	'feelsmeowth': 'http://i.imgur.com/VIDPyCS.gif',
	'feelszapdos': 'http://a.deviantart.net/avatars/z/a/zapdosrockz.gif',
	'feelszangoose': 'http://orig03.deviantart.net/f2d7/f/2010/148/a/8/zangoose_free_lick_avatar_by_yakalentos.gif',
	'feelsstar': 'http://orig10.deviantart.net/3489/f/2011/040/5/2/emolga_free_lick_avatar_by_yakalentos-d395uzl.gif',
	'feelsshinx': 'http://orig02.deviantart.net/2897/f/2010/232/e/0/shinx_free_lick_avatar_by_yakalentos.gif',
	'feelsleafeon': 'http://orig11.deviantart.net/6f76/f/2012/022/6/a/pkmn_leafeon_lickie_by_pplyra-d4nb1x5.gif',
	'feelsbulba': 'http://orig00.deviantart.net/b4fe/f/2010/204/1/3/bulbasaur_free_lick_avatar_by_yakalentos.gif',
	'feelssuicune': 'http://orig15.deviantart.net/e4ad/f/2010/139/5/a/suicune_free_lick_avatar_by_yakalentos.gif',
	'feelschikorita': 'http://orig10.deviantart.net/de15/f/2010/193/9/4/chikorita_free_lick_avatar_by_yakalentos.gif',
	'feelspsy': 'http://orig04.deviantart.net/b3f4/f/2010/119/8/8/psyduck_free_lick_avatar_by_yakalentos.gif',
	'feelsentei': 'http://a.deviantart.net/avatars/j/i/jiangweichick100.gif',
	'feelsdialga': 'http://orig10.deviantart.net/7f9c/f/2011/232/9/c/dialgalickicon___request_by_zekrom622-d479wzz.gif',
	'feelsflaaffy': 'http://orig05.deviantart.net/0cc2/f/2010/125/6/8/flaaffy_free_lick_avatar_by_yakalentos.gif',
	'feelsmunch': 'http://orig04.deviantart.net/c0c8/f/2010/114/b/e/munchlax_free_lick_avatar_by_yakalentos.gif',
	'feelsjolt': 'http://orig01.deviantart.net/e655/f/2011/363/1/8/jolteon_licky_by_dragonfeatherz-d4k5gqp.gif',
	'feelsvul': 'http://orig00.deviantart.net/c3e8/f/2010/120/1/1/vulpix_free_lick_avatar_by_yakalentos.gif',
	'feelspachi': 'http://orig12.deviantart.net/aaaa/f/2012/096/8/e/lick_icon_pachirisu_by_camillajo1-d4v6256.gif',
	'feelsflygon': 'http://orig05.deviantart.net/98a3/f/2010/107/6/6/flygon_free_lick_avatar_by_yakalentos.gif',
	'feelsskymin': 'http://orig04.deviantart.net/41ff/f/2010/108/0/2/skymin_free_lick_avatar_by_yakalentos.gif',
	'feelspooch': 'http://orig13.deviantart.net/87d0/f/2012/049/9/2/poochyena_licks_heaps_by_wolf6660-d3i9o60.gif',
	'feelsmewth': 'http://orig10.deviantart.net/79e7/f/2010/097/b/9/glameow_licking_avatar_by_byakughan.gif',
	'feelsarceus': 'http://static.planetminecraft.com/files/avatar/112222_0.gif',
	'feelsweavile': 'http://orig07.deviantart.net/620a/f/2010/220/1/8/_rq__weavile_lick_icon_by_fennekvee.gif',
	'feelshound': 'http://orig05.deviantart.net/7b61/f/2010/314/c/b/houndour_by_mushydog-d32lmif.gif',
	'feelslpd': 'http://orig06.deviantart.net/b1da/f/2011/145/0/f/liepard_lick_icon_by_mushydog-d3h8rk7.gif',
	'feelssnivy': 'http://orig10.deviantart.net/2cae/f/2011/251/6/6/snivy_lick_by_mushydog-d499t8d.gif',
	'feelshydra': 'http://orig10.deviantart.net/0124/f/2012/340/0/b/hydreigon_lick_icon_by_d12345t-d5n62ok.gif',
	'feelsdrud': 'http://orig02.deviantart.net/a139/f/2012/223/6/d/druddigon_lick_icon_by_d12345t-d5aracp.gif',
	'feelsmudkip': 'http://orig08.deviantart.net/76df/f/2010/223/a/7/mudkip_lick_by_scenekiddowntheroad.gif',
	'feelsskitty': 'http://a.deviantart.net/avatars/s/i/silver-skitty.gif',
	'feelstank': 'http://orig00.deviantart.net/56b2/f/2010/353/0/0/miltank_licking_avatar_by_seigyuu-d356hud.gif',
	'feelsjoshy': 'http://orig00.deviantart.net/b970/f/2010/134/1/2/mew_lick_avatar_by_mythicazurel.gif',
	'feelsturtwig': 'http://orig03.deviantart.net/93cc/f/2010/120/f/5/turtwig_free_lick_avatar_by_yakalentos.gif',
	'feelszorua': 'http://a.deviantart.net/avatars/z/o/zorua-zuilam.gif',
	'feelscinno': 'http://orig15.deviantart.net/4340/f/2010/182/7/1/chi_lick_by_joalsses.gif',
	'feelsdoom': 'http://orig03.deviantart.net/5e28/f/2010/178/3/5/request_hound_lick_by_joalsses.gif',
	'feelskiss': 'http://orig12.deviantart.net/baa4/f/2010/178/1/4/kissu_lick_by_joalsses.gif',
	'feelsgallade': 'http://orig14.deviantart.net/12a1/f/2010/214/6/7/galla_lick_by_joalsses.gif',
	'rarechar': 'https://cdn.betterttv.net/emote/562b9101a6646e202bcc5447/2x',
	'Cate': 'http://i.imgur.com/728AQQN.jpg',
	'feelsyawn': 'http://orig00.deviantart.net/e710/f/2015/169/4/3/cat_yawn_by_iamverylucky-d8xsx9q.gif',
	'happyface': 'http://imgur.com/krzCL3j.jpg',
	'wynaut': 'http://i.imgur.com/3QriNT2.png',
	'KappaPride': 'http://i.imgur.com/GMs8OxU.jpg',
	'llamahide': 'http://i.imgur.com/Z9GYSkZ.gif',
	'feelstales': 'http://a.deviantart.net/avatars/l/u/lumeraz.gif',
	'prfmcri': 'http://media.tumblr.com/tumblr_lidby6NOqp1qb8q4h.gif',
	'prfmyay': 'http://media.tumblr.com/tumblr_lkg1p32vyJ1qb8q4h.gif',
	'prfmwhimper': 'https://lh3.googleusercontent.com/-I7vmpiJ78KM/VlhCux0KYcI/AAAAAAAABBk/W40qzCRajro/w426-h353/1424361981391.gif',
	'prfmrub': 'http://24.media.tumblr.com/tumblr_luccidkglR1r3xwq5o1_400.gif',
	'prfmplsno': 'http://media.tumblr.com/tumblr_li4o4l0LHA1qb8q4h.gif',
	'prfmlmao': 'http://media.tumblr.com/tumblr_li80q3RshA1qb8q4h.gif',
	'prfmador': 'http://media.tumblr.com/tumblr_lidc29c6yW1qb8q4h.gif',
	'prfmapplause': 'http://i.imgur.com/zvJlmz2.gif',
	'prfmhai': 'http://i.imgur.com/4up3jVu.gif',
	'feelsweird': 'https://cdn.betterttv.net/emote/5603731ce5fc5eff1de93229/2x',
	'feelssad': 'https://cdn.betterttv.net/emote/5613b7ca141069f91f48acca/2x',
	'feelsspl': 'http://i.imgur.com/RIOKSJ3.gif',
	'feelspop': 'http://orig02.deviantart.net/c569/f/2016/131/8/b/popplio_icon_by_rayfierying-da244yn.gif',
	'feelscop': 'http://i.imgur.com/eNaFHvR.png',
	'jcena': 'http://i.imgur.com/hPz30Ol.jpg',
	'owait': 'https://cdn.betterttv.net/emote/55ab96ce9406e5482db53424/2x',
	'feelslag': 'https://cdn.betterttv.net/emote/56758c29bf317838643c7e97/2x',
	'stonedaf': 'https://cdn.betterttv.net/emote/5638163f55dee26813aebbf1/2x',
	'sanik': 'http://i.imgur.com/Y6etmna.png',
	'uliek': 'http://orig15.deviantart.net/f7e5/f/2015/044/6/c/pokemon_gif_mudkip_by_dottypurrs-d8huvrv.gif',
	'feelsarken': 'http://imgur.com/YCCDZWq.png',
	'orats': 'http://orig12.deviantart.net/edbf/f/2014/279/2/5/shiny_female_rattata_sprite_by_pokemon__sprites-d81w4pv.gif',
	'feelstrump': 'http://i.imgur.com/tqW8s6Y.png',
	'feelschara': 'http://i.imgur.com/LH303HL.gif',
	'feelsithi': 'http://i.picresize.com/images/2016/05/31/IXCqY.jpg',
	'joshawott': 'http://orig08.deviantart.net/a30d/f/2015/010/5/8/oshawott_swag_by_whatiget4beinganerd-d82v3br.gif',
	'feelsvivid': 'http://i.imgur.com/n3p5GeQ.gif',
	'feelsSuke': 'http://i.imgur.com/O2FGflw.gif',
	'feelsveno': 'http://i.imgur.com/HdoPK9x.png',
	'feelsllama': 'http://i.imgur.com/oSLSk2I.gif',
	'llamacool': 'http://i.imgur.com/X1x3728.gif',
	'llamanoodle': 'http://i.imgur.com/SUZkz5p.gif',
	'llamarawr': 'http://i.imgur.com/KWAQbPu.gif',
	'llamatea': 'http://i.imgur.com/nJnakEU.gif',
	'llamayawn': 'http://i.imgur.com/SVj8kBt.gif',
	'llamamad': 'http://i.imgur.com/eT7kdww.gif',
	'llamanv': 'http://i.imgur.com/9PgUk4M.gif',
	'llamacute': 'http://i.imgur.com/5hi0kjz.gif',
	'llamacry': 'http://i.imgur.com/ID6i8rl.gif',
	'llamapretty': 'http://i.imgur.com/mBPcOQW.gif',
	'llamabouncy': 'http://i.imgur.com/PiMDmNd.gif',
	'llamahi': 'http://i.imgur.com/2BeipQ8.gif',
	'llamasneaky': 'http://i.imgur.com/8XT3CyT.gif',
	'llamadance': 'http://i.imgur.com/Tl8xmiq.gif',
	'llamawink': 'http://i.imgur.com/Xtjjjlm.gif',
	'llamashades': 'http://i.imgur.com/jBlIicx.gif',
	'llama:3': 'http://i.imgur.com/dkV8FSY.gif',
	'llamashy': 'http://i.imgur.com/Bj7jSrc.gif',
	'llamafun': 'http://i.imgur.com/eJIALUZ.gif',
	'llamawhat': 'http://i.imgur.com/KdH5d2T.gif',
	'hoSway': 'https://cdn.betterttv.net/emote/56396c857e538de14bd747a5/2x',
	'xoxo': 'http://orig00.deviantart.net/b49d/f/2014/220/5/3/ichigo_not_impressed_icon_by_magical_icon-d7u92zg.png',
	'PogChamp': 'http://i.imgur.com/DaamYkA.png',
	'CopyThis': 'http://i.imgur.com/eZyblKn.png',
	'PastaThat': 'http://i.imgur.com/UoDtbqv.png',
	'KappaHD': 'http://i.imgur.com/Ux6uqWf.png',
	'Loominati': 'http://i.imgur.com/Cl2Hybg.png',
	'HeyGuys': 'http://i.imgur.com/I27iAfx.png',
	'dogeception': 'https://i.imgur.com/5VI6Akv.gif',
	'OhMyDog': 'http://i.imgur.com/dDWXmVN.png',
	'PraiseIt': 'http://i.imgur.com/mIgJsgZ.png',
	'riPepperonis': 'http://i.imgur.com/HfepYda.png',
	'FlexL': 'http://i.imgur.com/HOaVb7X.png',
	'FlexR': 'http://i.imgur.com/LMml9AK.png',
	'BearShark': 'http://i.imgur.com/8loNh3c.png',
	'NiceCream': 'http://i.imgur.com/e5j7qaH.png',
	'HellsYeah': 'http://i.imgur.com/BFWTMZe.png',
	'RIGGED': 'http://i.imgur.com/ZZFKaPR.png',
	'KappaDong': 'http://i.imgur.com/utDzMil.png',
	'BadTimeHD': 'http://i.imgur.com/qOucY3g.png',
	'DOITos': 'http://i.imgur.com/FqMjAli.png',
	'fIRe': 'https://www.emojibase.com/resources/img/emojis/apple/x1f525.png.pagespeed.ic.62QVMlIn1k.png',
	'WobzAway': 'http://i.imgur.com/2MynKgN.png',
	'FlexChest': 'http://i.imgur.com/xF5BEwJ.png',
	'iseeit': 'http://a.deviantart.net/avatars/i/s/iseewhatudidtherplz.png?2',
	'SquidKid': 'http://i.imgur.com/kRK3jBr.jpg',
	'Splatim': 'http://i.imgur.com/kSuGaVz.png',
	'panic': 'http://i.imgur.com/SWEVxU8.gif',
	'sp00py': 'http://i.imgur.com/Vhq1G3r.gif',
	'SPLASHING': 'http://i.imgur.com/LiTE0id.jpg',
	'SMASHING': 'http://i.imgur.com/6IDAbGR.gif',
	'Splatina': 'http://i.imgur.com/3HjAZ6T.png',
	'SPLATink': 'https://tworowtimes.com/wp-content/uploads/2016/02/Splatoon_2_-_Turquoise_ink.png',
	'Splatink': 'http://vignette2.wikia.nocookie.net/videogames-fanon/images/c/c8/Splatoon_2_-_Orange_ink.png/revision/latest?cb=20150726113201',
	'SPLATINK': 'http://vignette2.wikia.nocookie.net/videogames-fanon/images/6/61/Splatoon_2_-_Blue_ink.png/revision/latest?cb=20150726113232',
	'splatink': 'http://vignette1.wikia.nocookie.net/videogames-fanon/images/1/1d/Splatoon_2_-_Yellow_ink.png/revision/latest?cb=20150726113322',
	'sPLATINK': 'http://vignette4.wikia.nocookie.net/videogames-fanon/images/a/a0/Splatoon_2_-_Purple_ink.png/revision/latest?cb=20150726113101',
	'Splatastic': 'http://i.imgur.com/qSlSCbF.png',
	'feelsbadman': 'http://i.imgur.com/jaPiNPX.jpg',
	'feelsgoodman': 'http://i.imgur.com/UCePRuI.png',
	'feelsfeel': 'http://i.imgur.com/s8kN3AV.png',
	'feelssweet': 'http://i.imgur.com/7FDtLTq.jpg',
	'uwot': 'http://i.imgur.com/3VsV5pN.png',
	'spmeme': 'http://i.imgur.com/gYtxtDP.jpg',
	'feelssammich': 'http://i.imgur.com/sVgkUF1.png',
	'Egg1': 'http://i.imgur.com/J1Tuhua.png',
	'Egg2': 'http://i.imgur.com/BEUUdAD.png',
	'Egg3': 'http://i.imgur.com/3EcGf8h.png',
	'lelelol': 'http://i.imgur.com/R2g0RHT.gif',
	'lelepn': 'http://i.imgur.com/AtFxRsd.jpg',
	'lelegasp': 'http://i.imgur.com/lF2FPxL.png',
	'lelewhat': 'http://i.imgur.com/capG93y.png',
	'lelesad': 'http://i.imgur.com/E8hne72.png',
	'feelssavage': 'http://i.imgur.com/Vw3xwmU.jpg',
	'llamabored': 'http://orig15.deviantart.net/7929/f/2013/347/f/e/llama_emoji_36__bored___v2__by_jerikuto-d6ut3nn.gif',
	'jazz': 'https://s-media-cache-ak0.pinimg.com/originals/12/60/a1/1260a162e615b41d053c5ea9307705fc.jpg',
	'feelsbern': 'http://i.imgur.com/hSSP1V7.gif',
	'Doge': '//i.imgur.com/jfVcWbz.jpg',
	'feelsmiguel': 'http://68.media.tumblr.com/11c5b846207ed38389ae4b6dec3fcae4/tumblr_npbpfrztSN1uxp9xfo1_1280.jpg',
};
let emoteRegex = new RegExp('feelsbd', 'g');
Exiled.ignoreEmotes = {};
try {
	Exiled.ignoreEmotes = JSON.parse(fs.readFileSync('config/ignoreemotes.json', 'utf8'));
} catch (e) {}

function loadEmoticons() {
	try {
		emoticons = JSON.parse(fs.readFileSync('config/emoticons.json', 'utf8'));
		emoteRegex = [];
		for (let emote in emoticons) {
			emoteRegex.push(escapeRegExp(emote));
		}
		emoteRegex = new RegExp('(' + emoteRegex.join('|') + ')', 'g');
	} catch (e) {}
}
loadEmoticons();

function saveEmoticons() {
	fs.writeFileSync('config/emoticons.json', JSON.stringify(emoticons));
	emoteRegex = [];
	for (let emote in emoticons) {
		emoteRegex.push(emote);
	}
	emoteRegex = new RegExp('(' + emoteRegex.join('|') + ')', 'g');
}

function parseEmoticons(message) {
	if (emoteRegex.test(message)) {
		message = Exiled.parseMessage(message).replace(emoteRegex, function (match) {
			return '<img src="' + emoticons[match] + '" title="' + match + '" height="50" width="50">';
		});
		return message;
	}
	return false;
}
Exiled.parseEmoticons = parseEmoticons;

exports.commands = {
	blockemote: 'ignoreemotes',
	blockemotes: 'ignoreemotes',
	blockemoticon: 'ignoreemotes',
	blockemoticons: 'ignoreemotes',
	ignoreemotes: function (target, room, user) {
		this.parse('/emoticons ignore');
	},

	unblockemote: 'unignoreemotes',
	unblockemotes: 'unignoreemotes',
	unblockemoticon: 'unignoreemotes',
	unblockemoticons: 'unignoreemotes',
	unignoreemotes: function (target, room, user) {
		this.parse('/emoticons unignore');
	},

	emoticons: 'emoticon',
	emote: 'emoticon',
	emotes: 'emoticon',
	emoticon: function (target, room, user) {
		if (!target) target = 'help';
		let parts = target.split(',');
		for (let u in parts) parts[u] = parts[u].trim();

		switch (parts[0]) {
		case 'add':
			if (!this.can('roomowner')) return false;
			if (!parts[2]) return this.sendReply("Usage: /emoticon add, [name], [url] - Remember to resize the image first! (recommended 30x30)");
			if (emoticons[parts[1]]) return this.sendReply("\"" + parts[1] + "\" is already an emoticon.");
			emoticons[parts[1]] = parts[2];
			saveEmoticons();
			this.sendReply('|raw|The emoticon "' + Chat.escapeHTML(parts[1]) + '" has been added: <img src="' + parts[2] + '">');
			Rooms('upperstaff').add('|raw|' + Exiled.nameColor(user.name, true) + ' has added the emote "' + Chat.escapeHTML(parts[1]) +
				'": <img width="40" height="40" src="' + parts[2] + '">').update();
			Exiled.messageSeniorStaff('/html ' + Exiled.nameColor(user.name, true) + ' has added the emote "' + Chat.escapeHTML(parts[1]) +
				'": <img width="40" height="40" src="' + parts[2] + '">');
			break;

		case 'delete':
		case 'remove':
		case 'rem':
		case 'del':
			if (!this.can('roomowner')) return false;
			if (!parts[1]) return this.sendReply("Usage: /emoticon del, [name]");
			if (!emoticons[parts[1]]) return this.sendReply("The emoticon \"" + parts[1] + "\" does not exist.");
			delete emoticons[parts[1]];
			saveEmoticons();
			this.sendReply("The emoticon \"" + parts[1] + "\" has been removed.");
			break;

		case 'on':
		case 'enable':
		case 'disable':
		case 'off':
			if (!this.can('roommod', null, room)) return this.sendReply('Access denied.');
			let status = ((parts[0] !== 'enable' && parts[0] !== 'on'));
			if (room.disableEmoticons === status) return this.sendReply("Emoticons are already " + (status ? "disabled" : "enabled") + " in this room.");
			room.disableEmoticons = status;
			room.chatRoomData.disableEmoticons = status;
			Rooms.global.writeChatRoomData();
			this.privateModCommand('(' + user.name + ' ' + (status ? ' disabled ' : ' enabled ') + 'emoticons in this room.)');
			break;

		case 'view':
		case 'list':
			if (!this.runBroadcast()) return;
			let reply = "<b><u>Emoticons (" + Object.keys(emoticons).length + ")</u></b><br />";
			for (let emote in emoticons) reply += "(" + emote + " <img src=\"" + emoticons[emote] + "\" height=\"40\" width=\"40\">) ";
			this.sendReply('|raw|<div class="infobox infobox-limited">' + reply + '</div>');
			break;

		case 'ignore':
			if (Exiled.ignoreEmotes[user.userid]) return this.errorReply("You are already ignoring emoticons.");
			Exiled.ignoreEmotes[user.userid] = true;
			fs.writeFileSync('config/ignoreemotes.json', JSON.stringify(Exiled.ignoreEmotes));
			this.sendReply("You are now ignoring emoticons.");
			break;

		case 'unignore':
			if (!Exiled.ignoreEmotes[user.userid]) return this.errorReply("You aren't ignoring emoticons.");
			delete Exiled.ignoreEmotes[user.userid];
			fs.writeFileSync('config/ignoreemotes.json', JSON.stringify(Exiled.ignoreEmotes));
			this.sendReply("You are no longer ignoring emoticons.");
			break;

		default:
		case 'help':
			if (!this.runBroadcast()) return;
			this.sendReplyBox(
				"Emoticon Commands:<br />" +
				"<small>/emoticon may be substituted with /emoticons, /emotes, or /emote</small><br />" +
				"/emoticon add, [name], [url] - Adds an emoticon.<br />" +
				"/emoticon del/delete/remove/rem, [name] - Removes an emoticon.<br />" +
				"/emoticon enable/on/disable/off - Enables or disables emoticons in the current room.<br />" +
				"/emoticon view/list - Displays the list of emoticons.<br />" +
				"/emoticon ignore - Ignores emoticons in chat messages.<br />" +
				"/emoticon unignore - Unignores emoticons in chat messages.<br />" +
				"/emoticon help - Displays this help command.<br />" +
				"<a href=\"https://gist.github.com/jd4564/ef66ecc47c58b3bb06ec\">Emoticon Plugin by: jd</a>"
			);
			break;
		}
	},
};

function escapeRegExp(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}