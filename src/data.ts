import { TravelPackage, Review, InstagramPost } from './types';

// CURATED IMAGE RESOLUTION LOOKUP
const IMAGE_MAP: Record<string, string> = {
  // AFRICA
  'Kenya': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
  'Morocco': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700974/ait-benhaddou-ancient-city-in-morocco-north-africa_evtbwm.jpg',
  'Seychelles': 'https://images.unsplash.com/photo-1589979482837-e74f2e145060?auto=format&fit=crop&w=800&q=80',
  'South Africa': 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
  'Zimbabwe': 'https://images.unsplash.com/photo-1603204006132-7bb3b7bca06e?auto=format&fit=crop&w=800&q=80',
  'Tanzania': 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=800&q=80',

  // AMERICA
  'Alaska': 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
  'Canada': 'https://images.unsplash.com/photo-1506501139174-099022df5260?auto=format&fit=crop&w=800&q=80',
  'Central America': 'https://images.unsplash.com/photo-1512552288940-3a800992db21?auto=format&fit=crop&w=800&q=80',
  'North America': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  'South America': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
  'USA': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',

  // PACIFIC
  'Australia': 'https://images.unsplash.com/photo-1523482596682-cd93a6e51525?auto=format&fit=crop&w=800&q=80',
  'Fiji': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
  'New Zealand': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',

  // ASIA
  'Bali': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779630835/360_F_263197896_NqmJWfTm7pljAVDfwl1U1gBAm3D08kCM_oaxyat.jpg',
  'Cambodia': 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80',
  'China': 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80',
  'Hong Kong': 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  'Japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  'Indonesia': 'https://images.unsplash.com/photo-1537953773315-2213cd4609c0?auto=format&fit=crop&w=800&q=80',
  'Kazakhstan': 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80',
  'Russia': 'https://images.unsplash.com/photo-1512495039889-52a3b799cbd1?auto=format&fit=crop&w=800&q=80',
  'South Korea': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  'Malaysia': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779630836/petronas-towers-kuala-lumpur-malaysia-uhd-4k-wallpaper_b4icf3.jpg',
  'Singapore': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700975/f69d65aca996dd6e047dd487d3c5989d_bacm1g.jpg',
  'Philippines': 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80',
  'Taiwan': 'https://images.unsplash.com/photo-1504618223053-559bdef9def5?auto=format&fit=crop&w=800&q=80',
  'Thailand': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779630668/Singapore_pdddzq.jpg',
  'Vietnam': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
  'Uzbekistan': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700976/pkg_5fec72d950415_epwynd.jpg',

  // EUROPE
  'Armenia': 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80',
  'Austria': 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80',
  'Belgium': 'https://images.unsplash.com/photo-1491557342268-8c0e2926c40d?auto=format&fit=crop&w=800&q=80',
  'Bulgaria': 'https://images.unsplash.com/photo-1491557342268-8c0e2926c40d?auto=format&fit=crop&w=800&q=80',
  'Croatia': 'https://images.unsplash.com/photo-1555992336-03a23c7b20eb?auto=format&fit=crop&w=800&q=80',
  'Czech Republic': 'https://images.unsplash.com/photo-1491557342268-8c0e2926c40d?auto=format&fit=crop&w=800&q=80',
  'Denmark Republic': 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80',
  'Finland Republic': 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80',
  'France': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  'Greece': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  'Greenland': 'https://images.unsplash.com/photo-1548252646-e53908db690d?auto=format&fit=crop&w=800&q=80',
  'Hungary': 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80',
  'Iceland': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
  'Ireland': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  'Italy': 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=800&q=80',
  'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=800&q=80',
  'Netherlands': 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80',
  'Norway': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
  'Portugal': 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80',
  'Romania': 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80',
  'Slovakia': 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80',
  'Spain': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700975/e1b64f74-city-32213-1987f4ad4ba_pu1sb9.jpg',
  'Sweden': 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80',
  'Switzerland': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266410/switzerland_gakc8u.jpg',
  'Turkey': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700974/993cdcb53e12f9de64241e6f3dae9ead_iwwnxn.jpg',
  'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=800&q=80',

  // ISLANDS
  'Madagascar': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
  'Maldives': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266408/maldives-_hveb5k.jpg',
  'Mauritius': 'https://images.unsplash.com/photo-1589979482837-e74f2e145060?auto=format&fit=crop&w=800&q=80',
  'Reunion': 'https://images.unsplash.com/photo-1589979482837-e74f2e145060?auto=format&fit=crop&w=800&q=80',
  'Sri Lanka': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700975/earth-palm-tree-horizon-ocean-wallpaper-preview_ljky2s.jpg',
  'Srilanka': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700975/earth-palm-tree-horizon-ocean-wallpaper-preview_ljky2s.jpg',

  // MIDDLE EAST & OTHERS
  'Israel': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
  'Jordan': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
  'Oman': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
  'Qatar': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  'UAE': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  'Dubai': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266408/dubai_xneajk.jpg',
  'Egypt': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
  'Cordelia Cruises': 'https://images.unsplash.com/photo-1548252646-e53908db690d?auto=format&fit=crop&w=800&q=80',

  // HONEYMOON INTL ACCENTS
  'Phuket': 'https://images.unsplash.com/photo-1528181304800-2f1908bc41ac?auto=format&fit=crop&w=800&q=80',
  'Langkawi': 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80',
  'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  'Krabi': 'https://images.unsplash.com/photo-1528181304800-2f1908bc41ac?auto=format&fit=crop&w=800&q=80',
  'Koh Samui': 'https://images.unsplash.com/photo-1528181304800-2f1908bc41ac?auto=format&fit=crop&w=800&q=80',
  'Europe': 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',

  // DOMESTIC TOP IMAGES
  'Agra': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700422/149934-797511790_tiny_ugkwp4.jpg',
  'Chandigarh': 'https://images.unsplash.com/photo-1622308644422-92a00c6be879?auto=format&fit=crop&w=800&q=80',
  'Delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
  'Gulmarg': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266409/Kashmir_uy6lnz.jpg',
  'Haridwar & Rishikesh': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Himachal Pradesh': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  'Jaipur': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700421/1_kssrr4.jpg',
  'Jaisalmer': 'https://images.unsplash.com/photo-1489493887462-402b7264e619?auto=format&fit=crop&w=800&q=80',
  'Jammu and Kashmir': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266409/Kashmir_uy6lnz.jpg',
  'Ladakh': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700430/ladakh-trek-e1635267234139_gganxi.jpg',
  'Lucknow': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Manali': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  'Mussoorie': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  'Shimla': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779631848/shimla_s10f2v.jpg',
  'Srinagar': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266409/Kashmir_uy6lnz.jpg',
  'Uttarakhand': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',

  // SOUTH INDIA
  'Alleppey': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
  'Araku Valley': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
  'Bangalore': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700429/360_F_439790635_9u9sO3YXK87jmEYNuoBLZOz7JqpEDHTC_f6d2is.jpg',
  'Bengaluru': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700429/360_F_439790635_9u9sO3YXK87jmEYNuoBLZOz7JqpEDHTC_f6d2is.jpg',
  'Benguluru': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700429/360_F_439790635_9u9sO3YXK87jmEYNuoBLZOz7JqpEDHTC_f6d2is.jpg',
  'Chennai': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  'Coorg': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
  'Hyderabad': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Kanyakumari': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  'Karnataka': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  'Kerala': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266408/kerela_fnrljt.jpg',
  'Kochi': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
  'Munnar': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779631618/wp4413867_rzidvz.jpg',
  'Mysore': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  'Ooty': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779631675/360_F_145526609_koZDb7aFHWJIsVYVcktsAS7JjfJHYw59_utz4qq.jpg',
  'Rameswaram': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  'Tamil Nadu': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
  'Thekkady': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
  'Tirupati': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Wayanad': 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',

  // EAST/WEST INDIA
  'Bihar': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Darjeeling': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Kolkata': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Odisha': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Puri': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'West Bengal': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Ahmedabad': 'https://images.unsplash.com/photo-1477587458883-47135dc640d5?auto=format&fit=crop&w=800&q=80',
  'Goa': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779630668/goa_iikihq.jpg',
  'Gujarat': 'https://images.unsplash.com/photo-1477587458883-47135dc640d5?auto=format&fit=crop&w=800&q=80',
  'Jodhpur': 'https://images.unsplash.com/photo-1477587458883-47135dc640d5?auto=format&fit=crop&w=800&q=80',
  'Mahabaleshwar': 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80',
  'Maharashtra': 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80',
  'Mumbai': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700428/360_F_341950409_Gq1sN2OqYgRZrUTvPohSmgQVubaqzlA5_b5g2lo.jpg',
  'Pune': 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80',
  'Udaipur': 'https://images.unsplash.com/photo-1477587458883-47135dc640d5?auto=format&fit=crop&w=800&q=80',

  // NORTH EAST
  'Arunachal Pradesh': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Gangtok': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Guwahati': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Manipur': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Meghalaya': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Pelling': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Shillong': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Sikkim': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',
  'Tawang': 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=800&q=80',

  // CENTRAL INDIA
  'Bhopal': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Chhattisgarh': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Gwalior': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Indore': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Madhya Pradesh': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Pachmarhi': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',
  'Ujjain': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',

  // SPIRITUAL
  'Ayodhya': 'https://images.unsplash.com/photo-1600100397990-24b32525e4c4?auto=format&fit=crop&w=800&q=80',

  // HONEYMOON DOMESTIC
  'Andaman': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266408/Andaman_sntam6.jpg',
  'Andhaman': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266408/Andaman_sntam6.jpg',
  'Kashmir': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779266409/Kashmir_uy6lnz.jpg',
  'Kodaikanal': 'https://res.cloudinary.com/dnmsztoba/image/upload/q_auto/f_auto/v1779700421/123945980_y6ufg5.webp',
};

// USER-REQUESTED RAW PACKAGES LISTS
const RAW_INTERNATIONAL_CATALOG = [
  // Africa
  { name: 'Kenya', tags: ['Africa'] },
  { name: 'Morocco', tags: ['Africa'] },
  { name: 'Seychelles', tags: ['Africa', 'Honeymoon'] },
  { name: 'South Africa', tags: ['Africa', 'Honeymoon'] },
  { name: 'Zimbabwe', tags: ['Africa'] },
  { name: 'Tanzania', tags: ['Africa'] },
  // America
  { name: 'Alaska', tags: ['America'] },
  { name: 'Canada', tags: ['America'] },
  { name: 'Central America', tags: ['America'] },
  { name: 'North America', tags: ['America'] },
  { name: 'South America', tags: ['America'] },
  { name: 'USA', tags: ['America'] },
  // Pacific
  { name: 'Australia', tags: ['Pacific', 'Honeymoon'] },
  { name: 'Fiji', tags: ['Pacific'] },
  { name: 'New Zealand', tags: ['Pacific'] },
  // Asia
  { name: 'Bali', tags: ['Asia', 'Honeymoon'] },
  { name: 'Cambodia', tags: ['Asia'] },
  { name: 'China', tags: ['Asia'] },
  { name: 'Hong Kong', tags: ['Asia'] },
  { name: 'Japan', tags: ['Asia'] },
  { name: 'Indonesia', tags: ['Asia'] },
  { name: 'Kazakhstan', tags: ['Asia'] },
  { name: 'Russia', tags: ['Asia', 'Europe'] },
  { name: 'South Korea', tags: ['Asia'] },
  { name: 'Malaysia', tags: ['Asia', 'Honeymoon'] },
  { name: 'Singapore', tags: ['Asia', 'Honeymoon'] },
  { name: 'Philippines', tags: ['Asia'] },
  { name: 'Taiwan', tags: ['Asia'] },
  { name: 'Thailand', tags: ['Asia', 'Honeymoon'] },
  { name: 'Vietnam', tags: ['Asia'] },
  { name: 'Uzbekistan', tags: ['Asia'] },
  // Europe
  { name: 'Armenia', tags: ['Europe'] },
  { name: 'Austria', tags: ['Europe'] },
  { name: 'Belgium', tags: ['Europe'] },
  { name: 'Bulgaria', tags: ['Europe'] },
  { name: 'Croatia', tags: ['Europe', 'Honeymoon'] },
  { name: 'Czech Republic', tags: ['Europe'] },
  { name: 'Denmark Republic', tags: ['Europe'] },
  { name: 'Finland Republic', tags: ['Europe'] },
  { name: 'France', tags: ['Europe'] },
  { name: 'Germany', tags: ['Europe'] },
  { name: 'Greece', tags: ['Europe', 'Honeymoon'] },
  { name: 'Greenland', tags: ['Europe'] },
  { name: 'Hungary', tags: ['Europe'] },
  { name: 'Iceland', tags: ['Europe'] },
  { name: 'Ireland', tags: ['Europe'] },
  { name: 'Italy', tags: ['Europe', 'Honeymoon'] },
  { name: 'London', tags: ['Europe'] },
  { name: 'Netherlands', tags: ['Europe'] },
  { name: 'Norway', tags: ['Europe'] },
  { name: 'Portugal', tags: ['Europe'] },
  { name: 'Romania', tags: ['Europe'] },
  { name: 'Slovakia', tags: ['Europe'] },
  { name: 'Spain', tags: ['Europe', 'Honeymoon'] },
  { name: 'Sweden', tags: ['Europe'] },
  { name: 'Switzerland', tags: ['Europe', 'Honeymoon'] },
  { name: 'Turkey', tags: ['Europe'] },
  { name: 'United Kingdom', tags: ['Europe'] },
  // Island
  { name: 'Madagascar', tags: ['Island'] },
  { name: 'Maldives', tags: ['Island', 'Honeymoon'] },
  { name: 'Mauritius', tags: ['Island', 'Honeymoon'] },
  { name: 'Reunion', tags: ['Island'] },
  { name: 'Sri Lanka', tags: ['Island', 'Honeymoon'] },
  // Middle East
  { name: 'Israel', tags: ['Middle East'] },
  { name: 'Jordan', tags: ['Middle East'] },
  { name: 'Oman', tags: ['Middle East'] },
  { name: 'Qatar', tags: ['Middle East'] },
  { name: 'UAE', tags: ['Middle East'] },
  { name: 'Dubai', tags: ['Middle East', 'Honeymoon'] },
  { name: 'Egypt', tags: ['Middle East'] },
  // Cruises
  { name: 'Cordelia Cruises', tags: ['Cruises'] },
  // Honeymoon Specials
  { name: 'Phuket', tags: ['Honeymoon'] },
  { name: 'Langkawi', tags: ['Honeymoon'] },
  { name: 'Paris', tags: ['Honeymoon'] },
  { name: 'Krabi', tags: ['Honeymoon'] },
  { name: 'Koh Samui', tags: ['Honeymoon'] }
];

const RAW_DOMESTIC_CATALOG = [
  // North India
  { name: 'Agra', tags: ['North India'] },
  { name: 'Chandigarh', tags: ['North India'] },
  { name: 'Delhi', tags: ['North India'] },
  { name: 'Gulmarg', tags: ['North India'] },
  { name: 'Haridwar & Rishikesh', tags: ['North India'] },
  { name: 'Himachal Pradesh', tags: ['North India'] },
  { name: 'Jaipur', tags: ['North India'] },
  { name: 'Jaisalmer', tags: ['North India'] },
  { name: 'Jammu and Kashmir', tags: ['North India'] },
  { name: 'Ladakh', tags: ['North India'] },
  { name: 'Lucknow', tags: ['North India'] },
  { name: 'Manali', tags: ['North India', 'Honeymoon', 'Educational'] },
  { name: 'Mussoorie', tags: ['North India'] },
  { name: 'Shimla', tags: ['North India', 'Honeymoon'] },
  { name: 'Srinagar', tags: ['North India'] },
  { name: 'Uttarakhand', tags: ['North India'] },
  // South India
  { name: 'Alleppey', tags: ['South India'] },
  { name: 'Araku Valley', tags: ['South India'] },
  { name: 'Bengaluru', tags: ['South India', 'Educational'] },
  { name: 'Chennai', tags: ['South India'] },
  { name: 'Coorg', tags: ['South India', 'Honeymoon'] },
  { name: 'Hyderabad', tags: ['South India'] },
  { name: 'Kanyakumari', tags: ['South India'] },
  { name: 'Karnataka', tags: ['South India'] },
  { name: 'Kerala', tags: ['South India', 'Honeymoon'] },
  { name: 'Kochi', tags: ['South India', 'Educational'] },
  { name: 'Munnar', tags: ['South India', 'Honeymoon'] },
  { name: 'Mysore', tags: ['South India', 'Educational'] },
  { name: 'Ooty', tags: ['South India', 'Honeymoon'] },
  { name: 'Rameswaram', tags: ['South India'] },
  { name: 'Tamil Nadu', tags: ['South India'] },
  { name: 'Thekkady', tags: ['South India'] },
  { name: 'Tirupati', tags: ['South India', 'Spiritual'] },
  { name: 'Wayanad', tags: ['South India'] },
  // East India
  { name: 'Bihar', tags: ['East India'] },
  { name: 'Darjeeling', tags: ['East India', 'Honeymoon', 'Educational'] },
  { name: 'Kolkata', tags: ['East India'] },
  { name: 'Odisha', tags: ['East India'] },
  { name: 'Puri', tags: ['East India'] },
  { name: 'West Bengal', tags: ['East India'] },
  // West India
  { name: 'Ahmedabad', tags: ['West India'] },
  { name: 'Goa', tags: ['West India', 'Honeymoon', 'Educational'] },
  { name: 'Gujarat', tags: ['West India'] },
  { name: 'Jodhpur', tags: ['West India'] },
  { name: 'Mahabaleshwar', tags: ['West India'] },
  { name: 'Maharashtra', tags: ['West India'] },
  { name: 'Mumbai', tags: ['West India'] },
  { name: 'Pune', tags: ['West India'] },
  { name: 'Rajasthan', tags: ['West India'] },
  { name: 'Udaipur', tags: ['West India'] },
  // North East
  { name: 'Arunachal Pradesh', tags: ['North East'] },
  { name: 'Gangtok', tags: ['North East'] },
  { name: 'Guwahati', tags: ['North East'] },
  { name: 'Manipur', tags: ['North East'] },
  { name: 'Meghalaya', tags: ['North East'] },
  { name: 'Pelling', tags: ['North East'] },
  { name: 'Shillong', tags: ['North East'] },
  { name: 'Sikkim', tags: ['North East'] },
  { name: 'Tawang', tags: ['North East'] },
  // Central India
  { name: 'Bhopal', tags: ['Central India'] },
  { name: 'Chhattisgarh', tags: ['Central India'] },
  { name: 'Gwalior', tags: ['Central India'] },
  { name: 'Indore', tags: ['Central India'] },
  { name: 'Madhya Pradesh', tags: ['Central India'] },
  { name: 'Pachmarhi', tags: ['Central India'] },
  { name: 'Ujjain', tags: ['Central India'] },
  // Spiritual
  { name: 'Ayodhya', tags: ['Spiritual'] },
  // Honeymoon Specials
  { name: 'Andaman', tags: ['Honeymoon'] },
  { name: 'Kashmir', tags: ['Honeymoon'] },
  { name: 'Kodaikanal', tags: ['Honeymoon'] }
];

// RUNTIME CONVERTER TO PROPER TravelPackage TYPE
const buildPackage = (raw: typeof RAW_INTERNATIONAL_CATALOG[0], idx: number, category: 'international' | 'domestic'): TravelPackage => {
  const name = raw.name;
  const image = IMAGE_MAP[name] || (category === 'international' 
    ? 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80' 
    : 'https://images.unsplash.com/photo-1477587458883-47135dc640d5?auto=format&fit=crop&w=800&q=80'
  );
  
  return {
    id: `${category}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idx}`,
    category,
    name,
    duration: 'Custom Itinerary',
    price: 0,
    rating: 4.8 + Math.random() * 0.2,
    image,
    highlights: ['Tailored daily details', 'Private local coordinates', 'WhatsApp direct travel desk help'],
    hotels: 'Handpicked Cozy Boutique Stays',
    flightIncluded: true,
    mealsIncluded: true,
    guidesIncluded: true,
    visaAssistance: true,
    tags: raw.tags || []
  };
};

export const INTERNATIONAL_PACKAGES: TravelPackage[] = RAW_INTERNATIONAL_CATALOG.map((pkg, idx) => buildPackage(pkg, idx, 'international'));

export const DOMESTIC_PACKAGES: TravelPackage[] = RAW_DOMESTIC_CATALOG.map((pkg, idx) => buildPackage(pkg, idx, 'domestic'));

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'The Miller Family',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'Pole to Pole helped us plan a flawless journey to Germany. Standing in front of our historic family home was an emotional experience we could never have planned on our own! Their team handled every train connection, local tour, and hotel beautifully.',
    date: 'August 14, 2025',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Marcus & Sarah T.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'We booked the 14-day Western National Parks road trip designed by Pole to Pole. The vehicle rental was flawless and their trail recommendations saved us hours of stress! Also, the pre-planned guided treks kept our group safe and fully engaged.',
    date: 'February 22, 2026',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Eleanor Vance',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'A cruise to Antarctica was my absolute dream. The Pole to Pole team’s personal tips about the landing sites and gear setup made all the difference. They are absolute planning wizards - every single detail fell right into place!',
    date: 'April 05, 2026',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'The Harrison Clan',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    text: 'Our customized tour of the central United States was breathtakingly unforgettable. Pole to Pole helped map out beautiful rustic routes and recommended stunning boutique hotels. Perfect service, highly tailored, and excellent pricing!',
    date: 'September 18, 2025',
    verified: true
  }
];

export const INSTAGRAM_FEED: InstagramPost[] = [
  {
    id: 'ig-1',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
    type: 'photo',
    likes: '1.4K',
    comments: '42',
    caption: 'Campfire sparks under the Western stars. ⛺✨ Designing custom national parks adventures! #PoleToPole #NationalParks #CamperLife',
    link: 'https://instagram.com/poletopole_toursandtravels'
  },
  {
    id: 'ig-2',
    imageUrl: 'https://images.unsplash.com/photo-1548252646-e53908db690d?auto=format&fit=crop&w=600&q=80',
    type: 'photo',
    likes: '2.8K',
    comments: '115',
    caption: 'Greetings from Antarctica! Cruising ice-bays with the locals (the penguins!). One of my favorite adventures. 🧊🐧 #AntarcticaCruise #LemaireChannel #PoleToPoleTravels',
    link: 'https://instagram.com/poletopole_toursandtravels'
  },
  {
    id: 'ig-3',
    imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80',
    type: 'photo',
    likes: '850',
    comments: '19',
    caption: 'Walking in the footsteps of history. This 120-year-old home survived both World Wars! Let us map out your custom heritage trip. 🚂🏰 #GermanyTravel #HeritageTrip #FamilyHistory',
    link: 'https://instagram.com/poletopole_toursandtravels'
  },
  {
    id: 'ig-4',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80',
    type: 'photo',
    likes: '1.9K',
    comments: '54',
    caption: 'Sunrise over Maasai Mara. Magical safaris designed by and for real lovers of wildlife. 🦒🌅 #KenyaSafari #MaasaiMara #WildlifeExplorers',
    link: 'https://instagram.com/poletopole_toursandtravels'
  },
  {
    id: 'ig-5',
    imageUrl: 'https://images.unsplash.com/photo-1528154291023-a6525fabb5b0?auto=format&fit=crop&w=600&q=80',
    type: 'photo',
    likes: '2.1K',
    comments: '73',
    caption: 'Stunning Queenstown, New Zealand landscapes. A perfect stop on our month-long trek. Let Pole to Pole build your dream plan! 🏞️🇳🇿 #NewZealandTrek #MilfordSound #BespokeTravel',
    link: 'https://instagram.com/poletopole_toursandtravels'
  },
  {
    id: 'ig-6',
    imageUrl: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=600&q=80',
    type: 'photo',
    likes: '920',
    comments: '31',
    caption: 'Getting group pictures together on the trail in our custom printed corporate vacation hoodies! Cotton-soft and highly visible. 👕🎒 #CustomVacationShirts #PoleToPoleDesigns #TravelGroup',
    link: 'https://instagram.com/poletopole_toursandtravels'
  }
];
