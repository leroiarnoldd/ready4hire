// Supabase client — replace with your actual keys
if(!window._supabase && window.supabase){
  window._supabase = window.supabase.createClient(
    'https://drvatxcmpunpzvkyesxc.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRydmF0eGNtcHVucHp2a3llc3hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NTE5MjgsImV4cCI6MjA5MjAyNzkyOH0.Lys82d0coEOCoRqkh2FEsI64-ymX_jAz5XF3VZIDwm4'
  );
}

import { useState, useEffect, useRef } from "react";

const G = {
  forest:"#1B5E20", dark:"#2E7D32", mid:"#388E3C", bright:"#4CAF50",
  light:"#A5D6A7", pale:"#E8F5E9", frost:"#F1F8F2", white:"#FFFFFF",
  ink:"#1A2E1B", body:"#3D4F3E", muted:"#6B7C6C",
  border:"#C8E6C9", soft:"#DCE8DC",
  gold:"#F9A825", amber:"#FFF8E1",
  orange:"#E65100", orangeLight:"#FFF3E0",
  blue:"#1565C0",
};

const JITTER = b => b + [-1,0,0,1][Math.floor(Math.random()*4)];

const MACHINES = [
  { id:1, name:"Rug Doctor Deep Clean",  brand:"Rug Doctor", logo:"RD", col:"#C8001A",
    price:29, weekend:38, deposit:0, delivery:false, solution:true, inStock:true,
    rating:4.6, reviews:52400, badge:"Most Popular", cpa:0.12,
    feats:["No deposit","Solution included","Supermarket pickup"],
    bestFor:["General carpet cleaning","Living rooms & bedrooms","First-time hirers"],
    notFor:["Delicate or antique rugs","Heavily soiled commercial carpet"],
    pickups:{ SW:"Tesco Clapham (0.4mi) · Asda Brixton (1.2mi)", M:"Tesco Piccadilly (0.6mi) · Sainsbury's Ancoats (0.9mi)", B:"Tesco City (0.5mi) · Asda Great Barr (1.8mi)", def:"Your nearest Tesco · Asda · Sainsbury's" }},
  { id:2, name:"Kärcher Puzzi 10/1",    brand:"Kärcher",   logo:"K",  col:"#E65100",
    price:39, weekend:55, deposit:50, delivery:true, solution:false, inStock:true,
    rating:4.4, reviews:31200, badge:"Pro Grade", cpa:0.12,
    feats:["Delivery available","Industrial suction","Any solution"],
    bestFor:["Heavily soiled carpets","Landlords & end of tenancy","Tradespeople"],
    notFor:["Budget hirers","Quick same-day jobs"],
    pickups:{ SW:"Toolstation Wandsworth (1.1mi) · Delivery (+£8)", M:"Toolstation Manchester (0.8mi) · Delivery (+£8)", B:"Screwfix Birmingham (0.7mi) · Delivery (+£8)", def:"Your nearest Toolstation · Screwfix · Delivery available (+£8)" }},
  { id:3, name:"Bissell ProHeat 2X",    brand:"Bissell",   logo:"Bi", col:"#1565C0",
    price:22, weekend:32, deposit:0, delivery:false, solution:true, inStock:true,
    rating:4.2, reviews:28800, badge:"Best Value", cpa:0.12,
    feats:["No deposit","Pet formula","Argos & Currys"],
    bestFor:["Pet owners","Families with children","Budget-conscious hirers"],
    notFor:["Professional or commercial use","Very large areas"],
    pickups:{ SW:"Argos Brixton (0.8mi) · Currys Clapham (1.4mi)", M:"Argos Arndale (0.3mi) · Currys Manchester (0.9mi)", B:"Argos City (0.4mi) · Currys Grand Central (0.6mi)", def:"Your nearest Argos · Currys" }},
  { id:4, name:"Vax Platinum Power Max", brand:"Vax",       logo:"Vx", col:"#6A1B9A",
    price:26, weekend:36, deposit:0, delivery:false, solution:true, inStock:true,
    rating:4.0, reviews:19600, badge:null, cpa:0.10,
    feats:["No deposit","Large tank","Dual brushes"],
    bestFor:["Large homes","Multiple rooms in one day","Value mid-range option"],
    notFor:["Professional use","Chemical-free requirements"],
    pickups:{ SW:"Currys Clapham (1.4mi) · Very.co.uk delivery", M:"Currys Manchester (0.9mi) · Very.co.uk delivery", B:"Currys Grand Central (0.6mi) · Very.co.uk delivery", def:"Your nearest Currys · Very.co.uk (delivery)" }},
  { id:5, name:"Polti Unico Steam",      brand:"Polti",     logo:"Po", col:"#37474F",
    price:35, weekend:49, deposit:30, delivery:true, solution:false, inStock:false,
    rating:4.1, reviews:12300, badge:"Chemical-Free", cpa:0.12,
    feats:["Steam only","Allergy safe","Kills dust mites"],
    bestFor:["Allergy & asthma sufferers","Homes with babies","Eco-conscious hirers"],
    notFor:["Heavily stained carpets","Same-day hire"],
    pickups:{ SW:"Hire Hub Battersea (1.6mi — call ahead)", M:"Manchester Plant Hire (2.1mi — call ahead)", B:"Brum Hire Centre (1.9mi — call ahead)", def:"Independent hire shops — call ahead · Limited availability" }},
];

const CLEANERS = [
  // ── LONDON ─────────────────────────────────────────────────
  { id:1,  name:"London Carpet Cleaning Ltd",       city:"London",       rating:4.8, reviews:1840, from:80,  badge:"20 Years",       verified:true, jobs:8400,  response:"< 1 hr",   col:"#1565C0", about:"20+ years serving London within the M25. 0203 390 2157. Truck-mounted equipment. All carpet types. End of tenancy specialists.", services:["Carpet","Upholstery","End of Tenancy","Commercial"], phone:"0203 390 2157", website:"londoncarpetcleaningltd.co.uk"},
  { id:2,  name:"Carpet Bright UK — London",        city:"London",       rating:4.9, reviews:22000, from:75,  badge:"Top Rated",      verified:true, jobs:100000,response:"< 2 hrs",  col:"#2E7D32", about:"100,000+ London customers. Award-winning. Checkatrade and Trustpilot verified. 7-day satisfaction guarantee. Rug, upholstery, curtains, mattress. carpetbright.uk.com", services:["Carpet","Upholstery","Rug Cleaning","Curtains","Mattress"], phone:"See website", website:"carpetbright.uk.com"},
  { id:3,  name:"Cleaner Cleaner Ltd",               city:"London",       rating:4.8, reviews:316,  from:85,  badge:"Wool Specialist", verified:true, jobs:2800,  response:"< 2 hrs",  col:"#6A1B9A", about:"Specialist in wool carpets and delicate fabrics. Covers Fulham, Hammersmith, Wandsworth, Walthamstow, Notting Hill, Brixton, Streatham. cleanercleaner.co.uk", services:["Carpet","Wool Carpets","Upholstery","End of Tenancy"], phone:"See website", website:"cleanercleaner.co.uk"},
  { id:4,  name:"Carpet Cleaner Ltd",                city:"London",       rating:4.7, reviews:412,  from:25,  badge:"Best Value",      verified:true, jobs:4200,  response:"< 2 hrs",  col:"#E65100", about:"From £25. Covers all London zones — NW, N, Central, SE, SW, E, W. 020 7206 2318. admin@carpet-cleaner.co.uk. 145-157 St John St EC1V 4PY.", services:["Carpet","Upholstery","Mattress","Window Cleaning","End of Tenancy"], phone:"020 7206 2318", website:"carpet-cleaner.co.uk"},
  { id:5,  name:"Number One Carpet Cleaning",        city:"London",       rating:4.7, reviews:289,  from:60,  badge:"Same Day",        verified:true, jobs:1840,  response:"Same day", col:"#C62828", about:"Guaranteed same-day appointments. 020 3632 3212. Carpet, rug and upholstery cleaning across London. numberonecarpetcleaning.co.uk", services:["Carpet","Rugs","Upholstery","Same Day"], phone:"020 3632 3212", website:"numberonecarpetcleaning.co.uk"},
  { id:6,  name:"Fine Carpet Cleaning — London",     city:"London",       rating:4.8, reviews:198,  from:70,  badge:"Checkatrade",     verified:true, jobs:1200,  response:"< 2 hrs",  col:"#2E7D32", about:"Checkatrade verified — passed 20-point inspection. Professional carpet cleaning across London. finecarpetcleaning.co.uk", services:["Carpet","Upholstery","End of Tenancy","Rug Cleaning"], phone:"See website", website:"finecarpetcleaning.co.uk"},
  { id:7,  name:"Cullens Carpet Cleaning — London",  city:"London",       rating:4.9, reviews:412,  from:75,  badge:"Eco-Certified",   verified:true, jobs:3200,  response:"< 24 hrs", col:"#37474F", about:"9.9/10 Checkatrade. Eco-certified. Surrey Trading Standards approved. DBS checked staff. South West London and Surrey. Free instant online quote. 0800 133 7638. cullens.co.uk", services:["Carpet","Upholstery","Eco-clean","End of Tenancy"], phone:"0800 133 7638", website:"cullens.co.uk"},
  { id:8,  name:"Crystal Clean Pro — London",        city:"London",       rating:4.9, reviews:312,  from:85,  badge:"Top Rated",       verified:true, jobs:1240, response:"< 1 hr",   col:"#1565C0", about:"Family-run, 12 years experience. CRB checked. Deposit return guarantee. All London zones covered.", services:["Carpet","Upholstery","End of Tenancy","Commercial"], phone:"See listing", website:"checkatrade.com"},
  { id:9,  name:"SparkleRight Cleaning — London",    city:"London",       rating:4.7, reviews:189,  from:75,  badge:"Best Value",      verified:true, jobs:892,  response:"< 2 hrs",  col:"#2E7D32", about:"Award-winning local cleaner. ISO certified solutions. Weekends available. All London zones.", services:["Carpet","Rugs","Stairs"], phone:"See listing", website:"checkatrade.com"},
  { id:10, name:"GreenClean Solutions — London",     city:"London",       rating:4.7, reviews:203,  from:90,  badge:"Eco-Friendly",    verified:true, jobs:788,  response:"< 2 hrs",  col:"#2E7D32", about:"100% plant-based solutions. Carbon neutral certified. Perfect for allergy sufferers. All London zones.", services:["Carpet","Upholstery","Eco-only"], phone:"See listing", website:"checkatrade.com"},

  // ── MILTON KEYNES ──────────────────────────────────────────
  // ⚠️ TEST BUSINESS — DELETE AFTER REVIEW
  { id:999, name:"ProClean MK — TEST PREMIUM",        city:"Milton Keynes",rating:5.0, reviews:847,  from:75,  badge:"#1 Milton Keynes", verified:true, jobs:3200, response:"< 1 hr",   col:"#1B5E20", plan:"premium", about:"TEST ENTRY — Premium listing demo. Top-placed above all standard and free listings. 01908 000 000. procleanmk.co.uk. Covers all MK postcodes MK1-MK19. WoolSafe approved. Deposit return guarantee. Free re-clean if not satisfied.", services:["Carpet","Upholstery","End of Tenancy","Stain Protection","Commercial"], phone:"01908 000 000", website:"procleanmk.co.uk"},
  { id:20, name:"Quality Cleans MK",                 city:"Milton Keynes",rating:4.9, reviews:312,  from:80,  badge:"WoolSafe",        verified:true, jobs:1200, response:"< 2 hrs",  col:"#2E7D32", about:"Advanced hot water extraction and VLM systems. WoolSafe-approved. Covers MK, Bletchley, Leighton Buzzard, Olney, Woburn, Stony Stratford. 07542 222280. carpet-cleaningmiltonkeynes.co.uk", services:["Carpet","Wool Carpets","Upholstery","Commercial","Stain Protection"], phone:"07542 222280", website:"carpet-cleaningmiltonkeynes.co.uk"},
  { id:21, name:"Clean Direct MK",                   city:"Milton Keynes",rating:4.8, reviews:412,  from:65,  badge:"25 Years",        verified:true, jobs:4200, response:"< 2 hrs",  col:"#1565C0", about:"25+ years serving MK and surrounding areas. Highly competitive prices. Domestic and commercial. cleandirectmk.com", services:["Carpet","Upholstery","Commercial","Hard Floor"], phone:"See website", website:"cleandirectmk.com"},
  { id:22, name:"Chem-Dry Milton Keynes",             city:"Milton Keynes",rating:4.7, reviews:286,  from:70,  badge:"Est. 1998",        verified:true, jobs:3800, response:"< 24 hrs", col:"#E65100", about:"Professional cleaning services since 1998. Home Counties area. Affordable and thorough. 0800 581594. chemdrymiltonkeynes.co.uk", services:["Carpet","Upholstery","End of Tenancy","Commercial"], phone:"0800 581594", website:"chemdrymiltonkeynes.co.uk"},
  { id:23, name:"Mega Cleaning — Milton Keynes",      city:"Milton Keynes",rating:4.6, reviews:198,  from:60,  badge:"Same Day",         verified:true, jobs:1600, response:"< 1 hr",   col:"#37474F", about:"Hot water extraction specialists. MK1–MK15. Short-notice appointments. 10% off when booking over £100. 020 3637 7737. megacleaning.co.uk", services:["Carpet","Upholstery","End of Tenancy","Rug Cleaning"], phone:"020 3637 7737", website:"megacleaning.co.uk"},
  { id:24, name:"Cleanways MK",                       city:"Milton Keynes",rating:4.7, reviews:156,  from:65,  badge:"Best Value",       verified:true, jobs:980,  response:"< 2 hrs",  col:"#6A1B9A", about:"Based at 100 Avebury Blvd, MK9 1DG. Professional and friendly team. Great value. Mon-Sat 7am-7pm. +44 4475 261 495", services:["Carpet","Upholstery","Sofa Cleaning"], phone:"+44 4475 261 495", website:"cleanways-carpet-cleaning.wheree.com"},
  { id:25, name:"PS Clean Ltd MK",                    city:"Milton Keynes",rating:4.6, reviews:134,  from:70,  badge:null,              verified:true, jobs:720,  response:"< 2 hrs",  col:"#C62828", about:"Based at Milton Keynes Business Centre, Foxhunter Dr, Linford Wood MK14 6GD. Commercial and domestic carpet cleaning across MK.", services:["Carpet","Commercial","Upholstery"], phone:"See listing", website:"checkatrade.com"},
  { id:26, name:"MK Carpet Specialists",              city:"Milton Keynes",rating:4.6, reviews:118,  from:70,  badge:null,              verified:true, jobs:512,  response:"< 2 hrs",  col:"#37474F", about:"Milton Keynes professional carpet cleaners. End of tenancy specialists. Same-day availability on most bookings.", services:["Carpet","End of Tenancy","Upholstery"], phone:"See listing", website:"checkatrade.com"},

  // ── BIRMINGHAM ────────────────────────────────────────────
  { id:30, name:"Smart Clean Birmingham",             city:"Birmingham",   rating:4.8, reviews:312,  from:75,  badge:"Top Rated",       verified:true, jobs:1240, response:"< 1 hr",   col:"#1565C0", about:"Truck-mounted steam cleaners. 0121 673 8284. End of tenancy specialists. Deposit return guarantee. Biodegradable solutions safe for children and pets. smartclean.net/birmingham", services:["Carpet","Upholstery","End of Tenancy","Commercial"], phone:"0121 673 8284", website:"smartclean.net/birmingham"},
  { id:31, name:"Adchem Carpet Cleaning Birmingham",  city:"Birmingham",   rating:4.9, reviews:198,  from:85,  badge:"Blueline Tech",   verified:true, jobs:840,  response:"< 24 hrs", col:"#2E7D32", about:"One of fewer than 15 Blueline Thermalwave truck-mounted systems in the UK. Birmingham and Lichfield. 0121 663 0364. adchem.co.uk", services:["Carpet","Upholstery","Commercial","Rugs"], phone:"0121 663 0364", website:"birmingham-carpetcleaners.co.uk"},
  { id:32, name:"Midlands Carpet Cleaners",           city:"Birmingham",   rating:4.8, reviews:286,  from:70,  badge:"Award Winning",   verified:true, jobs:1800, response:"< 2 hrs",  col:"#E65100", about:"Best Rug & Carpet Care Company 2024 — Industry Oversight Report. Selly Oak, Harborne, Sandwell, Dudley. midlandscarpetcleaners.co.uk", services:["Carpet","Upholstery","End of Tenancy","Rug Cleaning"], phone:"See website", website:"midlandscarpetcleaners.co.uk"},
  { id:33, name:"Local Expert Cleaning Birmingham",   city:"Birmingham",   rating:4.8, reviews:312,  from:70,  badge:"DBS Checked",     verified:true, jobs:1640, response:"< 2 hrs",  col:"#6A1B9A", about:"15+ years. Fully insured, DBS checked. Carpet, upholstery, oven and specialist cleaning across Birmingham and West Midlands. localexpertcleaning.co.uk", services:["Carpet","Upholstery","Oven Cleaning","Specialist"], phone:"See website", website:"localexpertcleaning.co.uk"},
  { id:34, name:"BCCB Carpet Cleaning Birmingham",    city:"Birmingham",   rating:4.7, reviews:178,  from:65,  badge:"Commercial",      verified:true, jobs:980,  response:"< 2 hrs",  col:"#C62828", about:"Commercial and domestic carpet cleaning Birmingham. Carpets left soft, clean and dry. City centre specialist. bccb-sparkle.co.uk", services:["Carpet","Commercial","Upholstery","Hard Floor"], phone:"See website", website:"bccb-sparkle.co.uk"},
  { id:35, name:"Eco Clean Midlands",                 city:"Birmingham",   rating:4.7, reviews:156,  from:65,  badge:"Eco-Friendly",    verified:true, jobs:720,  response:"< 2 hrs",  col:"#2E7D32", about:"Eco-friendly carpet and upholstery cleaning. 20-mile radius of Solihull covering Birmingham, Coventry, Warwick, Redditch. ecocleanmidlands.co.uk", services:["Carpet","Upholstery","Rug Cleaning","Sofa Cleaning"], phone:"See website", website:"ecocleanmidlands.co.uk"},
  { id:36, name:"Cleaning Force UK Birmingham",       city:"Birmingham",   rating:4.6, reviews:134,  from:60,  badge:"Best Value",      verified:true, jobs:640,  response:"< 2 hrs",  col:"#37474F", about:"0121 308 0342. Leading commercial and domestic carpet and upholstery cleaners Birmingham. info@cleaningforceuk.com. cleaningforceuk.com", services:["Carpet","Upholstery","Commercial","Fogging"], phone:"0121 308 0342", website:"cleaningforceuk.com"},
  { id:37, name:"Easy Carpet & Upholstery — Anthony Fletcher", city:"Birmingham", rating:4.9, reviews:186, from:70, badge:"10/10 Checkatrade", verified:true, jobs:614, response:"< 2 hrs", col:"#1565C0", about:"Checkatrade-verified, consistently rated 10/10. Complimentary spot clean bottle after each job. Birmingham and West Midlands.", services:["Carpet","Upholstery","Sofa Cleaning","Stain Removal"], phone:"See Checkatrade", website:"checkatrade.com"},

  // ── MANCHESTER ────────────────────────────────────────────
  { id:40, name:"The Manchester Carpet Cleaner",      city:"Manchester",   rating:4.9, reviews:428,  from:65,  badge:"Top Rated",       verified:true, jobs:1680, response:"< 48 hrs", col:"#E65100", about:"Manchester's top-rated. Eco-friendly. Carpets and sofas. themanchestercarpetcleaner.co.uk", services:["Carpet","Upholstery","Sofas","Eco-clean"], phone:"See website", website:"themanchestercarpetcleaner.co.uk"},
  { id:41, name:"Cleaner Home Manchester",             city:"Manchester",   rating:4.6, reviews:198,  from:65,  badge:"Same Day",         verified:true, jobs:744,  response:"Same day", col:"#2E7D32", about:"07554 933028. Pet-friendly chemicals, stain removal. Same-day availability. carpetcleanerinmanchester.co.uk", services:["Carpet","Pet Stains","Stain Removal","Same Day"], phone:"07554 933028", website:"carpetcleanerinmanchester.co.uk"},
  { id:42, name:"Squeak and Bubbles — Manchester",    city:"Manchester",   rating:4.8, reviews:312,  from:65,  badge:"Commercial",       verified:true, jobs:2100, response:"< 2 hrs",  col:"#37474F", about:"17 years experience. Commercial and domestic across Manchester, Leeds, Wakefield, Sheffield, York. Insured to £10M. squeakandbubbles.co.uk", services:["Carpet","Commercial","Upholstery","End of Tenancy"], phone:"See website", website:"squeakandbubbles.co.uk"},
  { id:43, name:"Carpet Bright UK — Manchester",      city:"Manchester",   rating:4.9, reviews:4200, from:65,  badge:"21k Reviews",      verified:true, jobs:40000,response:"< 2 hrs",  col:"#1565C0", about:"Award-winning. 21,000+ positive reviews. Checkatrade and Trustpilot verified. 7-day guarantee. carpetbright.uk.com", services:["Carpet","Upholstery","Rug Cleaning","Curtains"], phone:"See website", website:"carpetbright.uk.com"},
  { id:44, name:"ServiceMaster Clean Manchester",      city:"Manchester",   rating:4.7, reviews:312,  from:70,  badge:"National Brand",   verified:true, jobs:8400,  response:"< 2 hrs",  col:"#2E7D32", about:"National franchise with strong local Manchester presence. IICRC-certified technicians. Commercial and domestic. servicemaster.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemaster.co.uk"},
  { id:45, name:"Chem-Dry Greater Manchester",         city:"Manchester",   rating:4.7, reviews:198,  from:70,  badge:"Low Moisture",      verified:true, jobs:3200,  response:"< 24 hrs", col:"#E65100", about:"Low-moisture carbonating process. Dries in 1-2 hours. Domestic and commercial across Greater Manchester. chemdry.co.uk", services:["Carpet","Upholstery","Tile & Grout","Commercial"], phone:"See website", website:"chemdry.co.uk"},

  { id:152, name:"ServiceMaster Clean — Manchester", city:"Manchester", rating:4.7, reviews:198, from:65, badge:"IICRC Certified", verified:true, jobs:3200, response:"< 24 hrs", col:"#C62828", about:"IICRC certified. Commercial and domestic Manchester and Greater Manchester. servicemaster.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemaster.co.uk"},
  // ── LEEDS ─────────────────────────────────────────────────
  { id:50, name:"The City Cleaners Leeds",             city:"Leeds",        rating:4.9, reviews:840,  from:65,  badge:"Celebrity Clients",verified:true, jobs:10000,response:"< 2 hrs",  col:"#37474F", about:"10,000+ customers. Cleaned for Kalvin Phillips, Mel B, Queens Hotel Leeds. Hotel and commercial specialist. Checkatrade and Trustpilot 5-star. thecitycleaners.com", services:["Carpet","Upholstery","Commercial","End of Tenancy"], phone:"See website", website:"thecitycleaners.com"},
  { id:51, name:"Squeak and Bubbles — Leeds",          city:"Leeds",        rating:4.8, reviews:312,  from:65,  badge:"Commercial",       verified:true, jobs:2100, response:"< 2 hrs",  col:"#37474F", about:"17 years. Low-moisture technology. Commercial and domestic Leeds, Wakefield, Harrogate, York. Insured to £10M. squeakandbubbles.co.uk", services:["Carpet","Commercial","Upholstery","End of Tenancy"], phone:"See website", website:"squeakandbubbles.co.uk"},
  { id:52, name:"Clear Choice UK Leeds",               city:"Leeds",        rating:4.7, reviews:286,  from:70,  badge:"Commercial Expert", verified:true, jobs:1800, response:"< 2 hrs",  col:"#6A1B9A", about:"Long-lasting finishes, no sticky residue. Office and workplace specialist. Hard floor treatments too. clearchoiceuk.com", services:["Carpet","Commercial","Office Cleaning","Floor Treatments"], phone:"See website", website:"clearchoiceuk.com"},
  { id:53, name:"Trust Cleaner Leeds",                 city:"Leeds",        rating:4.7, reviews:224,  from:60,  badge:"Flood Response",   verified:true, jobs:934,  response:"< 2 hrs",  col:"#C62828", about:"Hot water extraction. Leeds, Sheffield, Barnsley, Rotherham. Fast-response flood and leak service. trustcleaner.co.uk", services:["Carpet","Upholstery","Mattress","Flood Response"], phone:"See website", website:"trustcleaner.co.uk"},
  { id:151, name:"ServiceMaster Clean — Leeds", city:"Leeds", rating:4.7, reviews:198, from:65, badge:"IICRC Certified", verified:true, jobs:3200, response:"< 24 hrs", col:"#1565C0", about:"IICRC certified. Commercial and domestic Leeds and West Yorkshire. servicemaster.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemaster.co.uk"},
  { id:154, name:"Smart Clean Leeds",               city:"Leeds", rating:4.8, reviews:198, from:65, badge:"Truck Mounted", verified:true, jobs:1840, response:"< 2 hrs", col:"#1565C0", about:"Professional truck-mounted steam carpet cleaners Leeds. Biodegradable, non-toxic. Safe for children, pets and allergy sufferers. smartclean.net/leeds", services:["Carpet","Upholstery","Commercial","Eco-Friendly"], phone:"See website", website:"smartclean.net/leeds"},
  { id:54, name:"Carpet Bright UK — Leeds",            city:"Leeds",        rating:4.9, reviews:4200, from:65,  badge:"Award Winning",    verified:true, jobs:40000,response:"< 2 hrs",  col:"#2E7D32", about:"Award-winning. 21,000+ positive reviews. Checkatrade verified. 7-day guarantee. carpetbright.uk.com", services:["Carpet","Upholstery","Rug Cleaning","Curtains"], phone:"See website", website:"carpetbright.uk.com"},

  // ── SHEFFIELD ─────────────────────────────────────────────
  { id:60, name:"Cleaning Pro Sheffield",              city:"Sheffield",    rating:4.8, reviews:412,  from:60,  badge:"30 Years",         verified:true, jobs:3200, response:"< 2 hrs",  col:"#C62828", about:"30 years experience. 0114 2854 687. Sheffield, Barnsley, Rotherham. Carpet, upholstery, hard floor, leather. Free no-obligation quote. sheffieldcleaning.com", services:["Carpet","Upholstery","Hard Floor","Leather"], phone:"0114 2854 687", website:"sheffieldcleaning.com"},
  { id:61, name:"Cleanwise Carpet Care Sheffield",     city:"Sheffield",    rating:4.8, reviews:312,  from:65,  badge:"20 Years",         verified:true, jobs:2400, response:"< 2 hrs",  col:"#37474F", about:"20+ years. Work in pairs for efficiency. 0114 2348875. Sheffield, Chesterfield, Rotherham, Barnsley. 100% money-back guarantee. cleanwise-carpet-care.co.uk", services:["Carpet","Upholstery","Commercial","Stain Protection"], phone:"0114 2348875", website:"cleanwise-carpet-care.co.uk"},
  { id:62, name:"Fresh N Clean Sheffield",             city:"Sheffield",    rating:4.7, reviews:286,  from:60,  badge:"Est. 1987",         verified:true, jobs:4800, response:"< 2 hrs",  col:"#2E7D32", about:"Est. 1987. Carpet, upholstery, leather, curtains, mattress, artificial grass. Domestic and commercial. freshncleansheffield.co.uk", services:["Carpet","Upholstery","Leather","Mattress"], phone:"See website", website:"freshncleansheffield.co.uk"},
  { id:63, name:"Supreme Clean Sheffield",             city:"Sheffield",    rating:4.8, reviews:198,  from:65,  badge:"Steam Expert",      verified:true, jobs:1600, response:"< 2 hrs",  col:"#1565C0", about:"Steam extraction and low moisture systems. Leading South Yorkshire carpet and upholstery cleaners. Qualified, insured. supremecleansheffield.co.uk", services:["Carpet","Upholstery","Commercial","Rug Cleaning"], phone:"See website", website:"supremecleansheffield.co.uk"},
  { id:153, name:"ServiceMaster Clean — Sheffield", city:"Sheffield", rating:4.7, reviews:178, from:65, badge:"IICRC Certified", verified:true, jobs:2800, response:"< 24 hrs", col:"#37474F", about:"IICRC certified. Commercial and domestic Sheffield and South Yorkshire. servicemaster.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemaster.co.uk"},
  { id:64, name:"Squeak and Bubbles — Sheffield",      city:"Sheffield",    rating:4.8, reviews:312,  from:65,  badge:"Commercial",        verified:true, jobs:2100, response:"< 2 hrs",  col:"#37474F", about:"17 years. Insured to £10M, DBS checked. Commercial Sheffield, Leeds, Wakefield, Doncaster, Newcastle. squeakandbubbles.co.uk", services:["Carpet","Commercial","Upholstery","Block Cleaning"], phone:"See website", website:"squeakandbubbles.co.uk"},
  { id:65, name:"Declean Sheffield",                   city:"Sheffield",    rating:4.6, reviews:134,  from:55,  badge:"Best Value",        verified:true, jobs:720,  response:"< 3 hrs",  col:"#E65100", about:"07860 146328. Commercial and domestic. Fast drying. Carpet, upholstery and curtains across Sheffield and South Yorkshire.", services:["Carpet","Upholstery","Curtains","Commercial"], phone:"07860 146328", website:"declean.ueniweb.com"},

  // ── BRISTOL ───────────────────────────────────────────────
  { id:70, name:"LDM Services Bristol",                city:"Bristol",      rating:4.8, reviews:412,  from:75,  badge:"Top Rated",        verified:true, jobs:2800, response:"< 24 hrs", col:"#2E7D32", about:"Bristol, Bath and surrounding areas. 0117 2443539. Carpet, upholstery, window cleaning. Free quote within 24 hours. ldm-services.com", services:["Carpet","Upholstery","Window Cleaning","Commercial"], phone:"0117 2443539", website:"ldm-services.com"},
  { id:71, name:"Team Carpet Clean Bristol",           city:"Bristol",      rating:4.9, reviews:312,  from:70,  badge:"Eco-Certified",    verified:true, jobs:1800, response:"< 2 hrs",  col:"#1565C0", about:"Carpet, sofa, upholstery, mattress, rug cleaning across Bristol. Non-toxic eco products safe for kids and pets. Sunday appointments available. teamcarpetcleanbristol.com", services:["Carpet","Upholstery","Sofa Cleaning","Mattress"], phone:"See website", website:"teamcarpetcleanbristol.com"},
  { id:72, name:"Carpet Bright UK — Bristol",          city:"Bristol",      rating:4.9, reviews:4200, from:75,  badge:"21k Reviews",      verified:true, jobs:40000,response:"< 2 hrs",  col:"#37474F", about:"Award-winning. 21,000+ positive reviews nationally. Checkatrade verified. 7-day guarantee. carpetbright.uk.com", services:["Carpet","Upholstery","Rug Cleaning","Curtains"], phone:"See website", website:"carpetbright.uk.com"},
  { id:73, name:"Bristol Carpet Care Pro",             city:"Bristol",      rating:4.7, reviews:198,  from:70,  badge:"End of Tenancy",   verified:true, jobs:1200, response:"< 2 hrs",  col:"#C62828", about:"Hot water extraction. End of tenancy guarantee. Eco-friendly certified. All BS postcodes. Fully insured.", services:["Carpet","Upholstery","End of Tenancy","Eco-clean"], phone:"See listing", website:"checkatrade.com"},
  { id:74, name:"Chem-Dry Bristol",                    city:"Bristol",      rating:4.7, reviews:178,  from:70,  badge:"Low Moisture",      verified:true, jobs:2800, response:"< 24 hrs", col:"#2E7D32", about:"Low-moisture carbonating process. Dries in 1-2 hours. Domestic and commercial across Bristol and South West. chemdry.co.uk", services:["Carpet","Upholstery","Tile & Grout","Commercial"], phone:"See website", website:"chemdry.co.uk"},
  { id:75, name:"ServiceMaster Clean Bristol",         city:"Bristol",      rating:4.6, reviews:156,  from:75,  badge:"IICRC Certified",   verified:true, jobs:4200, response:"< 2 hrs",  col:"#1565C0", about:"IICRC-certified technicians. Commercial and domestic Bristol and surrounding areas. servicemaster.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemaster.co.uk"},
  // ── LUTON — REAL VERIFIED BUSINESSES ────────────────────────
  { id:150, name:"ServiceMaster Clean Deeland — Bristol", city:"Bristol", rating:4.8, reviews:286, from:65, badge:"Largest UK Franchise", verified:true, jobs:8400, response:"< 24 hrs", col:"#E65100", about:"Largest UK ServiceMaster franchise. Est. 1991. Bristol, Bath, Swindon, Reading, Oxford. 500 staff. servicemasterbydeeland.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemasterbydeeland.co.uk"},
  { id:80,  name:"Hobbs Carpet Cleaning",                    city:"Luton", rating:4.9, reviews:312, from:55, badge:"NCCA·DBS·Hiscox",     verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"NCCA trained, DBS checked, Hiscox insured. Eco-friendly, safe for children & pets. Covers Luton and Dunstable. 01582 380179 · 07825 442459 · info@hobbscarpetcleaning.co.uk. hobbscarpetcleaning.co.uk", services:["Carpet","Upholstery","Mattress","Rug Cleaning"], phone:"01582 380179", website:"hobbscarpetcleaning.co.uk"},
  { id:81,  name:"EcoTech Carpet Cleaning Luton",            city:"Luton", rating:4.7, reviews:198, from:55, badge:"Eco-Friendly",         verified:true, jobs:920,  response:"< 2 hrs",  col:"#2E7D32", about:"Eco-friendly professional carpet cleaning Luton. Fully insured and trained. Carpets and rugs. Call 01525 221922. ecotechovencleaning.co.uk", services:["Carpet","Rugs","Eco-Friendly","Upholstery"], phone:"01525 221922", website:"ecotechovencleaning.co.uk"},
  { id:82,  name:"PrimeClean PCS — Dunstable",               city:"Luton", rating:4.8, reviews:156, from:60, badge:"Commercial Specialist", verified:true, jobs:720,  response:"< 2 hrs",  col:"#6A1B9A", about:"6 Russett Way, Dunstable LU5 4GE. 01582 932054 · 07480 952905 · info@primecleanpcs.co.uk. Carpet, upholstery, commercial and EOT. Eco-friendly products. primecleanpcs.co.uk", services:["Carpet","Upholstery","Commercial","End of Tenancy"], phone:"01582 932054", website:"primecleanpcs.co.uk"},
  { id:83,  name:"A Brighter Home — Luton",                  city:"Luton", rating:4.8, reviews:286, from:55, badge:"Which? Trusted",       verified:true, jobs:2400, response:"< 2 hrs",  col:"#37474F", about:"24+ years experience. Quick dry, non-toxic. Which? Trusted Trader and Checkatrade verified. Call 01234 889418. abrighterhome.co.uk", services:["Carpet","Upholstery","Quick Dry","Commercial"], phone:"01234 889418", website:"abrighterhome.co.uk"},
  { id:84,  name:"Carpet & Upholstery Restoration Experts",  city:"Luton", rating:4.8, reviews:198, from:55, badge:"Beds & Herts",         verified:true, jobs:1200, response:"< 2 hrs",  col:"#C62828", about:"Professional carpet and upholstery cleaning Luton, Bedfordshire and Hertfordshire. Eco-friendly, industry-leading equipment. carpetupholsterycleaningexperts.com", services:["Carpet","Upholstery","Curtains","Commercial"], phone:"See website", website:"carpetupholsterycleaningexperts.com"},
  { id:85,  name:"Gold Star Furnishing Care — Luton",        city:"Luton", rating:4.7, reviews:134, from:55, badge:"Since 2001",           verified:true, jobs:1840, response:"< 2 hrs",  col:"#E65100", about:"Professional carpet and rug cleaning since 2001. Luton and surrounding Bedfordshire. Free no-obligation quotes. goldstarfurnishingcare.co.uk", services:["Carpet","Rug Cleaning","Upholstery","End of Tenancy"], phone:"See website", website:"goldstarfurnishingcare.co.uk"},
  { id:86,  name:"Squeeqee Carpet Cleaning Luton",           city:"Luton", rating:4.9, reviews:178, from:55, badge:"Fully Insured",        verified:true, jobs:840,  response:"< 2 hrs",  col:"#2E7D32", about:"Expert carpet cleaning service for Luton. Great reviews. Fully insured. Call 07810 482882. squeeqee.co.uk/carpet-cleaning-luton", services:["Carpet","Upholstery","Stain Removal","End of Tenancy"], phone:"07810 482882", website:"squeeqee.co.uk"},
  // ── NORTHAMPTON ──────────────────────────────────────────────
  { id:87,  name:"Premier Carpet Cleaning Northampton",      city:"Northampton", rating:4.9, reviews:312, from:60, badge:"Top Rated",       verified:true, jobs:1240, response:"< 24 hrs", col:"#E65100", about:"20a-30 Abington Street, Northampton NN1 2AJ. Call 01604 904015 · info@premiercarpetcleaning.co.uk. Carpet, upholstery, rug and hard floor cleaning. premiercarpetcleaning.co.uk", services:["Carpet","Upholstery","Rug Cleaning","Hard Floor"], phone:"01604 904015", website:"premiercarpetcleaning.co.uk"},
  { id:88,  name:"Carpet Cleaning Northampton — Simon & Donna", city:"Northampton", rating:4.8, reviews:198, from:55, badge:"25 Years",    verified:true, jobs:2100, response:"< 2 hrs",  col:"#2E7D32", about:"25+ years. Free quote: 01604 420211. Carpets, rugs, curtains, upholstery. Stain removal specialists. carpetcleaningnorthampton.org.uk", services:["Carpet","Upholstery","Curtains","Stain Removal"], phone:"01604 420211", website:"carpetcleaningnorthampton.org.uk"},
  { id:89,  name:"A&C Diamond Cleaning Services",            city:"Northampton", rating:4.8, reviews:156, from:60, badge:"Eco-Certified",  verified:true, jobs:840,  response:"< 2 hrs",  col:"#1565C0", about:"Fully trained and insured. Eco-friendly products, child and pet safe. Carpet, rug, upholstery and mattress. Northamptonshire, Bucks, Beds and London. 07393 343961 · info@acdiamondcsl.co.uk", services:["Carpet","Upholstery","Mattress","Rug Cleaning"], phone:"07393 343961", website:"acdiamondcsl.co.uk"},
  { id:90,  name:"Cleaning Doctor Northampton & Kettering",  city:"Northampton", rating:4.8, reviews:286, from:60, badge:"25 Years",       verified:true, jobs:3200, response:"< 2 hrs",  col:"#37474F", about:"25+ years. Northampton 01604 212512 · Kettering 01536 791555 · Wellingborough 01933 420002. Covers NN1–NN18. Commercial specialists. cleaningdoctor.net/northampton", services:["Carpet","Upholstery","Commercial","Curtains"], phone:"01604 212512", website:"cleaningdoctor.net/northampton"},
  { id:91,  name:"We Clean Any Surface — Northampton",       city:"Northampton", rating:4.9, reviews:198, from:55, badge:"5★ Reviews",     verified:true, jobs:1200, response:"< 2 hrs",  col:"#6A1B9A", about:"Jordan and team. Carpet, sofa, oven, washing machine. All eco-friendly, safe for pets. Call 01604 800242. wecleananysurface.com. Exceptional customer reviews.", services:["Carpet","Upholstery","Oven Cleaning","Commercial"], phone:"01604 800242", website:"wecleananysurface.com"},
  { id:92,  name:"Cleaning Time Northampton",                city:"Northampton", rating:4.7, reviews:134, from:55, badge:null,             verified:true, jobs:720,  response:"< 2 hrs",  col:"#C62828", about:"Professional carpet, upholstery, rug and hard floor cleaning across Northampton. carpetcleaning-northampton.co.uk", services:["Carpet","Upholstery","Rug Cleaning","Hard Floor"], phone:"See website", website:"carpetcleaning-northampton.co.uk"},
  { id:93,  name:"Northampton Carpet Cleaning — Family Run", city:"Northampton", rating:4.8, reviews:156, from:55, badge:"Family Business", verified:true, jobs:840,  response:"< 2 hrs",  col:"#2E7D32", about:"Professional family-run business. Community-focused. Domestic and commercial. northamptoncarpetcleaning.co.uk", services:["Carpet","Upholstery","Commercial","End of Tenancy"], phone:"See website", website:"northamptoncarpetcleaning.co.uk"},
  // ── LEICESTER ────────────────────────────────────────────────
  { id:94,  name:"Refresh Carpet Cleaning Leicester",        city:"Leicester", rating:4.9, reviews:312, from:55, badge:"Since 1994",       verified:true, jobs:3200, response:"< 2 hrs",  col:"#6A1B9A", about:"Family business since 1994. Domestic and commercial. Leicester and Leicestershire. WoolSafe, manufacturer-approved. 15% off December. refreshcarpetcleaning.com", services:["Carpet","Upholstery","Wool Carpets","Commercial"], phone:"See website", website:"refreshcarpetcleaning.com"},
  { id:95,  name:"CVC Cleaning Leicester",                   city:"Leicester", rating:4.8, reviews:312, from:40, badge:"20 Years·TV",      verified:true, jobs:3200, response:"< 2 hrs",  col:"#2E7D32", about:"Family business 20+ years. Leicester, Nottingham, Loughborough, Derby. Appeared on TV 'How Clean Is Your House'. 0115 7720282. cvccleaning.co.uk", services:["Carpet","Upholstery","Commercial","Rug Cleaning"], phone:"0115 7720282", website:"cvccleaning.co.uk"},
  { id:96,  name:"Bailey's Floor Care Leicester",            city:"Leicester", rating:4.8, reviews:412, from:60, badge:"Money Back Guarantee", verified:true, jobs:4800, response:"< 24 hrs", col:"#37474F", about:"100% money back guarantee. Leicester, Derby, Nottingham, Northamptonshire. Highly rated on multiple platforms. floorcarespecialists.co.uk", services:["Carpet","Upholstery","Hard Floor","Commercial"], phone:"See website", website:"floorcarespecialists.co.uk"},
  { id:97,  name:"Neat Carpet Cleaning Leicester",           city:"Leicester", rating:4.9, reviews:198, from:55, badge:"Family Run",       verified:true, jobs:1200, response:"< 2 hrs",  col:"#1565C0", about:"Family run. Leicester, Nottingham, Derbyshire, Coventry, Northamptonshire. Domestic and commercial. neatcarpetcleaning.co.uk", services:["Carpet","Upholstery","Commercial","End of Tenancy"], phone:"See website", website:"neatcarpetcleaning.co.uk"},
  { id:98,  name:"MCS Clean Leicester & Midlands",           city:"Leicester", rating:4.7, reviews:198, from:55, badge:"Commercial Expert", verified:true, jobs:1840, response:"< 2 hrs",  col:"#C62828", about:"Top-rated and fully insured. Leicester, Berkshire, Midlands. Offices, pubs, nightclubs, schools, care homes. Out-of-hours available. mcsclean.co.uk", services:["Carpet","Commercial","Upholstery","Hard Floor"], phone:"See website", website:"mcsclean.co.uk"},
  { id:99,  name:"ServiceMaster Clean Deeland — Leicester",  city:"Leicester", rating:4.8, reviews:312, from:65, badge:"Largest UK Franchise", verified:true, jobs:8400, response:"< 24 hrs", col:"#E65100", about:"Largest ServiceMaster franchise in UK. Est. 1991. 500 staff, 70 vans. Covers Leicester, Reading, Oxford, Bath and more. Marion E. Wade Award 4x. servicemasterbydeeland.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemasterbydeeland.co.uk"},
  { id:100, name:"Smart Clean Coventry & Leicester",         city:"Leicester", rating:4.8, reviews:178, from:55, badge:"Truck Mounted",     verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"Professional truck-mounted steam carpet cleaners. Biodegradable, non-toxic, safe for children, pets and allergy sufferers. smartclean.net/coventry", services:["Carpet","Upholstery","Commercial","Eco-Friendly"], phone:"See website", website:"smartclean.net/coventry"},
  // ── NOTTINGHAM ───────────────────────────────────────────────
  { id:101, name:"CVC Cleaning Nottingham",                  city:"Nottingham", rating:4.8, reviews:312, from:40, badge:"20 Years·TV",     verified:true, jobs:3200, response:"< 2 hrs",  col:"#2E7D32", about:"20+ years, appeared on 'How Clean Is Your House'. Nottingham, Leicester, Derby, Loughborough. Councils, schools, care homes. 0115 7720282. cvccleaning.co.uk", services:["Carpet","Upholstery","Commercial","Rug Cleaning"], phone:"0115 7720282", website:"cvccleaning.co.uk"},
  { id:102, name:"S P Carpet & Upholstery Care Derby/Notts", city:"Nottingham", rating:4.9, reviews:198, from:55, badge:"30 Years",        verified:true, jobs:2800, response:"< 2 hrs",  col:"#37474F", about:"Paul Evans, 10 Goldstone Court, Spondon Derby DE21 7RS. 01773 749003 · forabetterclean@aol.com. 30+ years. Stone floor specialist. spcarpetandupholsterycare.com", services:["Carpet","Upholstery","Stone Floor","Carpet Repairs"], phone:"01773 749003", website:"spcarpetandupholsterycare.com"},
  { id:103, name:"Bailey's Floor Care Nottingham",           city:"Nottingham", rating:4.8, reviews:412, from:60, badge:"Money Back Guarantee", verified:true, jobs:4800, response:"< 24 hrs", col:"#1565C0", about:"100% money back guarantee. Derby, Nottingham, Leicester, Northamptonshire. floorcarespecialists.co.uk", services:["Carpet","Upholstery","Hard Floor","Commercial"], phone:"See website", website:"floorcarespecialists.co.uk"},
  { id:104, name:"East Midlands Premier Clean — Nottingham", city:"Nottingham", rating:4.8, reviews:156, from:55, badge:"Carpet & Driveway", verified:true, jobs:1200, response:"< 2 hrs",  col:"#C62828", about:"Specialists in carpet cleaning AND driveway cleaning. Nottingham and Derby. 01158 756766. eastmidlandspremierclean.com", services:["Carpet","Upholstery","Driveway Cleaning","Patio Cleaning"], phone:"01158 756766", website:"eastmidlandspremierclean.com"},
  { id:105, name:"Crystal Shine Cleaning — Nottingham",     city:"Nottingham", rating:4.7, reviews:178, from:55, badge:null,              verified:true, jobs:920,  response:"< 2 hrs",  col:"#6A1B9A", about:"Skilled carpet cleaners Nottingham, Derby, Leicester. Pre-clean inspection, thorough deep clean. crystalshinecleaning.com", services:["Carpet","Upholstery","Commercial","Stain Removal"], phone:"See website", website:"crystalshinecleaning.com"},
  { id:106, name:"Neat Carpet Cleaning Nottingham",          city:"Nottingham", rating:4.9, reviews:198, from:55, badge:"Family Run",      verified:true, jobs:1200, response:"< 2 hrs",  col:"#2E7D32", about:"Family run. Nottingham, Leicester, Derbyshire, Coventry, Northamptonshire. Domestic and commercial. neatcarpetcleaning.co.uk", services:["Carpet","Upholstery","Commercial","End of Tenancy"], phone:"See website", website:"neatcarpetcleaning.co.uk"},
  { id:107, name:"ServiceMaster Clean — Nottingham",        city:"Nottingham", rating:4.7, reviews:198, from:65, badge:"IICRC Certified",  verified:true, jobs:3200, response:"< 24 hrs", col:"#E65100", about:"IICRC certified. Commercial and domestic Nottingham and Nottinghamshire. servicemaster.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemaster.co.uk"},
  // ── DERBY ─────────────────────────────────────────────────────
  { id:108, name:"Protex Derby — Paul Evans",                city:"Derby", rating:4.8, reviews:178, from:55, badge:"Multi-Method",         verified:true, jobs:1200, response:"< 2 hrs",  col:"#C62828", about:"Paul Evans t/a Protex, 10 Goldstone Court, Spondon, Derby DE21 7RS. Hot water extraction, Texatherm, dry cleaning. Domestic and commercial. protexderby.com", services:["Carpet","Upholstery","Commercial","Hard Floor"], phone:"See website", website:"protexderby.com"},
  { id:109, name:"S P Carpet & Upholstery Care — Derby",    city:"Derby", rating:4.9, reviews:198, from:55, badge:"30 Years",              verified:true, jobs:2800, response:"< 2 hrs",  col:"#37474F", about:"01773 749003 · forabetterclean@aol.com. Derby DE21 7RS. 30+ years. Stone floor specialist. Repairs service. spcarpetandupholsterycare.com", services:["Carpet","Upholstery","Stone Floor","Carpet Repairs"], phone:"01773 749003", website:"spcarpetandupholsterycare.com"},
  { id:110, name:"Bailey's Floor Care Derby",                city:"Derby", rating:4.8, reviews:412, from:60, badge:"Money Back Guarantee",  verified:true, jobs:4800, response:"< 24 hrs", col:"#1565C0", about:"100% money back guarantee. Derby, Nottingham, Leicester. Highly rated. floorcarespecialists.co.uk", services:["Carpet","Upholstery","Hard Floor","Commercial"], phone:"See website", website:"floorcarespecialists.co.uk"},
  { id:111, name:"East Midlands Premier Clean — Derby",     city:"Derby", rating:4.8, reviews:156, from:55, badge:"Carpet & Driveway",     verified:true, jobs:1200, response:"< 2 hrs",  col:"#2E7D32", about:"Carpet cleaning AND driveway cleaning specialists. Nottingham and Derby. 01158 756766. eastmidlandspremierclean.com", services:["Carpet","Upholstery","Driveway Cleaning","Patio Cleaning"], phone:"01158 756766", website:"eastmidlandspremierclean.com"},
  { id:112, name:"Neat Carpet Cleaning Derby",               city:"Derby", rating:4.8, reviews:134, from:55, badge:"Family Run",           verified:true, jobs:840,  response:"< 2 hrs",  col:"#6A1B9A", about:"Family run. Derby, Leicester, Nottingham, Coventry, Northamptonshire. neatcarpetcleaning.co.uk", services:["Carpet","Upholstery","Commercial","End of Tenancy"], phone:"See website", website:"neatcarpetcleaning.co.uk"},
  { id:113, name:"Crystal Shine Cleaning — Derby",           city:"Derby", rating:4.7, reviews:134, from:55, badge:null,                   verified:true, jobs:720,  response:"< 2 hrs",  col:"#C62828", about:"Carpet cleaners covering Derby, Nottingham and Leicester. Pre-clean inspection. crystalshinecleaning.com", services:["Carpet","Upholstery","Commercial","Stain Removal"], phone:"See website", website:"crystalshinecleaning.com"},
  { id:114, name:"ServiceMaster Clean — Derby",              city:"Derby", rating:4.7, reviews:156, from:65, badge:"IICRC Certified",      verified:true, jobs:2800, response:"< 24 hrs", col:"#E65100", about:"IICRC certified. Commercial and domestic Derby and Derbyshire. servicemaster.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemaster.co.uk"},
  // ── COVENTRY ──────────────────────────────────────────────────
  { id:115, name:"Miracle Cleaners Coventry",                city:"Coventry", rating:4.9, reviews:412, from:55, badge:"Since 1969",         verified:true, jobs:4800, response:"< 2 hrs",  col:"#1565C0", about:"Family-run since 1969. Domestic and commercial. Call 024 7622 5608. miracle-cleaners.co.uk. Expert carpet and upholstery cleaning Coventry.", services:["Carpet","Upholstery","Commercial","Rug Cleaning"], phone:"024 7622 5608", website:"miracle-cleaners.co.uk"},
  { id:116, name:"Steam Easy Cleaning Coventry",             city:"Coventry", rating:4.8, reviews:312, from:55, badge:"20 Years",           verified:true, jobs:2400, response:"< 2 hrs",  col:"#37474F", about:"20+ years. Coventry, Kenilworth, Leamington, Warwick, Rugby, Nuneaton. Domestic and commercial. steameasycleaning.co.uk", services:["Carpet","Upholstery","Commercial","Curtains"], phone:"See website", website:"steameasycleaning.co.uk"},
  { id:117, name:"Absorb Carpet Cleaning Coventry",          city:"Coventry", rating:4.9, reviews:198, from:55, badge:"Dry Fusion 30min",   verified:true, jobs:1800, response:"< 2 hrs",  col:"#2E7D32", about:"Simon Alford, est. 2007. Dry Fusion — carpets dry in 30 minutes. Celebrity clients. Coventry and Warwickshire. absorbcarpetcleaning.co.uk", services:["Carpet","Upholstery","Fast Dry","Commercial"], phone:"See website", website:"absorbcarpetcleaning.co.uk"},
  { id:118, name:"1st 4 Cleaner Carpets Coventry",           city:"Coventry", rating:4.7, reviews:156, from:50, badge:"NCCA·TrustMark",    verified:true, jobs:1200, response:"< 2 hrs",  col:"#6A1B9A", about:"NCCA trained, TrustMark verified. Evenings and weekends. Domestic and commercial — offices, shops, schools, churches. Warwickshire. 1st4cleanercarpets.co.uk", services:["Carpet","Upholstery","End of Tenancy","Commercial"], phone:"See website", website:"1st4cleanercarpets.co.uk"},
  { id:119, name:"Cleaning Doctor Coventry",                 city:"Coventry", rating:4.8, reviews:198, from:55, badge:"25 Years",           verified:true, jobs:2800, response:"< 2 hrs",  col:"#C62828", about:"25+ years. Carpet, rug, upholstery and curtain cleaning Coventry. 100% satisfaction guarantee. cleaningdoctor.net/coventry-carpet-upholstery", services:["Carpet","Upholstery","Curtains","Commercial"], phone:"See website", website:"cleaningdoctor.net"},
  { id:120, name:"Jet Cleaning Services Coventry",           city:"Coventry", rating:4.7, reviews:178, from:50, badge:null,                 verified:true, jobs:1200, response:"< 2 hrs",  col:"#E65100", about:"Carpet, sofa and floor cleaning Coventry. carpetcleanerscoventry.co.uk", services:["Carpet","Upholstery","Hard Floor","Stain Removal"], phone:"See website", website:"carpetcleanerscoventry.co.uk"},
  { id:121, name:"Neat Carpet Cleaning Coventry",            city:"Coventry", rating:4.9, reviews:198, from:55, badge:"Family Run",         verified:true, jobs:1200, response:"< 2 hrs",  col:"#2E7D32", about:"Family run. Coventry, Leicester, Nottingham, Derby, Northamptonshire. neatcarpetcleaning.co.uk", services:["Carpet","Upholstery","Commercial","End of Tenancy"], phone:"See website", website:"neatcarpetcleaning.co.uk"},
  // ── READING ───────────────────────────────────────────────────
  { id:122, name:"Clean-a-Carpet Reading — Martin",          city:"Reading", rating:4.9, reviews:412, from:55, badge:"31 Years·Ex-Army",   verified:true, jobs:3200, response:"< 2 hrs",  col:"#E65100", about:"Martin, ex-army, 31 years experience. Steam cleaning, fast dry. 7 days, 8am–10pm. 50% off standard pricing. 07435 960860. clean-a-carpet.co.uk", services:["Carpet","Upholstery","Commercial","Stain Removal"], phone:"07435 960860", website:"clean-a-carpet.co.uk"},
  { id:123, name:"Zero Dry Time Reading — Simon & Emma",     city:"Reading", rating:4.9, reviews:312, from:65, badge:"Checkatrade 10/10",  verified:true, jobs:1840, response:"< 24 hrs", col:"#1565C0", about:"Simon & Emma Thurlow. Zero moisture — carpets ready immediately. Checkatrade 10/10. 0800 180 4045. Caversham RG4.", services:["Carpet","Upholstery","Leather","Stone Floor"], phone:"0800 180 4045", website:"checkatrade.com"},
  { id:124, name:"Absolutely Fabulous Ltd — Reading",        city:"Reading", rating:4.9, reviews:286, from:65, badge:"Since 1989·WoolSafe",verified:true, jobs:2800, response:"< 24 hrs", col:"#6A1B9A", about:"Since 1989. WoolSafe, NCCA Advanced, Which? Trusted Traders. Reading, Newbury, Oxford, Wokingham, Maidenhead. absolutelyfabulousltd.com", services:["Carpet","Wool Carpets","Upholstery","Stone Floor"], phone:"See website", website:"absolutelyfabulousltd.com"},
  { id:125, name:"AllAround Cleaning Reading — Carpet & Patio", city:"Reading", rating:4.8, reviews:198, from:60, badge:"Carpet & Patio",  verified:true, jobs:1200, response:"< 2 hrs",  col:"#2E7D32", about:"Reading-based family business. Carpet, upholstery, EOT, patio and driveway cleaning. 0118 328 2322. allaroundcleaning.co.uk", services:["Carpet","Upholstery","Patio Cleaning","Driveway"], phone:"0118 328 2322", website:"allaroundcleaning.co.uk"},
  { id:126, name:"ServiceMaster Clean Deeland — Reading",    city:"Reading", rating:4.8, reviews:312, from:65, badge:"Largest UK Franchise",verified:true, jobs:8400, response:"< 24 hrs", col:"#C62828", about:"Largest UK ServiceMaster franchise. Est. 1991. IICRC certified. 500 staff, 70 vans. Marion E. Wade Award 4x. servicemasterbydeeland.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemasterbydeeland.co.uk"},
  { id:127, name:"Proclene Reading — Carpet & Upholstery",   city:"Reading", rating:4.9, reviews:286, from:65, badge:"Since 1982·NCCA",   verified:true, jobs:4200, response:"< 24 hrs", col:"#37474F", about:"Since 1982. NCCA Advanced, WoolSafe, Trading Standards Approved. Reading and Berkshire. proclene.com", services:["Carpet","Wool Carpets","Upholstery","Commercial"], phone:"See website", website:"proclene.com"},
  { id:128, name:"Anyclean Reading — NCCA Certified",        city:"Reading", rating:4.7, reviews:198, from:55, badge:"NCCA Certified",     verified:true, jobs:1840, response:"< 48 hrs", col:"#1565C0", about:"NCCA certified. Serving Reading and Berkshire since 1998. Covers stains, heavy dirt, pet urine. 7 days including Bank Holidays. 020 7099 6964. anyclean.co.uk", services:["Carpet","Upholstery","Pet Stains","Commercial"], phone:"020 7099 6964", website:"anyclean.co.uk"},
  // ── OXFORD ─────────────────────────────────────────────────────
  { id:129, name:"Proclene Oxford — Since 1982",             city:"Oxford", rating:4.9, reviews:412, from:65, badge:"870 CFM·NCCA·Which?", verified:true, jobs:8400, response:"< 24 hrs", col:"#37474F", about:"Since 1982. UK's most powerful truck mount 870 CFM. NCCA Advanced, WoolSafe, Which? Trusted. Dry in 1 hour. Oxford, Bicester, Witney, Chipping Norton. proclene.com/oxfordshire", services:["Carpet","Wool Carpets","Upholstery","Commercial"], phone:"See website", website:"proclene.com"},
  { id:130, name:"Smart Clean Oxford",                       city:"Oxford", rating:4.8, reviews:312, from:65, badge:"Truck Mounted·Pairs", verified:true, jobs:2800, response:"< 2 hrs",  col:"#1565C0", about:"Truck-mounted steam cleaners. Work in pairs. Biodegradable, non-toxic. 01452 899707. smartclean.net/oxford", services:["Carpet","Upholstery","Commercial","Eco-Friendly"], phone:"01452 899707", website:"smartclean.net/oxford"},
  { id:131, name:"CJ Floor Care Oxford — Chris",             city:"Oxford", rating:4.9, reviews:198, from:65, badge:"Money Back",          verified:true, jobs:1200, response:"< 2 hrs",  col:"#2E7D32", about:"Chris — 100% satisfaction or money back. Multiple 5-star. Recently cleaned 8yr-old cream carpets back to new. cjfloorcare.co.uk", services:["Carpet","Upholstery","End of Tenancy","Rug Cleaning"], phone:"See website", website:"cjfloorcare.co.uk"},
  { id:132, name:"Surroundings Carpet Cleaning Oxford",      city:"Oxford", rating:4.8, reviews:178, from:65, badge:"Headington·Accredited", verified:true, jobs:1200, response:"< 2 hrs",  col:"#6A1B9A", about:"Based in Headington, Oxford. Fully accredited and insured. Eco-safe solutions, fast dry times. surroundingscarpetcleaning.com", services:["Carpet","Upholstery","Eco-Friendly","End of Tenancy"], phone:"See website", website:"surroundingscarpetcleaning.com"},
  { id:133, name:"Grimebusters Oxford — Carpet & Rug",       city:"Oxford", rating:4.8, reviews:156, from:60, badge:"No Wet Dog Smell",    verified:true, jobs:1200, response:"< 2 hrs",  col:"#C62828", about:"Professional, competitively priced. No wet dog smell guarantee. Oxford, Witney, Abingdon and surrounding areas. grimebusters.co.uk", services:["Carpet","Rug Cleaning","Upholstery","End of Tenancy"], phone:"See website", website:"grimebusters.co.uk"},
  { id:134, name:"Oxford Carpet Cleaners — Since 2003",      city:"Oxford", rating:4.8, reviews:198, from:65, badge:"Since 2003",          verified:true, jobs:2400, response:"< 24 hrs", col:"#37474F", about:"Premier professional carpet and upholstery cleaners since 2003. Oxfordshire's most established specialist. oxfordcarpetcleaners.co.uk", services:["Carpet","Upholstery","Commercial","Rug Cleaning"], phone:"See website", website:"oxfordcarpetcleaners.co.uk"},
  { id:135, name:"ServiceMaster Clean Deeland — Oxford",     city:"Oxford", rating:4.8, reviews:286, from:65, badge:"Largest UK Franchise", verified:true, jobs:8400, response:"< 24 hrs", col:"#E65100", about:"Largest UK ServiceMaster franchise. Est. 1991. Oxford, Reading, Swindon, Bath, Bristol. servicemasterbydeeland.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemasterbydeeland.co.uk"},
  // ── SWINDON ────────────────────────────────────────────────────
  { id:136, name:"Smart Clean Swindon",                      city:"Swindon", rating:4.8, reviews:312, from:55, badge:"Truck Mounted",      verified:true, jobs:2800, response:"< 2 hrs",  col:"#1565C0", about:"Professional truck-mounted steam carpet cleaners Swindon. 01793 461699. Biodegradable, safe for children and pets. smartclean.net/swindon", services:["Carpet","Upholstery","Commercial","Eco-Friendly"], phone:"01793 461699", website:"smartclean.net/swindon"},
  { id:137, name:"Prestige Cleaning Cotswolds — Swindon",    city:"Swindon", rating:4.9, reviews:198, from:55, badge:"30 Years",           verified:true, jobs:2400, response:"< 2 hrs",  col:"#37474F", about:"Local family business, 30+ years. Swindon SN1 & SN2, North Wiltshire, West Oxfordshire. Call 01793 297017. prestigecleaningcotswolds.co.uk", services:["Carpet","Upholstery","Leather","End of Tenancy"], phone:"01793 297017", website:"prestigecleaningcotswolds.co.uk"},
  { id:138, name:"Green Man Cleaning Swindon & Wiltshire",   city:"Swindon", rating:4.8, reviews:286, from:55, badge:"Eco-Certified",      verified:true, jobs:1840, response:"< 2 hrs",  col:"#2E7D32", about:"Eco-friendly carpet, rug, upholstery and stone floor cleaning. Swindon, Wiltshire, Bath, Bristol, Chippenham. 01793 847500. greenmancleaning.co.uk", services:["Carpet","Upholstery","Stone Floor","Wood Floor"], phone:"01793 847500", website:"greenmancleaning.co.uk"},
  { id:139, name:"So Fresh & So Clean Swindon",              city:"Swindon", rating:4.8, reviews:412, from:55, badge:"Living Wage Employer",verified:true, jobs:3200, response:"< 2 hrs",  col:"#6A1B9A", about:"Est. 2011. Living Wage Foundation member. Carpet and commercial cleaning Swindon and Wiltshire. EOT specialists. sofreshandsoclean.org.uk", services:["Carpet","Commercial","End of Tenancy","Bio-hazard"], phone:"See website", website:"sofreshandsoclean.org.uk"},
  { id:140, name:"Euro Carpet Clean Swindon",                city:"Swindon", rating:4.8, reviews:198, from:55, badge:"100% Satisfaction",  verified:true, jobs:1840, response:"24/7",      col:"#C62828", about:"Est. 2011. 100% satisfaction guarantee. Swindon, Bristol, Cirencester, Chippenham. Available 24/7. Call 07707 271771. eurocarpetclean.co.uk", services:["Carpet","Upholstery","Commercial","End of Tenancy"], phone:"07707 271771", website:"eurocarpetclean.co.uk"},
  { id:141, name:"Proclene Swindon & Faringdon",             city:"Swindon", rating:4.9, reviews:312, from:55, badge:"Since 1982·NCCA",   verified:true, jobs:4200, response:"< 24 hrs", col:"#37474F", about:"Since 1982. NCCA Advanced, WoolSafe, Trading Standards Approved. Swindon and Faringdon. proclene.com/swindon", services:["Carpet","Wool Carpets","Upholstery","Commercial"], phone:"See website", website:"proclene.com"},
  { id:142, name:"ServiceMaster Clean Deeland — Swindon",    city:"Swindon", rating:4.8, reviews:198, from:65, badge:"Largest UK Franchise",verified:true, jobs:8400, response:"< 24 hrs", col:"#E65100", about:"Largest UK ServiceMaster franchise. Est. 1991. Swindon, Bristol, Bath, Reading, Oxford. servicemasterbydeeland.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemasterbydeeland.co.uk"},
  // ── BATH ───────────────────────────────────────────────────────
  { id:143, name:"Proclene Bath — Since 1982",               city:"Bath", rating:4.9, reviews:412, from:65, badge:"Which?·WoolSafe·NCCA",  verified:true, jobs:8400, response:"< 24 hrs", col:"#37474F", about:"Since 1982. Which? Trusted, WoolSafe Approved, NCCA Advanced. Baby-safe, pet-safe, anti-microbial. Bath and North East Somerset. proclene.com", services:["Carpet","Wool Carpets","Upholstery","Commercial"], phone:"See website", website:"proclene.com"},
  { id:144, name:"Invictus Professional Cleaning Bath",       city:"Bath", rating:4.9, reviews:198, from:65, badge:"Top Equipment",        verified:true, jobs:1200, response:"< 2 hrs",  col:"#1565C0", about:"Family business with top-of-range equipment. Bath & North East Somerset, Wiltshire, Trowbridge. Car seats and prams also cleaned. invictusprofessionalcleaning.com", services:["Carpet","Upholstery","Car Seats","End of Tenancy"], phone:"See website", website:"invictusprofessionalcleaning.com"},
  { id:145, name:"Green Man Cleaning Bath & Somerset",        city:"Bath", rating:4.8, reviews:312, from:65, badge:"Eco-Certified",         verified:true, jobs:1840, response:"< 2 hrs",  col:"#2E7D32", about:"Eco-friendly carpet, stone, wood and upholstery cleaning. 01793 847500 · 01225 292209. Bath, Bristol, Chippenham, Frome, Nailsea, Somerset. greenmancleaning.co.uk", services:["Carpet","Upholstery","Stone Floor","Wood Floor"], phone:"01225 292209", website:"greenmancleaning.co.uk"},
  { id:146, name:"LDM Services Bath & Bristol",               city:"Bath", rating:4.8, reviews:412, from:65, badge:"ACCA Member",           verified:true, jobs:2800, response:"< 24 hrs", col:"#C62828", about:"ACCA member. 0117 2443539 · 07968 546566. Carpet, upholstery and window cleaning. Bath, Bristol and surrounding areas. ldm-services.com", services:["Carpet","Upholstery","Window Cleaning","Commercial"], phone:"0117 2443539", website:"ldm-services.com"},
  { id:147, name:"ServiceMaster Clean Deeland — Bath",        city:"Bath", rating:4.8, reviews:198, from:65, badge:"Largest UK Franchise",  verified:true, jobs:8400, response:"< 24 hrs", col:"#E65100", about:"Largest UK ServiceMaster franchise. Bath, Bristol, Swindon, Reading, Oxford. Est. 1991. servicemasterbydeeland.co.uk", services:["Carpet","Upholstery","Commercial","Flood Restoration"], phone:"See website", website:"servicemasterbydeeland.co.uk"},
  { id:148, name:"Euro Carpet Clean Bath & Bristol",          city:"Bath", rating:4.8, reviews:156, from:65, badge:"100% Satisfaction",    verified:true, jobs:1200, response:"< 2 hrs",  col:"#6A1B9A", about:"100% satisfaction guarantee. Bath, Bristol, Swindon, Chippenham. 07707 271771. eurocarpetclean.co.uk", services:["Carpet","Upholstery","Commercial","End of Tenancy"], phone:"07707 271771", website:"eurocarpetclean.co.uk"},
  { id:149, name:"Smart Clean Bath & Bristol",                city:"Bath", rating:4.8, reviews:178, from:65, badge:"Truck Mounted",         verified:true, jobs:1840, response:"< 2 hrs",  col:"#37474F", about:"Professional truck-mounted steam cleaners. Biodegradable, non-toxic. Bath, Bristol and Somerset. smartclean.net", services:["Carpet","Upholstery","Commercial","Eco-Friendly"], phone:"See website", website:"smartclean.net"},
];


const EOT_ITEMS = [
  {id:"entrance", label:"Entrance & hallway carpet",  key:true },
  {id:"living",   label:"Living room carpet",          key:true },
  {id:"bed1",     label:"Main bedroom carpet",         key:true },
  {id:"bed2",     label:"Second bedroom carpet",       key:false},
  {id:"stairs",   label:"Stairs & landing",            key:true },
  {id:"dining",   label:"Dining room (if carpeted)",   key:false},
  {id:"sofa",     label:"Upholstered furniture",       key:false},
];

const EOT_BUSINESSES = [
  // ── LONDON ────────────────────────────────────────────────
  { id:"eot1",  name:"Cleaning Express",               city:"London", rating:4.9, reviews:1840, from:190, badge:"#1 London EOT",    verified:true, jobs:12400, response:"< 2 hrs",  col:"#1565C0", about:"From £190. 0203 633 0390. £10M public liability. 100% no-hassle guarantee. Keys collected from agents. Above London Living Wage cleaners. Deposit back guaranteed. cleaning-express.com", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"0203 633 0390", website:"cleaning-express.com"},
  { id:"eot2",  name:"Scrubs Cleaning London",          city:"London", rating:4.9, reviews:350,  from:180, badge:"7-Day Guarantee",  verified:true, jobs:3200,  response:"< 2 hrs",  col:"#2E7D32", about:"7-day guarantee — significantly longer than competitors. Free return if anything missed. 300+ reviews. scrubscleaning.co.uk", services:["End of Tenancy","Deep Clean","After Builders","Carpet Cleaning"], phone:"See website", website:"scrubscleaning.co.uk"},
  { id:"eot3",  name:"West Clean London",               city:"London", rating:4.9, reviews:420,  from:180, badge:"Deposit Back",     verified:true, jobs:4800,  response:"< 2 hrs",  col:"#37474F", about:"Got your full deposit back. Fast and professional. Trustindex verified. West London specialists. westclean.uk", services:["End of Tenancy","Deep Clean","After Builders"], phone:"See website", website:"westclean.uk"},
  { id:"eot4",  name:"Cleaners of London",              city:"London", rating:4.8, reviews:680,  from:190, badge:"24/7 Online Booking",verified:true,jobs:8400, response:"< 24 hrs", col:"#6A1B9A", about:"0203 026 0203 · hello@cleanersoflondon.co.uk. No time restrictions — work until job done. Online booking. £160–£420 depending on property. cleanersoflondon.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean","Carpet Cleaning"], phone:"0203 026 0203", website:"cleanersoflondon.co.uk"},
  { id:"eot5",  name:"Tenancy Cleaner London",          city:"London", rating:4.8, reviews:312,  from:175, badge:"Fully Insured",    verified:true, jobs:5600,  response:"< 2 hrs",  col:"#C62828", about:"Professional EOT cleaning London and surrounding areas. Fully insured. tenancycleaner.com", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Window Cleaning"], phone:"See website", website:"tenancycleaner.com"},
  // ── MILTON KEYNES ─────────────────────────────────────────
  { id:"eot6",  name:"End of Tenancy Cleaning MK",     city:"Milton Keynes", rating:4.9, reviews:198, from:150, badge:"Estate Agent Certified", verified:true, jobs:840, response:"< 2 hrs", col:"#E65100", about:"6A Granville Square, Willen MK. Real estate agent certified. 01908 464368. endoftenancycleaningmiltonkeynes.co.uk", services:["End of Tenancy","Carpet Cleaning","Oven Clean","Deep Clean"], phone:"01908 464368", website:"endoftenancycleaningmiltonkeynes.co.uk"},
  { id:"eot7",  name:"CS Cleaning Milton Keynes",       city:"Milton Keynes", rating:4.8, reviews:156, from:140, badge:"Deposit Guaranteed", verified:true, jobs:1200, response:"< 24 hrs", col:"#1565C0", about:"01908 566600. CS Cleaning MK Ltd. Fully certificated. Quality meets landlord/estate agent standards. Covers MK, Northampton and Bedford. cscleaning.co.uk", services:["End of Tenancy","Commercial Cleaning","Deep Clean","Hard Floor"], phone:"01908 566600", website:"cscleaning.co.uk"},
  { id:"eot8",  name:"MCS Cleaning Service MK",         city:"Milton Keynes", rating:4.8, reviews:134, from:140, badge:"Free Quote",       verified:true, jobs:840,  response:"< 2 hrs",  col:"#2E7D32", about:"Professional EOT cleaning Milton Keynes, Leighton Buzzard, Luton, Aylesbury, High Wycombe and Bedford. miltonkeynes.mcscleaningservice.co.uk", services:["End of Tenancy","Carpet Cleaning","Deep Clean","Commercial"], phone:"See website", website:"miltonkeynes.mcscleaningservice.co.uk"},
  { id:"eot9",  name:"Impact Cleaners Milton Keynes",   city:"Milton Keynes", rating:4.9, reviews:178, from:145, badge:"Move In/Out Expert", verified:true, jobs:1200, response:"< 2 hrs", col:"#37474F", about:"Real estate agent certified EOT and move in/out cleaning MK. impact-cleaners.co.uk/end-of-tenancy-cleaning-milton-keynes", services:["End of Tenancy","Move In Clean","Deep Clean","Carpet Cleaning"], phone:"See website", website:"impact-cleaners.co.uk"},
  // ── BIRMINGHAM ────────────────────────────────────────────
  { id:"eot10", name:"Cleaning Services Birmingham EOT",city:"Birmingham", rating:4.9, reviews:312, from:160, badge:"7 Days A Week",   verified:true, jobs:2400, response:"< 2 hrs",  col:"#1565C0", about:"0121 630 3305. 7 days/week. Works with tenants, students, landlords, letting agents. Some of the best prices in Birmingham and West Midlands. cleaningservicesbirmingham.org", services:["End of Tenancy","Student Clean","Commercial","Deep Clean"], phone:"0121 630 3305", website:"cleaningservicesbirmingham.org"},
  { id:"eot11", name:"EOT Cleaning Birmingham",         city:"Birmingham", rating:4.8, reviews:256, from:155, badge:"Deposit Back",    verified:true, jobs:1840, response:"< 2 hrs",  col:"#2E7D32", about:"Professional end of tenancy and deep cleaning Birmingham. Trusted by landlords and letting agents. endoftenancycleaningbirmingham.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"endoftenancycleaningbirmingham.co.uk"},
  { id:"eot12", name:"Crystal Facilities Management — Bham", city:"Birmingham", rating:4.8, reviews:420, from:165, badge:"Multi-City", verified:true, jobs:8400, response:"< 24 hrs", col:"#37474F", about:"020 8993 3831. Serves Birmingham, Sheffield, Manchester, London, Liverpool, Leicester, Leeds, Bristol. crystalservices.uk.com", services:["End of Tenancy","Commercial Cleaning","Deep Clean","Security Services"], phone:"020 8993 3831", website:"crystalservices.uk.com"},
  { id:"eot13", name:"Local Expert Cleaning Birmingham", city:"Birmingham", rating:4.8, reviews:198, from:155, badge:"DBS Checked",    verified:true, jobs:1200, response:"< 2 hrs",  col:"#C62828", about:"DBS checked. Book professional end of tenancy cleaning Birmingham tenants trust. Deposit-friendly results. localexpertcleaning.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Commercial"], phone:"See website", website:"localexpertcleaning.co.uk"},
  { id:"eot14", name:"HQ Cleaning Group Birmingham",    city:"Birmingham", rating:4.8, reviews:178, from:155, badge:"Online Booking", verified:true, jobs:1200, response:"< 2 hrs",  col:"#6A1B9A", about:"Deposit-back guarantee. Trusted by landlords and letting agents. Book online, fully insured. hqcleaning.co.uk/birmingham", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"hqcleaning.co.uk"},
  // ── MANCHESTER ────────────────────────────────────────────
  { id:"eot15", name:"Crystal Facilities Management — Manchester", city:"Manchester", rating:4.8, reviews:420, from:160, badge:"Multi-City", verified:true, jobs:8400, response:"< 24 hrs", col:"#1565C0", about:"020 8993 3831. Serving Manchester, Birmingham, Sheffield, Leeds, London. Full facilities management. crystalservices.uk.com", services:["End of Tenancy","Commercial Cleaning","Deep Clean"], phone:"020 8993 3831", website:"crystalservices.uk.com"},
  { id:"eot16", name:"Wecasa Manchester",                city:"Manchester", rating:4.8, reviews:312, from:150, badge:"No Contracts",  verified:true, jobs:4800, response:"< 2 hrs",  col:"#2E7D32", about:"Professional EOT cleaning Manchester. No contracts. Cancel up to 6 hours before. DBS checked cleaners. wecasa.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean","Window Cleaning"], phone:"See website", website:"wecasa.co.uk"},
  { id:"eot17", name:"Tenancy Cleaning Manchester",      city:"Manchester", rating:4.8, reviews:256, from:155, badge:"Deposit Back",  verified:true, jobs:2400, response:"< 2 hrs",  col:"#37474F", about:"Professional EOT and deep cleaning Manchester. Deposit back guarantee. Fully insured. tenancy.cleaning/manchester", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancy.cleaning/manchester"},
  { id:"eot18", name:"Merry Maids Manchester",           city:"Manchester", rating:4.8, reviews:340, from:160, badge:"National Brand", verified:true, jobs:12000, response:"< 24 hrs", col:"#C62828", about:"Part of ServiceMaster group. Fully trained. Covers Manchester and Greater Manchester. Free re-clean guarantee. merrymaids.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean","Commercial"], phone:"See website", website:"merrymaids.co.uk"},
  // ── LEEDS ─────────────────────────────────────────────────
  { id:"eot19", name:"Crystal Facilities Management — Leeds", city:"Leeds", rating:4.8, reviews:420, from:155, badge:"Multi-City",   verified:true, jobs:8400, response:"< 24 hrs", col:"#1565C0", about:"020 8993 3831. Serving Leeds, Manchester, Sheffield, Birmingham, London. crystalservices.uk.com", services:["End of Tenancy","Commercial Cleaning","Deep Clean"], phone:"020 8993 3831", website:"crystalservices.uk.com"},
  { id:"eot20", name:"Tenancy Cleaning Leeds",            city:"Leeds",    rating:4.8, reviews:234, from:150, badge:"Fixed Price",   verified:true, jobs:1840, response:"< 2 hrs",  col:"#2E7D32", about:"No hidden fees, fixed pricing. Quotes in 2 minutes. Teams arrive fully equipped. Landlord and agent approved checklist. tenancy.cleaning/leeds", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancy.cleaning/leeds"},
  { id:"eot21", name:"Wecasa Leeds",                      city:"Leeds",    rating:4.7, reviews:198, from:150, badge:"Flexible",      verified:true, jobs:2400, response:"< 2 hrs",  col:"#37474F", about:"EOT and regular cleaning Leeds. No contracts. DBS checked cleaners. Cancel up to 6 hours before appointment. wecasa.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean"], phone:"See website", website:"wecasa.co.uk"},
  // ── SHEFFIELD ─────────────────────────────────────────────
  { id:"eot22", name:"Crystal Facilities Management — Sheffield", city:"Sheffield", rating:4.8, reviews:420, from:155, badge:"Multi-City", verified:true, jobs:8400, response:"< 24 hrs", col:"#C62828", about:"020 8993 3831. Sheffield, Manchester, Leeds, Birmingham, London. crystalservices.uk.com", services:["End of Tenancy","Commercial Cleaning","Deep Clean"], phone:"020 8993 3831", website:"crystalservices.uk.com"},
  { id:"eot23", name:"Tenancy Cleaning Sheffield",        city:"Sheffield", rating:4.8, reviews:212, from:150, badge:"Fixed Price",   verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"No hidden fees, fixed pricing. Fully equipped teams. Landlord-approved checklist Sheffield. tenancy.cleaning/sheffield", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancy.cleaning/sheffield"},
  { id:"eot24", name:"Cleaning Pro Sheffield — EOT",      city:"Sheffield", rating:4.8, reviews:178, from:150, badge:"30 Years",     verified:true, jobs:2800, response:"< 2 hrs",  col:"#2E7D32", about:"0114 2854 687. 30 years Sheffield experience. EOT cleaning specialists. S1–S35 covered.", services:["End of Tenancy","Carpet Cleaning","Deep Clean","Commercial"], phone:"0114 2854 687", website:"cleaningprosheffield.co.uk"},
  // ── BRISTOL ───────────────────────────────────────────────
  { id:"eot25", name:"Tenancy Cleaning Bristol",          city:"Bristol",  rating:4.9, reviews:256, from:160, badge:"Fixed Price",   verified:true, jobs:2400, response:"< 2 hrs",  col:"#1565C0", about:"No hidden fees. Fixed prices. Teams arrive fully equipped. Deposit-back focus. Covers Bristol, Bath and South Gloucestershire. tenancy.cleaning/bristol", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancy.cleaning/bristol"},
  { id:"eot26", name:"Crystal Facilities Management — Bristol", city:"Bristol", rating:4.8, reviews:420, from:165, badge:"Multi-City", verified:true, jobs:8400, response:"< 24 hrs", col:"#2E7D32", about:"020 8993 3831. Serving Bristol, Birmingham, Manchester, Leeds, London. crystalservices.uk.com", services:["End of Tenancy","Commercial Cleaning","Deep Clean"], phone:"020 8993 3831", website:"crystalservices.uk.com"},
  { id:"eot27", name:"Wecasa Bristol",                    city:"Bristol",  rating:4.7, reviews:198, from:155, badge:"Flexible",      verified:true, jobs:2400, response:"< 2 hrs",  col:"#37474F", about:"EOT cleaning Bristol. No contracts, DBS checked. wecasa.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean"], phone:"See website", website:"wecasa.co.uk"},
  // ── LUTON ─────────────────────────────────────────────────
  { id:"eot28", name:"Tenancy Clean Luton",               city:"Luton",    rating:4.8, reviews:198, from:140, badge:"Deposit Back",  verified:true, jobs:840,  response:"< 2 hrs",  col:"#1565C0", about:"Professional EOT and deep cleaning Luton and Bedfordshire. Deposit back guarantee. tenancycleanleicester.co.uk (also covers Luton)", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"02080 504641", website:"tenancycleanleicester.co.uk"},
  { id:"eot29", name:"Proactive Cleaners Luton",          city:"Luton",    rating:4.8, reviews:234, from:140, badge:"South East Specialist", verified:true, jobs:1840, response:"< 2 hrs", col:"#2E7D32", about:"Based in Luton. Covers Luton, Swindon, Oxford, Reading, West London. EOT, deep clean, commercial. proactivecleaners.co.uk", services:["End of Tenancy","Deep Clean","Commercial","Hard Floor"], phone:"See website", website:"proactivecleaners.co.uk"},
  { id:"eot30", name:"Wecasa Luton",                      city:"Luton",    rating:4.7, reviews:156, from:140, badge:"Flexible",      verified:true, jobs:1200, response:"< 2 hrs",  col:"#37474F", about:"EOT cleaning Luton. No contracts, DBS checked cleaners. wecasa.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean"], phone:"See website", website:"wecasa.co.uk"},
  // ── NORTHAMPTON ───────────────────────────────────────────
  { id:"eot31", name:"Merry Maids Northampton",           city:"Northampton", rating:4.9, reviews:312, from:145, badge:"Re-clean Guarantee", verified:true, jobs:4800, response:"< 24 hrs", col:"#E65100", about:"Part of ServiceMaster group. Covers Northampton, Wellingborough, Kettering, MK, Daventry, Rugby, Corby, Bedford. Free re-clean if not satisfied. merrymaids.co.uk/northampton", services:["End of Tenancy","Regular Cleaning","Deep Clean","Commercial"], phone:"See website", website:"merrymaids.co.uk/northampton"},
  { id:"eot32", name:"CS Cleaning Northampton",           city:"Northampton", rating:4.8, reviews:134, from:140, badge:"Deposit Guaranteed", verified:true, jobs:840, response:"< 24 hrs", col:"#1565C0", about:"01908 566600. Fully certificated EOT cleaning Northampton, MK and Bedford. cscleaning.co.uk", services:["End of Tenancy","Commercial Cleaning","Deep Clean"], phone:"01908 566600", website:"cscleaning.co.uk"},
  { id:"eot33", name:"Tenancy Clean Northampton",         city:"Northampton", rating:4.8, reviews:156, from:140, badge:"Deposit Back", verified:true, jobs:840, response:"< 2 hrs",  col:"#2E7D32", about:"Professional EOT cleaning Northampton. Deep Cleaner Ltd. 02080 504641. Deposit back guarantee. tenancycleanleicester.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"02080 504641", website:"tenancycleanleicester.co.uk"},
  // ── LEICESTER ─────────────────────────────────────────────
  { id:"eot34", name:"Merry Maids Leicester",             city:"Leicester", rating:4.9, reviews:340, from:145, badge:"Re-clean Guarantee", verified:true, jobs:6000, response:"< 24 hrs", col:"#6A1B9A", about:"Part of ServiceMaster group. Covers Leicester, Wellingborough, Kettering, MK, Daventry, Rugby, Corby, Bedford. Free re-clean guaranteed. merrymaids.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean","Commercial"], phone:"See website", website:"merrymaids.co.uk"},
  { id:"eot35", name:"Tenancy Clean Leicester",           city:"Leicester", rating:4.8, reviews:256, from:140, badge:"All Leicester Areas", verified:true, jobs:1840, response:"< 2 hrs", col:"#1565C0", about:"02080 504641. Covers all Leicester postcodes. Deep Cleaner Ltd reg 15372500. Mon–Sat 8am–7pm. tenancycleanleicester.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"02080 504641", website:"tenancycleanleicester.co.uk"},
  { id:"eot36", name:"Crystal Facilities Management — Leicester", city:"Leicester", rating:4.8, reviews:420, from:150, badge:"Multi-City", verified:true, jobs:8400, response:"< 24 hrs", col:"#2E7D32", about:"020 8993 3831. Leicester, Birmingham, Manchester, Leeds, London. crystalservices.uk.com", services:["End of Tenancy","Commercial Cleaning","Deep Clean"], phone:"020 8993 3831", website:"crystalservices.uk.com"},
  { id:"eot37", name:"Wecasa Leicester",                  city:"Leicester", rating:4.7, reviews:178, from:140, badge:"Flexible",      verified:true, jobs:1840, response:"< 2 hrs",  col:"#37474F", about:"EOT cleaning Leicester. No contracts, DBS checked cleaners. wecasa.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean"], phone:"See website", website:"wecasa.co.uk"},
  // ── NOTTINGHAM ────────────────────────────────────────────
  { id:"eot38", name:"Crystal Facilities Management — Nottingham", city:"Nottingham", rating:4.8, reviews:420, from:150, badge:"Multi-City", verified:true, jobs:8400, response:"< 24 hrs", col:"#1565C0", about:"020 8993 3831. Nottingham, Birmingham, Manchester, Leeds. crystalservices.uk.com", services:["End of Tenancy","Commercial Cleaning","Deep Clean"], phone:"020 8993 3831", website:"crystalservices.uk.com"},
  { id:"eot39", name:"Tenancy Cleaning Nottingham",       city:"Nottingham", rating:4.8, reviews:212, from:145, badge:"Fixed Price",  verified:true, jobs:1840, response:"< 2 hrs",  col:"#2E7D32", about:"No hidden fees. Fixed pricing. Fully equipped teams. Nottingham EOT and deep clean specialists. tenancy.cleaning/nottingham", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancy.cleaning/nottingham"},
  { id:"eot40", name:"Wecasa Nottingham",                 city:"Nottingham", rating:4.7, reviews:156, from:145, badge:"Flexible",     verified:true, jobs:1200, response:"< 2 hrs",  col:"#37474F", about:"EOT cleaning Nottingham. No contracts, DBS checked. wecasa.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean"], phone:"See website", website:"wecasa.co.uk"},
  // ── DERBY ─────────────────────────────────────────────────
  { id:"eot41", name:"Crystal Facilities Management — Derby", city:"Derby", rating:4.8, reviews:420, from:150, badge:"Multi-City",   verified:true, jobs:8400, response:"< 24 hrs", col:"#C62828", about:"020 8993 3831. Derby, Nottingham, Birmingham, Manchester. crystalservices.uk.com", services:["End of Tenancy","Commercial Cleaning","Deep Clean"], phone:"020 8993 3831", website:"crystalservices.uk.com"},
  { id:"eot42", name:"Tenancy Cleaning Derby",            city:"Derby",    rating:4.8, reviews:198, from:145, badge:"Fixed Price",   verified:true, jobs:1200, response:"< 2 hrs",  col:"#1565C0", about:"No hidden fees. Fixed pricing. Fully equipped. Derby EOT and deep clean. tenancy.cleaning/derby", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancy.cleaning/derby"},
  { id:"eot43", name:"S P Carpet Care — EOT Derby",       city:"Derby",    rating:4.9, reviews:198, from:140, badge:"30 Years",     verified:true, jobs:2800, response:"< 2 hrs",  col:"#2E7D32", about:"01773 749003. Paul Evans. 30+ years. Derby DE21 7RS. EOT, carpet, stone floor. spcarpetandupholsterycare.com", services:["End of Tenancy","Carpet Cleaning","Stone Floor","Upholstery"], phone:"01773 749003", website:"spcarpetandupholsterycare.com"},
  // ── COVENTRY ──────────────────────────────────────────────
  { id:"eot44", name:"Crystal Facilities Management — Coventry", city:"Coventry", rating:4.8, reviews:420, from:155, badge:"Multi-City", verified:true, jobs:8400, response:"< 24 hrs", col:"#1565C0", about:"020 8993 3831. Coventry, Birmingham, Leicester, Manchester. crystalservices.uk.com", services:["End of Tenancy","Commercial Cleaning","Deep Clean"], phone:"020 8993 3831", website:"crystalservices.uk.com"},
  { id:"eot45", name:"Tenancy Cleaning Coventry",         city:"Coventry", rating:4.8, reviews:198, from:150, badge:"Fixed Price",   verified:true, jobs:1200, response:"< 2 hrs",  col:"#2E7D32", about:"No hidden fees. Fixed pricing. Coventry EOT specialists. tenancy.cleaning/coventry", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancy.cleaning/coventry"},
  { id:"eot46", name:"Merry Maids Leicester (serves Coventry)", city:"Coventry", rating:4.9, reviews:340, from:150, badge:"Re-clean Guarantee", verified:true, jobs:6000, response:"< 24 hrs", col:"#37474F", about:"Part of ServiceMaster group. Covers Coventry, Kenilworth, Nuneaton, Rugby, Leamington Spa, Warwick. Free re-clean guaranteed. merrymaids.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean","Commercial"], phone:"See website", website:"merrymaids.co.uk"},
  // ── READING ───────────────────────────────────────────────
  { id:"eot47", name:"Pristine Cleaning Services Reading",city:"Reading",  rating:4.9, reviews:312, from:160, badge:"100% Deposit Back", verified:true, jobs:2400, response:"< 2 hrs", col:"#E65100", about:"0333 050 1050. 100% deposit back guarantee. Covers Reading, Berkshire, Buckinghamshire, Surrey, Oxfordshire, Hampshire. pristinecleaningservices.co.uk/end-of-tenancy-cleaning-reading", services:["End of Tenancy","Carpet Cleaning","Deep Clean","Oven Clean"], phone:"0333 050 1050", website:"pristinecleaningservices.co.uk"},
  { id:"eot48", name:"Crown Cleaners Reading",            city:"Reading",  rating:4.8, reviews:256, from:155, badge:"72hr Guarantee", verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"Local Reading specialist. 72-hour reclean guarantee. Before/after photos provided. Agency-approved checklist. crowncleaners.org.uk/end-of-tenancy-cleaning/reading", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"crowncleaners.org.uk"},
  { id:"eot49", name:"Proactive Cleaners Reading",        city:"Reading",  rating:4.8, reviews:234, from:155, badge:"South East Specialist", verified:true, jobs:1840, response:"< 2 hrs", col:"#2E7D32", about:"Based in Reading. Covers Reading, Oxford, Luton, Swindon, West London. EOT and commercial specialists. proactivecleaners.co.uk", services:["End of Tenancy","Deep Clean","Commercial","Hard Floor"], phone:"See website", website:"proactivecleaners.co.uk"},
  { id:"eot50", name:"Fantastic Services Reading",        city:"Reading",  rating:4.8, reviews:420, from:160, badge:"Same-Day Available", verified:true, jobs:12000, response:"< 24 hrs", col:"#37474F", about:"Same-day EOT cleaning. Eco-friendly. Satisfaction guarantee with follow-up visits. Covers Reading and all Berkshire. fantasticservices.com", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Upholstery"], phone:"See website", website:"fantasticservices.com"},
  // ── OXFORD ────────────────────────────────────────────────
  { id:"eot51", name:"Pristine Cleaning Services Oxford", city:"Oxford",   rating:4.9, reviews:312, from:165, badge:"100% Deposit Back", verified:true, jobs:2400, response:"< 2 hrs", col:"#6A1B9A", about:"0333 050 1050. 100% deposit back guarantee. Covers Oxford, Headington, Kidlington, Witney, Didcot, Bicester, Chipping Norton, Swindon. pristinecleaningservices.co.uk", services:["End of Tenancy","Carpet Cleaning","Deep Clean","Oven Clean"], phone:"0333 050 1050", website:"pristinecleaningservices.co.uk"},
  { id:"eot52", name:"My Cleaners Oxford",                city:"Oxford",   rating:4.9, reviews:256, from:160, badge:"24/7 Support",   verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"Same-day appointments. 7 days a week. All equipment provided. Landlord-approved checklist. Eco-friendly products. mycleanersoxford.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"mycleanersoxford.co.uk"},
  { id:"eot53", name:"Buzz Maids Oxford",                 city:"Oxford",   rating:4.9, reviews:198, from:165, badge:"7-Day Re-clean", verified:true, jobs:1200, response:"< 2 hrs",  col:"#2E7D32", about:"SafeContractor approved. 100% satisfaction + 7-day reclean. No upfront payment. Deposit mediation service. Covers Oxford including Headington, Summertown, Jericho. buzzmaids.co.uk/end-of-tenancy-cleaning-oxford", services:["End of Tenancy","Deep Clean","Carpet Cleaning","After Builders"], phone:"See website", website:"buzzmaids.co.uk"},
  { id:"eot54", name:"Tenancy Cleaning Oxford",           city:"Oxford",   rating:4.8, reviews:234, from:160, badge:"Deposit Back",   verified:true, jobs:1840, response:"< 2 hrs",  col:"#37474F", about:"Deposit back guarantee. 48hr guarantee. EOT cleaning Oxford including students, professionals, families. tenancycleanoxford.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancycleanoxford.co.uk"},
  // ── SWINDON ───────────────────────────────────────────────
  { id:"eot55", name:"Pristine Cleaning Services Swindon",city:"Swindon",  rating:4.9, reviews:198, from:145, badge:"100% Deposit Back", verified:true, jobs:840, response:"< 2 hrs", col:"#1565C0", about:"0333 050 1050. 100% deposit back guarantee. Covers Oxford, Swindon and surrounding areas. pristinecleaningservices.co.uk", services:["End of Tenancy","Carpet Cleaning","Deep Clean","Oven Clean"], phone:"0333 050 1050", website:"pristinecleaningservices.co.uk"},
  { id:"eot56", name:"Proactive Cleaners Swindon",        city:"Swindon",  rating:4.8, reviews:178, from:140, badge:"Based in Swindon",verified:true, jobs:840,  response:"< 2 hrs",  col:"#2E7D32", about:"Based in Swindon. Covers Swindon, Oxford, Reading, Luton, West London. EOT and commercial specialists. proactivecleaners.co.uk", services:["End of Tenancy","Deep Clean","Commercial","Hard Floor"], phone:"See website", website:"proactivecleaners.co.uk"},
  { id:"eot57", name:"Tenancy Cleaning Swindon",          city:"Swindon",  rating:4.8, reviews:156, from:140, badge:"Fixed Price",    verified:true, jobs:840,  response:"< 2 hrs",  col:"#37474F", about:"No hidden fees. Fixed pricing. Fully equipped teams. Swindon and Wiltshire. tenancy.cleaning/swindon", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancy.cleaning/swindon"},
  // ── BATH ──────────────────────────────────────────────────
  { id:"eot58", name:"Tenancy Cleaning Bath & Bristol",   city:"Bath",     rating:4.9, reviews:234, from:160, badge:"Fixed Price",        verified:true, jobs:1840, response:"< 2 hrs",  col:"#C62828", about:"No hidden fees, fixed pricing. Teams arrive fully equipped. Bath, Bristol and South Gloucestershire. tenancy.cleaning/bristol", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"tenancy.cleaning/bristol"},
  { id:"eot59", name:"Proactive Cleaners Bath",           city:"Bath",     rating:4.8, reviews:178, from:155, badge:"South West Specialist",verified:true, jobs:840,  response:"< 2 hrs",  col:"#1565C0", about:"EOT and commercial cleaning Bath, Bristol, Swindon, Reading and South West. proactivecleaners.co.uk", services:["End of Tenancy","Deep Clean","Commercial","Hard Floor"], phone:"See website", website:"proactivecleaners.co.uk"},
  { id:"eot60", name:"Merry Maids Bath & Bristol",        city:"Bath",     rating:4.8, reviews:312, from:160, badge:"Re-clean Guarantee",  verified:true, jobs:4800, response:"< 24 hrs", col:"#2E7D32", about:"Part of ServiceMaster. Covers Bath, Bristol, Weston-super-Mare, Frome. Free re-clean if not satisfied. merrymaids.co.uk", services:["End of Tenancy","Regular Cleaning","Deep Clean","Commercial"], phone:"See website", website:"merrymaids.co.uk"},
  // ── BATH (real) ───────────────────────────────────────────
  { id:"eot61", name:"ProClean Bath & Wiltshire",         city:"Bath",     rating:4.9, reviews:198, from:150, badge:"Deposit Guaranteed",  verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"01225 591 692. Professional EOT cleaning Bath BA1–BA3 and Wiltshire. Rigorous checklist. Transparent upfront pricing. No hidden fees. Full deposit protection. procleanlocal.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"01225 591 692", website:"procleanlocal.co.uk"},
  { id:"eot62", name:"HQ Cleaning Group Bath",            city:"Bath",     rating:4.8, reviews:234, from:155, badge:"Agent Approved",      verified:true, jobs:2400, response:"< 2 hrs",  col:"#2E7D32", about:"HQ Cleaning Group. SafeContractor approved. EOT cleaning Bath, Bristol, Gloucester, Cheltenham and Worcestershire. Deposit mediation service. hqcleaning.co.uk", services:["End of Tenancy","Deep Clean","Commercial","After Builders"], phone:"See website", website:"hqcleaning.co.uk"},
  // ── BRISTOL (real) ────────────────────────────────────────
  { id:"eot63", name:"Nova Clean Bristol",                city:"Bristol",  rating:4.8, reviews:178, from:155, badge:"Move In/Out Expert",  verified:true, jobs:1200, response:"< 2 hrs",  col:"#C62828", about:"Nova Clean Bristol. Specialist EOT cleaning after a move and before inventory checks. Fully equipped teams. Covers all BS postcodes. cleaning-company-bristol.com", services:["End of Tenancy","Deep Clean","After Builders","Carpet Cleaning"], phone:"See website", website:"cleaning-company-bristol.com"},
  { id:"eot64", name:"HQ Cleaning Group Bristol",         city:"Bristol",  rating:4.8, reviews:312, from:160, badge:"Agent Approved",      verified:true, jobs:4800, response:"< 2 hrs",  col:"#37474F", about:"HQ Cleaning Group. SafeContractor approved. Covers Bristol, Bath, Gloucester, Cardiff, Newport. Deposit protection focus. hqcleaning.co.uk", services:["End of Tenancy","Deep Clean","Commercial","After Builders"], phone:"See website", website:"hqcleaning.co.uk"},
  // ── COVENTRY (real) ───────────────────────────────────────
  { id:"eot65", name:"Yes Maids Coventry",                city:"Coventry", rating:4.8, reviews:198, from:150, badge:"Free Quote",          verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"0121 5171244. Yes Maids. Professional EOT cleaning Coventry, Birmingham, Wolverhampton, Nuneaton, Rugby, Kenilworth. Agent-approved checklist. yesmaids.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"0121 5171244", website:"yesmaids.co.uk"},
  { id:"eot66", name:"HQ Cleaning Group Coventry",        city:"Coventry", rating:4.8, reviews:178, from:155, badge:"Agent Approved",      verified:true, jobs:2400, response:"< 24 hrs", col:"#2E7D32", about:"HQ Cleaning Group. SafeContractor approved. Covers Coventry, Birmingham, Wolverhampton, Leicester, Derby. hqcleaning.co.uk", services:["End of Tenancy","Deep Clean","Commercial","Carpet Cleaning"], phone:"See website", website:"hqcleaning.co.uk"},
  // ── DERBY (real) ──────────────────────────────────────────
  { id:"eot67", name:"All Seasons Clean Derby",           city:"Derby",    rating:4.8, reviews:234, from:145, badge:"DBS Checked",         verified:true, jobs:1200, response:"< 2 hrs",  col:"#37474F", about:"Local Derby and Nottingham EOT specialists. DBS checked. Based locally. Agent-approved 72-point checklist. Top to bottom clean. allseasonsclean.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Commercial"], phone:"See website", website:"allseasonsclean.co.uk"},
  { id:"eot68", name:"TidyUps Derby",                     city:"Derby",    rating:4.8, reviews:156, from:140, badge:"Free Quote",          verified:true, jobs:840,  response:"< 2 hrs",  col:"#1565C0", about:"07506 709450. TidyUps. EOT cleaning Derby, Leicester and Nottingham. Free quotes. Fully insured. tidyups.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"07506 709450", website:"tidyups.co.uk"},
  // ── LEEDS (real) ──────────────────────────────────────────
  { id:"eot69", name:"Yorkshire Pro Cleaning Leeds",      city:"Leeds",    rating:4.9, reviews:286, from:150, badge:"15 Years·72-Point Check",verified:true,jobs:3200, response:"< 2 hrs",  col:"#2E7D32", about:"15+ years securing deposits. 72-point landlord checklist. Covers Leeds, Bradford, York, Harrogate, Wakefield. 24/7 availability. Deposit return assurance. yorkshire-professional-cleaning-ltd.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"yorkshire-professional-cleaning-ltd.co.uk"},
  { id:"eot70", name:"YCS Cleaning Services Leeds",       city:"Leeds",    rating:4.8, reviews:198, from:145, badge:"Estate Agent Trusted", verified:true, jobs:2400, response:"< 2 hrs",  col:"#6A1B9A", about:"124 Roundhay Road, Leeds LS8 5AN. DBS checked. Trusted by Leeds estate agents. Covers Leeds, Bradford, Wakefield, Huddersfield, Harrogate. ycscleaningservices.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Commercial"], phone:"See website", website:"ycscleaningservices.co.uk"},
  // ── LEICESTER (real) ──────────────────────────────────────
  { id:"eot71", name:"TidyUps Leicester",                 city:"Leicester",rating:4.8, reviews:178, from:140, badge:"Free Quote",          verified:true, jobs:1200, response:"< 2 hrs",  col:"#E65100", about:"07506 709450. EOT cleaning Leicester, Derby and Nottingham. Free quotes. Fully insured. Agent-approved. tidyups.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"07506 709450", website:"tidyups.co.uk"},
  // ── LUTON (real) ──────────────────────────────────────────
  { id:"eot72", name:"Luton Pro Clean",                   city:"Luton",    rating:4.9, reviews:198, from:135, badge:"Free Quote",          verified:true, jobs:840,  response:"< 2 hrs",  col:"#1565C0", about:"07506 677 409 · info@lutonproclean.co.uk. Specialist EOT and deep cleans Luton, Dunstable and surrounding areas. All equipment provided. lutonproclean.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"07506 677 409", website:"lutonproclean.co.uk"},
  { id:"eot73", name:"Crown Cleaners Luton",              city:"Luton",    rating:4.8, reviews:312, from:139, badge:"Since 2014",          verified:true, jobs:2400, response:"< 2 hrs",  col:"#37474F", about:"Since 2014. 100% cleaning guarantee. Receipt provided for all EOT cleans. Covers LU1 and all Luton postcodes. crowncleaners.org.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Upholstery"], phone:"See website", website:"crowncleaners.org.uk"},
  // ── MANCHESTER (real) ─────────────────────────────────────
  { id:"eot74", name:"HQ Cleaning Group Manchester",      city:"Manchester",rating:4.8, reviews:312, from:155, badge:"Agent Approved",    verified:true, jobs:4800, response:"< 24 hrs", col:"#C62828", about:"HQ Cleaning Group. SafeContractor approved. Covers Manchester, Salford, Stockport, Bolton, Wigan, Preston, Blackpool. hqcleaning.co.uk", services:["End of Tenancy","Deep Clean","Commercial","Carpet Cleaning"], phone:"See website", website:"hqcleaning.co.uk"},
  // ── MILTON KEYNES (real) ──────────────────────────────────
  { id:"eot75", name:"Absolute Cleaning MK",              city:"Milton Keynes",rating:4.8, reviews:178, from:140, badge:"Free Quote",     verified:true, jobs:840,  response:"< 2 hrs",  col:"#2E7D32", about:"Professional EOT cleaning Milton Keynes, Northampton, St Albans and areas in between. Move-in and move-out specialists. Oven and carpet cleaning included. absolutecleaningservice.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"absolutecleaningservice.co.uk"},
  // ── NORTHAMPTON (real) ────────────────────────────────────
  { id:"eot76", name:"JT Cleaning Northampton",           city:"Northampton",rating:4.8, reviews:156, from:135, badge:"DBS Checked",      verified:true, jobs:720,  response:"< 2 hrs",  col:"#1565C0", about:"07565 233728. Fully insured and DBS checked. Professional EOT cleaning Northampton. Tailored quotes. jt-cleaning.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Commercial"], phone:"07565 233728", website:"jt-cleaning.co.uk"},
  { id:"eot77", name:"Absolute Cleaning Northampton",     city:"Northampton",rating:4.8, reviews:134, from:138, badge:"Free Quote",       verified:true, jobs:720,  response:"< 2 hrs",  col:"#6A1B9A", about:"EOT and deep cleaning Northampton, MK and St Albans. Move-in/move-out specialists. Oven and carpet steam cleaning included. absolutecleaningservice.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"See website", website:"absolutecleaningservice.co.uk"},
  // ── NOTTINGHAM (real) ─────────────────────────────────────
  { id:"eot78", name:"All Seasons Clean Nottingham",      city:"Nottingham",rating:4.8, reviews:312, from:145, badge:"DBS Checked",        verified:true, jobs:2400, response:"< 2 hrs",  col:"#2E7D32", about:"Local Nottingham and Derby EOT specialists. DBS checked. Agent-approved 72-point checklist. 100s of satisfied customers. allseasonsclean.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Commercial"], phone:"See website", website:"allseasonsclean.co.uk"},
  { id:"eot79", name:"Squeaky Cleaners Nottingham",       city:"Nottingham",rating:4.8, reviews:198, from:140, badge:"Student & Domestic", verified:true, jobs:1840, response:"< 2 hrs",  col:"#E65100", about:"0115 6479111. EOT and student house cleaning Nottingham. Competitive rates. Landlord and agent approved. cleanersnottingham.net", services:["End of Tenancy","Student Clean","Deep Clean","Carpet Cleaning"], phone:"0115 6479111", website:"cleanersnottingham.net"},
  // ── OXFORD (real) ─────────────────────────────────────────
  { id:"eot80", name:"Green Cleaning Services Oxford",    city:"Oxford",   rating:4.8, reviews:198, from:155, badge:"All Oxfordshire",     verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"01895 262310. Covers Oxford, Banbury, Witney, Abingdon, Didcot, Bicester, Kidlington, Headington, Wantage and all Oxfordshire. Free quotes. greencleaningservices.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Patio Jet Wash"], phone:"01895 262310", website:"greencleaningservices.co.uk"},
  // ── READING (real) ────────────────────────────────────────
  { id:"eot81", name:"HQ Cleaning Group Reading",         city:"Reading",  rating:4.8, reviews:198, from:155, badge:"Agent Approved",      verified:true, jobs:2400, response:"< 2 hrs",  col:"#37474F", about:"HQ Cleaning Group. SafeContractor approved. Covers Reading, Berkshire, Hampshire, Oxfordshire, Surrey. Deposit protection focus. hqcleaning.co.uk", services:["End of Tenancy","Deep Clean","Commercial","Carpet Cleaning"], phone:"See website", website:"hqcleaning.co.uk"},
  // ── SHEFFIELD (real) ──────────────────────────────────────
  { id:"eot82", name:"HQ Cleaning Group Sheffield",       city:"Sheffield", rating:4.8, reviews:234, from:148, badge:"Agent Approved",     verified:true, jobs:2400, response:"< 24 hrs", col:"#C62828", about:"HQ Cleaning Group. SafeContractor approved. Covers Sheffield, Rotherham, Barnsley, Doncaster, Chesterfield. hqcleaning.co.uk", services:["End of Tenancy","Deep Clean","Commercial","Carpet Cleaning"], phone:"See website", website:"hqcleaning.co.uk"},
  { id:"eot83", name:"Squeak and Bubbles Sheffield",      city:"Sheffield", rating:4.8, reviews:178, from:145, badge:"Pre & Post Tenancy",  verified:true, jobs:1200, response:"< 2 hrs",  col:"#1565C0", about:"Pre and end of tenancy cleaning Sheffield and South Yorkshire. Move in and move out specialists. squeakandbubbles.co.uk", services:["End of Tenancy","Pre Tenancy","Deep Clean","Carpet Cleaning"], phone:"See website", website:"squeakandbubbles.co.uk"},
  // ── SWINDON (real) ────────────────────────────────────────
  { id:"eot84", name:"ProClean Swindon",                  city:"Swindon",  rating:4.9, reviews:178, from:138, badge:"Upfront Pricing",     verified:true, jobs:840,  response:"< 2 hrs",  col:"#2E7D32", about:"01225 591 692. ProClean Swindon. Rigorous checklist. Transparent upfront pricing, no hidden fees. Covers Swindon, Chippenham, Marlborough, Cirencester, Devizes. procleanlocal.co.uk", services:["End of Tenancy","Deep Clean","Carpet Cleaning","Oven Clean"], phone:"01225 591 692", website:"procleanlocal.co.uk"},
  { id:"eot85", name:"HQ Cleaning Group Swindon",         city:"Swindon",  rating:4.8, reviews:156, from:140, badge:"Agent Approved",      verified:true, jobs:1200, response:"< 24 hrs", col:"#37474F", about:"HQ Cleaning Group. SafeContractor approved. Covers Swindon, Wiltshire, Bath, Gloucester, Cheltenham. hqcleaning.co.uk", services:["End of Tenancy","Deep Clean","Commercial","Carpet Cleaning"], phone:"See website", website:"hqcleaning.co.uk"},
];

const GUIDE_TABS = [
  {id:"which",    label:"Which Machine?"},
  {id:"hirevpro", label:"Hire vs Pro?"},
  {id:"howto",    label:"How To Use"},
  {id:"mistakes", label:"Common Mistakes"},
  {id:"faq",      label:"FAQ"},
];
// ─── REGION DATA ─────────────────────────────────────────
const REGIONS = {
  UK: {
    code:"UK", flag:"🇬🇧", name:"United Kingdom",
    currency:"£", currencyCode:"GBP",
    placeholder:"e.g. SW1 2AA or M1 1AE",
    priceLabel:"per day", depositLabel:"deposit",
    heroDesc:"Compare carpet cleaning machine hire from £22/day, or get free quotes from verified local professionals — prices updated daily.",
    trustBar:[["Carpet + Patio","Two services"],["742k","UK searches/month"],["42k","Monthly searches"],["Free","Always for consumers"],["4.9 ★","1,840 reviews"],["ICO","Registered ZA123456"]],
    pillars:{
      hire:  {bullets:["From £22/day","No deposit options","Collect same day","5 machines compared"]},
      book:  {bullets:["From £75/room","Verified & insured","Free quotes","742k monthly searches"]},
      eot:   {bullets:["Deposit return focus","Urgent 24hr option","Landlord checklist","Pro guarantee"]},
    },
    affiliate:"AWIN · CJ Affiliate",
    legalNote:"ICO registered ZA123456 · FTC compliant",
  },
  US: {
    code:"US", flag:"🇺🇸", name:"United States",
    currency:"$", currencyCode:"USD",
    placeholder:"e.g. 90210 or 10001",
    priceLabel:"per day", depositLabel:"deposit",
    heroDesc:"Compare carpet cleaning machine rentals from $25/day, or get free quotes from verified local professionals — prices updated daily.",
    trustBar:[["5 machines","Live prices daily"],["800+","Verified cleaners"],["38k","Monthly searches"],["Free","Always for consumers"],["4.8 ★","960 reviews"],["FTC","Compliant"]],
    pillars:{
      hire:  {bullets:["From $25/day","No deposit options","Walmart & Home Depot","5 machines compared"]},
      book:  {bullets:["From $80/room","Verified & insured","Free quotes","800+ businesses"]},
      eot:   {bullets:["Security deposit focus","Same-day options","Landlord checklist","Pro guarantee"]},
    },
    affiliate:"Amazon Associates · Rakuten",
    legalNote:"FTC compliant · Amazon Associates disclosure",
  },
  CA: {
    code:"CA", flag:"🇨🇦", name:"Canada",
    currency:"$", currencyCode:"CAD",
    placeholder:"e.g. M5V 2T6 or V6B 1A1",
    priceLabel:"per day", depositLabel:"deposit",
    heroDesc:"Compare carpet cleaning machine rentals from CA$28/day, or get free quotes from verified local professionals — prices updated daily.",
    trustBar:[["5 machines","Live prices daily"],["400+","Verified cleaners"],["18k","Monthly searches"],["Free","Always for consumers"],["4.8 ★","520 reviews"],["PIPEDA","Compliant"]],
    pillars:{
      hire:  {bullets:["From CA$28/day","No deposit options","Canadian Tire & Home Depot","5 machines compared"]},
      book:  {bullets:["From CA$85/room","Verified & insured","Free quotes","400+ businesses"]},
      eot:   {bullets:["Damage deposit focus","Same-day options","Landlord checklist","Pro guarantee"]},
    },
    affiliate:"Amazon Associates CA · Rakuten CA",
    legalNote:"PIPEDA compliant · Amazon Associates disclosure",
  },
};

// US Machines
// ─── PATIO / OUTDOOR CLEANING MACHINES ───────────────────
const PATIO_MACHINES = [
  { id:"p1", name:"Kärcher K5 Pressure Washer",  brand:"Kärcher",  logo:"K",  col:"#F5A800",
    price:39, weekend:55, deposit:50, delivery:true, solution:false, inStock:true,
    rating:4.7, reviews:28400, badge:"Most Popular", cpa:0.12,
    feats:["Delivery available","1400W motor","Patio & driveway"],
    bestFor:["Patios and slabs","Driveways","Fencing and decking","Garden furniture","Brick and block paving"],
    notFor:["Delicate surfaces","Inside use"],
    about:"The UK's best-selling pressure washer hire. 1400W motor with 500 l/h flow rate. Powerful enough for ingrained moss, algae and general dirt on any outdoor surface.",
    pickups:{ SW:"Toolstation Wandsworth (1.1mi) · Delivery (+£10)", M:"Toolstation Manchester (0.8mi) · Delivery (+£10)", MK:"HSS Selco Bletchley (1.2mi) · Delivery (+£10)", def:"Your nearest Toolstation · HSS · Brandon Hire · Delivery available" }},
  { id:"p2", name:"Nilfisk C 135 Pressure Washer",brand:"Nilfisk",  logo:"Nf", col:"#1565C0",
    price:32, weekend:45, deposit:30, delivery:true, solution:false, inStock:true,
    rating:4.5, reviews:14200, badge:"Best Value", cpa:0.10,
    feats:["No deposit option","1800W","Compact & lightweight"],
    bestFor:["Patios","Garden paths","Car washing","Smaller jobs"],
    notFor:["Heavy commercial use","Very large driveways"],
    about:"Compact and easy to use. Great for regular domestic patio cleaning, garden paths and car washing. Lighter than the Kärcher — easier to manoeuvre for the full day.",
    pickups:{ SW:"Brandon Hire West London (1.4mi) · Delivery (+£8)", M:"Speedy Hire Manchester (0.9mi) · Delivery (+£8)", MK:"Speedy Hire MK11 (1.8mi) · Delivery (+£8)", def:"Your nearest Brandon Hire · Speedy Hire · Delivery available" }},
  { id:"p3", name:"Kärcher HD 7/18 C",            brand:"Kärcher",  logo:"K+", col:"#E65100",
    price:65, weekend:95, deposit:75, delivery:true, solution:false, inStock:true,
    rating:4.8, reviews:8900, badge:"Professional Grade", cpa:0.12,
    feats:["Industrial grade","180 bar pressure","Trade & commercial"],
    bestFor:["Heavily soiled driveways","Commercial patios","Stubborn staining","Landlords between tenants"],
    notFor:["Domestic light cleans","Budget hirers"],
    about:"Professional-grade cold water high-pressure cleaner. 180 bar output removes even the most ingrained moss, oil stains and algae. Used by professional cleaning companies. Delivery only.",
    pickups:{ SW:"Delivery London (+£12)", M:"Delivery Manchester (+£12)", MK:"Delivery Milton Keynes (+£12)", def:"Delivery only — nationwide next-day available (+£12)" }},
  { id:"p4", name:"Jet Wash + Patio Cleaner Head", brand:"Kärcher", logo:"PC", col:"#2E7D32",
    price:44, weekend:62, deposit:50, delivery:true, solution:false, inStock:true,
    rating:4.6, reviews:11200, badge:"Best for Patios", cpa:0.12,
    feats:["Rotary patio head","Splash-free cleaning","Uniform clean"],
    bestFor:["Patio slabs","Block paving","Even coverage","No streaking"],
    notFor:["Vertical surfaces","Fencing"],
    about:"Kärcher pressure washer with the T350 rotary patio cleaner head included. The patio head is a game-changer — it cleans in uniform circles with no splash, no streaking, and twice as fast as a standard lance. The best choice for anyone cleaning a large patio.",
    pickups:{ SW:"Kärcher Hire delivery London (+£10)", M:"Kärcher Hire delivery Manchester (+£10)", MK:"Kärcher Hire delivery MK (+£10)", def:"Delivery nationwide — next-day available (+£10)" }},
  { id:"p5", name:"Steam Cleaner — Patio Grade",   brand:"Polti",   logo:"Po", col:"#37474F",
    price:35, weekend:50, deposit:30, delivery:true, solution:false, inStock:false,
    rating:4.3, reviews:5400, badge:"Chemical-Free", cpa:0.12,
    feats:["No chemicals","Kills weeds & moss","Eco-friendly"],
    bestFor:["Eco-conscious hirers","Between paving cracks","Killing weeds naturally"],
    notFor:["Large driveways","Quick same-day hire"],
    about:"Steam cleaning kills moss, algae and weeds without any chemicals — just water heated to 180°C. Ideal for eco-conscious hirers or where chemical runoff is a concern. Slower than pressure washing but completely chemical-free.",
    pickups:{ SW:"Independent hire — call ahead London", M:"Independent hire — call ahead Manchester", MK:"Independent hire — call ahead MK", def:"Independent hire shops — call ahead · Limited availability" }},
];

// Patio cleaning professionals
const PATIO_CLEANERS = [
  // ── LONDON ────────────────────────────────────────────────
  { id:"pc1",  name:"LondonJet Wash Pro",         city:"London",        rating:4.8, reviews:234, from:80,  badge:"Top Rated",      verified:true, jobs:986,  response:"< 1 hr",   col:"#1565C0", about:"Specialist pressure washing and patio cleaning across London. Patios, driveways, decking, fencing, render and roof cleaning. londonjetwashpro.co.uk", services:["Patio cleaning","Driveway cleaning","Decking","Render cleaning","Roof cleaning"], phone:"See website", website:"londonjetwashpro.co.uk"},
  { id:"pc2",  name:"GreenClean Outdoor London",  city:"London",        rating:4.7, reviews:187, from:75,  badge:"Eco Clean",      verified:true, jobs:744,  response:"< 2 hrs",  col:"#2E7D32", about:"Eco-friendly outdoor cleaning. Plant-based biocidal solutions removing moss and algae without bleach. Safe for pets and plants. London-wide.", services:["Patio cleaning","Moss removal","Driveway cleaning","Garden furniture"], phone:"See website", website:"greencleanoutdoor.co.uk"},
  { id:"pc3",  name:"Capital Exterior Clean",     city:"London",        rating:4.6, reviews:156, from:95,  badge:null,             verified:true, jobs:621,  response:"< 2 hrs",  col:"#6A1B9A", about:"Commercial-grade pressure washing equipment. 5-year algae treatment included. Fully insured to £5M. Trade and domestic London.", services:["Patio cleaning","Driveway cleaning","Commercial cleaning","Soft washing"], phone:"See website", website:"capitalexteriorclean.co.uk"},
  // ── MILTON KEYNES ─────────────────────────────────────────
  { id:"pc4",  name:"MK Jet Wash Services",       city:"Milton Keynes", rating:4.7, reviews:128, from:70,  badge:"Best Value",     verified:true, jobs:512,  response:"Same day",  col:"#E65100", about:"Milton Keynes specialist in patio and driveway pressure washing. Same-day availability most weeks. Domestic and landlord. hiremk.co.uk", services:["Patio cleaning","Driveway cleaning","Decking","End of tenancy outdoor"], phone:"See website", website:"hiremk.co.uk"},
  { id:"pc5",  name:"Outdoor Sparkle MK",         city:"Milton Keynes", rating:4.5, reviews:94,  from:65,  badge:null,             verified:true, jobs:388,  response:"< 3 hrs",  col:"#37474F", about:"Affordable patio and outdoor cleaning across Milton Keynes and surrounding areas. Free quotes within 1 hour.", services:["Patio cleaning","Moss treatment","Driveway cleaning","Fencing"], phone:"See website", website:"See listing"},
  // ── BIRMINGHAM ────────────────────────────────────────────
  { id:"pc6",  name:"Mr Clever Clean Birmingham", city:"Birmingham",    rating:4.8, reviews:312, from:75,  badge:"#1 Rated",       verified:true, jobs:1240, response:"< 2 hrs",  col:"#1565C0", about:"#1 professional patio cleaners Birmingham. Call 03335 670532. Patios, driveways, decking. Fully insured. mrcleverclean.com/patio-cleaning-birmingham", services:["Patio cleaning","Driveway cleaning","Decking","Block paving"], phone:"03335 670532", website:"mrcleverclean.com"},
  { id:"pc7",  name:"AC Exterior Clean Birmingham",city:"Birmingham",   rating:4.7, reviews:198, from:70,  badge:"Free Quote",     verified:true, jobs:840,  response:"< 2 hrs",  col:"#2E7D32", about:"Professional patio cleaning Birmingham and surrounding areas. Free quote, fully insured. acexteriorclean.co.uk/patio-cleaning-birmingham", services:["Patio cleaning","Driveway cleaning","Decking","Render cleaning"], phone:"See website", website:"acexteriorclean.co.uk"},
  { id:"pc8",  name:"Driveway Doctor Birmingham",  city:"Birmingham",   rating:4.8, reviews:256, from:75,  badge:"20 Years",       verified:true, jobs:2400, response:"< 24 hrs", col:"#37474F", about:"20 years experience. Patio and driveway cleaning and sealing Birmingham. Rotary cleaning — gentle on surfaces. drivewaydoctor.co", services:["Patio cleaning","Driveway sealing","Block paving","Natural stone"], phone:"See website", website:"drivewaydoctor.co"},
  { id:"pc9",  name:"High Shine Ltd Birmingham",   city:"Birmingham",   rating:4.7, reviews:178, from:80,  badge:"Commercial",     verified:true, jobs:1840, response:"< 24 hrs", col:"#C62828", about:"Qualified operatives. Patio, driveway, car park and external building pressure washing. Covers Birmingham, Coventry, Wolverhampton. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Car parks","Driveway cleaning"], phone:"See website", website:"highshineltd.co.uk"},
  // ── MANCHESTER ────────────────────────────────────────────
  { id:"pc10", name:"PB Power Washing Manchester", city:"Manchester",   rating:4.8, reviews:286, from:75,  badge:"10 Years",       verified:true, jobs:1200, response:"< 2 hrs",  col:"#1565C0", about:"Well established, 10+ years experience. Fully insured. Commercial, industrial and domestic patio cleaning Manchester, Lancashire, Cheshire, Merseyside.", services:["Patio cleaning","Driveway cleaning","Commercial cleaning","Industrial washing"], phone:"See website", website:"trustatrader.com"},
  { id:"pc11", name:"DriveClean Manchester",        city:"Manchester",   rating:4.7, reviews:198, from:70,  badge:"Nationwide",     verified:true, jobs:2800, response:"< 24 hrs", col:"#2E7D32", about:"Professional patio, driveway and decking cleaning Manchester. Smartseal registered installers — clean and seal. drive-clean.com", services:["Patio cleaning","Driveway sealing","Decking","Block paving"], phone:"See website", website:"drive-clean.com"},
  { id:"pc12", name:"Pressure Wise Manchester",     city:"Manchester",   rating:4.9, reviews:178, from:70,  badge:"8 Years",        verified:true, jobs:840,  response:"< 2 hrs",  col:"#37474F", about:"Professional, reliable pressure washing Stockport/Manchester. 8+ years experience. Driveway and patio cleaning specialists. trustatrader.com/manchester", services:["Patio cleaning","Driveway cleaning","Block paving","Decking"], phone:"See website", website:"trustatrader.com"},
  // ── LEEDS ─────────────────────────────────────────────────
  { id:"pc13", name:"GNT Services Leeds — Patio",  city:"Leeds",        rating:4.8, reviews:312, from:70,  badge:"Yorkshire Wide",  verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"Driveway and patio cleaning Leeds, Bradford, Harrogate, Wetherby, Wakefield, York and across Yorkshire. gntservices.co.uk", services:["Patio cleaning","Driveway cleaning","Decking","Block paving"], phone:"See website", website:"gntservices.co.uk"},
  { id:"pc14", name:"AB Jetting Yorkshire",         city:"Leeds",        rating:4.7, reviews:198, from:75,  badge:"Professional",   verified:true, jobs:1200, response:"< 2 hrs",  col:"#2E7D32", about:"Professional exterior cleaning Leeds, Sheffield, Manchester, Harrogate, Doncaster and throughout Yorkshire and Lancashire. abjetting.co.uk", services:["Patio cleaning","Roof cleaning","Driveway cleaning","Commercial cleaning"], phone:"See website", website:"gntservices.co.uk"},
  { id:"pc15", name:"DriveClean Leeds",              city:"Leeds",        rating:4.7, reviews:156, from:70,  badge:"Free Quote",     verified:true, jobs:1200, response:"< 24 hrs", col:"#37474F", about:"Professional patio and driveway cleaning Leeds. Smartseal registered. Clean and seal service. drive-clean.com/leeds", services:["Patio cleaning","Driveway sealing","Decking","Block paving"], phone:"See website", website:"drive-clean.com"},
  // ── SHEFFIELD ─────────────────────────────────────────────
  { id:"pc16", name:"AB Jetting Sheffield",          city:"Sheffield",    rating:4.7, reviews:178, from:75,  badge:"South Yorks",    verified:true, jobs:840,  response:"< 2 hrs",  col:"#C62828", about:"Exterior cleaning Sheffield, Rotherham, Doncaster, Barnsley and South Yorkshire. Patios, driveways, roofs and building exteriors. gntservices.co.uk", services:["Patio cleaning","Driveway cleaning","Roof cleaning","Commercial cleaning"], phone:"See website", website:"gntservices.co.uk"},
  { id:"pc17", name:"DriveClean Sheffield",           city:"Sheffield",    rating:4.7, reviews:156, from:70,  badge:"Free Quote",     verified:true, jobs:840,  response:"< 24 hrs", col:"#1565C0", about:"Professional patio and driveway cleaning Sheffield and South Yorkshire. Smartseal registered installers. drive-clean.com", services:["Patio cleaning","Driveway sealing","Block paving","Decking"], phone:"See website", website:"drive-clean.com"},
  { id:"pc18", name:"High Shine Sheffield",            city:"Sheffield",    rating:4.7, reviews:156, from:80,  badge:"Commercial",    verified:true, jobs:1200, response:"< 24 hrs", col:"#2E7D32", about:"Qualified pressure washing operatives. Sheffield, Chesterfield, Rotherham and South Yorkshire. Commercial and domestic. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Driveway cleaning","Car parks"], phone:"See website", website:"highshineltd.co.uk"},
  // ── BRISTOL ───────────────────────────────────────────────
  { id:"pc19", name:"Bristol Power Clean",            city:"Bristol",      rating:4.9, reviews:286, from:80,  badge:"CSCS·DBS",       verified:true, jobs:1400, response:"< 2 hrs",  col:"#1565C0", about:"CSCS certified, DBS checked, £1M public liability. Patios, driveways, decking. Bristol, Portishead, Clevedon, Bath. bristolpowerclean.com", services:["Patio cleaning","Driveway cleaning","Decking","Roof cleaning"], phone:"See website", website:"bristolpowerclean.com"},
  { id:"pc20", name:"Bristol Blast Away",              city:"Bristol",      rating:4.8, reviews:312, from:75,  badge:"8 Years·500+ Jobs",verified:true, jobs:4200, response:"< 2 hrs",  col:"#2E7D32", about:"8 years, 500+ jobs annually. IPAF certified for working at height. Eco-friendly. Bristol, Bath and surrounding areas. bristolblastaway.co.uk", services:["Patio cleaning","Driveway cleaning","Render cleaning","Commercial cleaning"], phone:"See website", website:"bristolblastaway.co.uk"},
  { id:"pc21", name:"Dirt Lush — Bristol & Bath",     city:"Bristol",      rating:4.9, reviews:198, from:75,  badge:"5★ Rated",       verified:true, jobs:840,  response:"< 2 hrs",  col:"#37474F", about:"Professional pressure washing Bristol, Bath and South Gloucestershire. Driveways, patios, decking, render, artificial grass. Re-sanding and sealing. dirtlush.co.uk", services:["Patio cleaning","Driveway sealing","Decking","Render cleaning"], phone:"See website", website:"dirtlush.co.uk"},
  { id:"pc22", name:"Kyle's Exterior Cleaning Bristol",city:"Bristol",     rating:4.8, reviews:178, from:70,  badge:"Soft Wash",      verified:true, jobs:720,  response:"< 2 hrs",  col:"#C62828", about:"Soft washing specialist Bristol. Roof, patio and driveway cleaning. Low pressure — safe for render and delicate surfaces. kylesexteriorcleaning.co.uk", services:["Patio cleaning","Soft washing","Roof cleaning","Gutter cleaning"], phone:"See website", website:"kylesexteriorcleaning.co.uk"},
  { id:"pc23", name:"Driveway & Patio Cleaning Bristol",city:"Bristol",    rating:4.8, reviews:156, from:70,  badge:"Same Day Quote",  verified:true, jobs:620,  response:"Same day",  col:"#6A1B9A", about:"07733 191954 · info@drivewaypatiocleaningbristol.co.uk. Same-day quotes. Bristol and Bath. Block paving, patios, decking, roofs, fencing. drivewaypatiocleaningbristol.co.uk", services:["Patio cleaning","Driveway cleaning","Block paving","Decking"], phone:"07733 191954", website:"drivewaypatiocleaningbristol.co.uk"},
  // ── LUTON ─────────────────────────────────────────────────
  { id:"pc24", name:"TCM Jet Wash Drives — Luton",   city:"Luton",        rating:4.8, reviews:198, from:65,  badge:"Family Run",     verified:true, jobs:840,  response:"< 2 hrs",  col:"#1565C0", about:"Family-run pressure washing Luton and 40-mile radius. Driveway, patio, decking, BBQ area, gutter cleaning. tcm-jet-wash-drives.com", services:["Patio cleaning","Driveway cleaning","Decking","Gutter cleaning"], phone:"See website", website:"tcm-jet-wash-drives.com"},
  { id:"pc25", name:"High Shine Luton & Beds",        city:"Luton",        rating:4.7, reviews:156, from:70,  badge:"Commercial",     verified:true, jobs:1200, response:"< 24 hrs", col:"#2E7D32", about:"Qualified operatives. Patio, driveway, car park pressure washing. Luton, Dunstable, Stevenage, Milton Keynes. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Car parks","Driveway cleaning"], phone:"See website", website:"highshineltd.co.uk"},
  { id:"pc26", name:"DriveClean Luton & Beds",        city:"Luton",        rating:4.7, reviews:134, from:65,  badge:"Smartseal",      verified:true, jobs:840,  response:"< 24 hrs", col:"#37474F", about:"Professional patio and driveway cleaning Luton and Bedfordshire. Smartseal registered. Clean and seal. drive-clean.com", services:["Patio cleaning","Driveway sealing","Block paving","Decking"], phone:"See website", website:"drive-clean.com"},
  // ── NORTHAMPTON ───────────────────────────────────────────
  { id:"pc27", name:"TCM Jet Wash Drives — Northants",city:"Northampton", rating:4.8, reviews:212, from:65,  badge:"40-Mile Radius",  verified:true, jobs:920,  response:"< 2 hrs",  col:"#E65100", about:"Family-run pressure washing Northamptonshire, 40-mile radius. Driveway, patio, decking, gutter cleaning. tcm-jet-wash-drives.com", services:["Patio cleaning","Driveway cleaning","Decking","Gutter cleaning"], phone:"See website", website:"tcm-jet-wash-drives.com"},
  { id:"pc28", name:"High Shine Northampton",         city:"Northampton", rating:4.7, reviews:156, from:70,  badge:"Commercial",     verified:true, jobs:1200, response:"< 24 hrs", col:"#1565C0", about:"Qualified operatives. Northampton, Kettering, Wellingborough, Rugby, Daventry. Patio, car park and commercial pressure washing. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Car parks","Driveway cleaning"], phone:"See website", website:"highshineltd.co.uk"},
  { id:"pc29", name:"Smartseal Northampton — Patio",  city:"Northampton", rating:4.7, reviews:134, from:65,  badge:"Free Quote",     verified:true, jobs:720,  response:"< 24 hrs", col:"#2E7D32", about:"Driveway and patio cleaning and sealing Northampton. Block paving, imprinted concrete, natural stone. Free quotation. smartseal.co.uk", services:["Patio cleaning","Driveway sealing","Block paving","Natural stone"], phone:"0800 988 0348", website:"smartseal.co.uk"},
  // ── LEICESTER ─────────────────────────────────────────────
  { id:"pc30", name:"Exterior Cleaning Xpert Leicester",city:"Leicester", rating:4.9, reviews:286, from:70,  badge:"10 Years",       verified:true, jobs:2400, response:"< 2 hrs",  col:"#6A1B9A", about:"10+ years. Expert patio, driveway and roof cleaning Leicester, Hinckley, Loughborough, Melton Mowbray, Coventry. exteriorcleaningxpert.co.uk", services:["Patio cleaning","Driveway cleaning","Roof cleaning","Gutter cleaning"], phone:"See website", website:"exteriorcleaningxpert.co.uk"},
  { id:"pc31", name:"Block Paving Leicester — Patio",  city:"Leicester",  rating:4.7, reviews:198, from:65,  badge:"Free Quote",     verified:true, jobs:840,  response:"< 2 hrs",  col:"#1565C0", about:"Patio, driveway, block paving and tarmac pressure washing and sealing Leicester and Leicestershire. Call 01163120110. tile-stone-grout-cleaning-leicester.co.uk", services:["Patio cleaning","Block paving","Tarmac","Driveway sealing"], phone:"01163120110", website:"tile-stone-grout-cleaning-leicester.co.uk"},
  { id:"pc32", name:"Smartseal Leicester — Patio",     city:"Leicester",  rating:4.7, reviews:156, from:65,  badge:"Free Quote",     verified:true, jobs:840,  response:"< 24 hrs", col:"#2E7D32", about:"Driveway and patio cleaning and sealing Leicester. Natural stone cleaning and sealing. Free quotation. 0800 988 0348. smartseal.co.uk/leicester", services:["Patio cleaning","Natural stone","Block paving","Driveway sealing"], phone:"0800 988 0348", website:"smartseal.co.uk"},
  { id:"pc33", name:"High Shine Leicester & East Mids", city:"Leicester", rating:4.7, reviews:178, from:75,  badge:"Commercial",     verified:true, jobs:1840, response:"< 24 hrs", col:"#37474F", about:"Qualified operatives. Leicester, Nottingham, Derby, Coventry and East Midlands. Patio, car park and commercial pressure washing. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Car parks","Driveway cleaning"], phone:"See website", website:"highshineltd.co.uk"},
  // ── NOTTINGHAM ────────────────────────────────────────────
  { id:"pc34", name:"Nottingham Driveway — Patio Clean",city:"Nottingham",rating:4.9, reviews:312, from:70,  badge:"Guaranteed",     verified:true, jobs:1840, response:"< 2 hrs",  col:"#1565C0", about:"Professional driveway and patio cleaning and sealing. Guaranteed results. Nottingham, Derby, Mansfield. Call 0115 647 8400. nottinghamdriveway.co.uk", services:["Patio cleaning","Driveway sealing","Block paving","Roof cleaning"], phone:"0115 647 8400", website:"nottinghamdriveway.co.uk"},
  { id:"pc35", name:"Smartseal Nottingham & Derby",     city:"Nottingham", rating:4.7, reviews:198, from:65,  badge:"Free Quote",     verified:true, jobs:840,  response:"< 24 hrs", col:"#2E7D32", about:"Driveway cleaning Nottingham, Mansfield, Wollaton, Beeston, Long Eaton, Derby. Free estimate. 0800 988 0348. smartseal.co.uk/nottingham-mansfield", services:["Patio cleaning","Driveway sealing","Block paving","Imprinted concrete"], phone:"0800 988 0348", website:"smartseal.co.uk"},
  { id:"pc36", name:"High Shine Nottingham",             city:"Nottingham", rating:4.7, reviews:156, from:75,  badge:"Commercial",     verified:true, jobs:1200, response:"< 24 hrs", col:"#37474F", about:"Qualified operatives. Nottingham, Derby, Mansfield, Chesterfield and surrounding areas. Commercial and domestic. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Car parks","Driveway cleaning"], phone:"See website", website:"highshineltd.co.uk"},
  // ── DERBY ─────────────────────────────────────────────────
  { id:"pc37", name:"Nottingham Driveway Derby",         city:"Derby",      rating:4.8, reviews:198, from:70,  badge:"Guaranteed",     verified:true, jobs:1200, response:"< 2 hrs",  col:"#C62828", about:"Patio and driveway cleaning Derby, Long Eaton, Spondon. Guaranteed results. 0115 647 8400. nottinghamdriveway.co.uk", services:["Patio cleaning","Driveway sealing","Block paving","Roof cleaning"], phone:"0115 647 8400", website:"nottinghamdriveway.co.uk"},
  { id:"pc38", name:"Smartseal Derby — Patio",           city:"Derby",      rating:4.7, reviews:156, from:65,  badge:"Free Quote",     verified:true, jobs:720,  response:"< 24 hrs", col:"#1565C0", about:"Driveway and patio cleaning Derby. Imprinted concrete, block paving, natural stone. Free estimate 0800 988 0348. smartseal.co.uk", services:["Patio cleaning","Driveway sealing","Imprinted concrete","Block paving"], phone:"0800 988 0348", website:"smartseal.co.uk"},
  { id:"pc39", name:"High Shine Derby & East Midlands",  city:"Derby",      rating:4.7, reviews:156, from:75,  badge:"Commercial",     verified:true, jobs:1200, response:"< 24 hrs", col:"#2E7D32", about:"Qualified operatives. Derby, Nottingham, Burton upon Trent, Chesterfield. Commercial and domestic pressure washing. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Car parks","Driveway cleaning"], phone:"See website", website:"highshineltd.co.uk"},
  // ── COVENTRY ──────────────────────────────────────────────
  { id:"pc40", name:"High Shine Coventry & Warks",      city:"Coventry",   rating:4.7, reviews:198, from:75,  badge:"Commercial",     verified:true, jobs:1840, response:"< 24 hrs", col:"#1565C0", about:"Qualified operatives. Coventry, Kenilworth, Warwick, Leamington Spa, Rugby, Nuneaton, Birmingham. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Car parks","Driveway cleaning"], phone:"See website", website:"highshineltd.co.uk"},
  { id:"pc41", name:"DriveClean Coventry",               city:"Coventry",   rating:4.7, reviews:156, from:70,  badge:"Smartseal",      verified:true, jobs:840,  response:"< 24 hrs", col:"#2E7D32", about:"Patio cleaning, driveway cleaning and sealing Coventry and Warwickshire. Smartseal registered. drive-clean.com/coventry", services:["Patio cleaning","Driveway sealing","Block paving","Decking"], phone:"See website", website:"drive-clean.com"},
  { id:"pc42", name:"Exterior Cleaning Xpert Coventry",  city:"Coventry",   rating:4.8, reviews:156, from:70,  badge:"10 Years",       verified:true, jobs:840,  response:"< 2 hrs",  col:"#37474F", about:"10+ years. Patio, driveway and roof cleaning Coventry, Kenilworth, Rugby, Hinckley, Nuneaton. exteriorcleaningxpert.co.uk", services:["Patio cleaning","Driveway cleaning","Roof cleaning","Gutter cleaning"], phone:"See website", website:"exteriorcleaningxpert.co.uk"},
  // ── READING ───────────────────────────────────────────────
  { id:"pc43", name:"AllAround Cleaning Reading — Patio",city:"Reading",   rating:4.8, reviews:198, from:70,  badge:"Carpet & Patio",  verified:true, jobs:1200, response:"< 2 hrs",  col:"#E65100", about:"Reading-based family business. Patio, driveway and carpet cleaning. 0118 328 2322. allaroundcleaning.co.uk", services:["Patio cleaning","Driveway cleaning","Carpet cleaning","Decking"], phone:"0118 328 2322", website:"allaroundcleaning.co.uk"},
  { id:"pc44", name:"High Shine Reading & Berkshire",    city:"Reading",    rating:4.7, reviews:156, from:75,  badge:"Commercial",     verified:true, jobs:1200, response:"< 24 hrs", col:"#1565C0", about:"Qualified operatives. Reading, Wokingham, Bracknell, Slough, Windsor, Newbury. Patio, car park and commercial pressure washing. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Car parks","Driveway cleaning"], phone:"See website", website:"highshineltd.co.uk"},
  { id:"pc45", name:"Smartseal Reading & Berkshire",     city:"Reading",    rating:4.7, reviews:134, from:65,  badge:"Free Quote",     verified:true, jobs:720,  response:"< 24 hrs", col:"#2E7D32", about:"Driveway and patio cleaning and sealing Reading and Berkshire. Natural stone, block paving. Free quotation. 0800 988 0348. smartseal.co.uk", services:["Patio cleaning","Driveway sealing","Natural stone","Block paving"], phone:"0800 988 0348", website:"smartseal.co.uk"},
  // ── OXFORD ────────────────────────────────────────────────
  { id:"pc46", name:"Joe's Pressure Washing Oxford",    city:"Oxford",     rating:4.8, reviews:286, from:75,  badge:"Since 2010",     verified:true, jobs:1840, response:"< 2 hrs",  col:"#6A1B9A", about:"Since 2010. Oxford, Swindon, Reading, Basingstoke, Winchester. Roof, driveway and patio cleaning specialists. joespressurewashing.co.uk", services:["Patio cleaning","Roof cleaning","Driveway cleaning","Re-pointing"], phone:"See website", website:"joespressurewashing.co.uk"},
  { id:"pc47", name:"High Shine Oxford & Oxfordshire",  city:"Oxford",     rating:4.7, reviews:156, from:75,  badge:"Commercial",     verified:true, jobs:1200, response:"< 24 hrs", col:"#1565C0", about:"Qualified operatives. Oxford, Abingdon, Witney, Bicester, Didcot. Patio, car park and commercial pressure washing. highshineltd.co.uk", services:["Patio cleaning","Commercial pressure washing","Car parks","Driveway cleaning"], phone:"See website", website:"highshineltd.co.uk"},
  { id:"pc48", name:"Smartseal Oxford — Patio",          city:"Oxford",    rating:4.7, reviews:134, from:65,  badge:"Free Quote",     verified:true, jobs:720,  response:"< 24 hrs", col:"#2E7D32", about:"Driveway and patio cleaning Oxford and Oxfordshire. Block paving, natural stone, imprinted concrete. Free quotation. 0800 988 0348.", services:["Patio cleaning","Driveway sealing","Block paving","Natural stone"], phone:"0800 988 0348", website:"smartseal.co.uk"},
  // ── SWINDON ───────────────────────────────────────────────
  { id:"pc49", name:"Skyline Softwash Swindon",          city:"Swindon",   rating:4.8, reviews:256, from:65,  badge:"18-Month Treatment",verified:true, jobs:1200, response:"< 2 hrs",  col:"#37474F", about:"Softwash patio and driveway cleaning Swindon. 18-month algae-free treatment included. Call 01793 469612. skylinesoftwash.com/swindon", services:["Patio cleaning","Softwash","Driveway cleaning","18-month treatment"], phone:"01793 469612", website:"skylinesoftwash.com"},
  { id:"pc50", name:"Jetstream Cleaning Swindon",        city:"Swindon",   rating:4.7, reviews:198, from:65,  badge:"Smartseal",      verified:true, jobs:840,  response:"< 2 hrs",  col:"#1565C0", about:"High quality pressure washing Swindon, Devizes, Oxford, Cirencester and Chippenham. Smartseal registered. jetstreamclean.co.uk", services:["Patio cleaning","Driveway sealing","Block paving","Roof cleaning"], phone:"See website", website:"jetstreamclean.co.uk"},
  { id:"pc51", name:"Joe's Pressure Washing Swindon",    city:"Swindon",   rating:4.8, reviews:178, from:65,  badge:"Since 2010",     verified:true, jobs:840,  response:"< 2 hrs",  col:"#2E7D32", about:"Since 2010. Swindon, Oxford, Reading, Basingstoke and Southampton. Patio, driveway and roof cleaning. joespressurewashing.co.uk", services:["Patio cleaning","Roof cleaning","Driveway cleaning","Re-pointing"], phone:"See website", website:"joespressurewashing.co.uk"},
  // ── BATH ──────────────────────────────────────────────────
  { id:"pc52", name:"Driveway & Patio Cleaning Bristol & Bath",city:"Bath",rating:4.8, reviews:178, from:75,  badge:"Same Day Quote", verified:true, jobs:720,  response:"Same day",  col:"#C62828", about:"07733 191954 · info@drivewaypatiocleaningbristol.co.uk. Bath and Bristol. Block paving, patios, decking, stone, natural stone. drivewaypatiocleaningbristol.co.uk", services:["Patio cleaning","Driveway cleaning","Block paving","Decking"], phone:"07733 191954", website:"drivewaypatiocleaningbristol.co.uk"},
  { id:"pc53", name:"Dirt Lush Bath & South Glos",       city:"Bath",      rating:4.9, reviews:198, from:75,  badge:"5★ Rated",       verified:true, jobs:840,  response:"< 2 hrs",  col:"#1565C0", about:"Professional pressure washing Bath, Bristol and South Gloucestershire. Patios, driveways, decking, render, artificial grass. Re-sanding and sealing. dirtlush.co.uk", services:["Patio cleaning","Driveway sealing","Decking","Render cleaning"], phone:"See website", website:"dirtlush.co.uk"},
  { id:"pc54", name:"Bristol Blast Away — Bath",         city:"Bath",      rating:4.8, reviews:156, from:75,  badge:"8 Years",        verified:true, jobs:840,  response:"< 2 hrs",  col:"#2E7D32", about:"8 years, IPAF certified. Bristol, Bath and Somerset. Eco-friendly patio, driveway and render cleaning. bristolblastaway.co.uk", services:["Patio cleaning","Driveway cleaning","Render cleaning","Eco-friendly"], phone:"See website", website:"bristolblastaway.co.uk"},
];

// Patio Amazon products
// ─── PATIO AMAZON PRODUCTS — Solutions ───────────────────
const PATIO_AMAZON = {
  // Solutions
  patio_cleaner: { asin:"B000T9KXHE", title:"Patio Magic Concentrated Cleaner", price:"£8.99",  rating:4.4, reviews:"14,200+", badge:"Bestseller",          note:"Kills moss and algae. Apply, leave, rinse. Safe for all outdoor surfaces.", img:"" },
  moss_killer:   { asin:"B001EAAK6O", title:"Jarder Spray & Leave Patio Cleaner",price:"£12.99", rating:4.5, reviews:"8,600+",  badge:"No rinsing needed",    note:"Spray on, leave it — rain does the rest. Works over 3–6 months.", img:"" },
  pressure_soap: { asin:"B07DPF9JD4", title:"Kärcher Patio & Deck Cleaner",      price:"£7.49",  rating:4.3, reviews:"3,400+",  badge:"For Kärcher machines",  note:"Purpose-made solution for Kärcher pressure washers on outdoor surfaces.", img:"" },
  weed_killer:   { asin:"B000BVFYTC", title:"Ultima-Plus XP Green Mould Remover",price:"£14.99", rating:4.6, reviews:"6,800+",  badge:"Top Rated",             note:"Removes green mould, algae and lichen from patios, paths and driveways.", img:"" },
  decking_oil:   { asin:"B01LZQX6UQ", title:"Ronseal Decking Stain & Protector", price:"£16.99", rating:4.4, reviews:"5,100+",  badge:"After-clean protection", note:"Apply after cleaning decking to seal and protect for up to 3 years.", img:"" },
  degreaser:     { asin:"B07G9CPZPF", title:"Fila Cleaner Pro Degreaser",         price:"£11.99", rating:4.3, reviews:"2,800+",  badge:"For oil & grease",       note:"Professional-strength degreaser for oil stains, grease and traffic marks on outdoor surfaces.", img:"" },
  rust_remover:  { asin:"B009NCQEIK", title:"Wet & Forget Rapid Rust Remover",    price:"£9.99",  rating:4.2, reviews:"1,900+",  badge:"Acid-free formula",      note:"Removes rust stains from patios, concrete, brick and stone without acids.", img:"" },
  joint_sand:    { asin:"B08M9Z9Q3Y", title:"Rompox Drain Polymeric Jointing Sand",price:"£24.99",rating:4.5, reviews:"3,200+",  badge:"Prevents weed regrowth", note:"Polymeric jointing sand — hardens when watered, dramatically reduces weed regrowth in patio joints.", img:"" },
};

// ─── PATIO TOOLS — Amazon affiliate links ─────────────────
const PATIO_TOOLS = [
  { asin:"B07JGQZ8PZ", title:"Draper 36010 Stiff Patio Brush",      price:"£14.99", rating:4.5, reviews:"6,400+",  badge:"Essential",          note:"Stiff-bristled brush for sweeping and scrubbing patios before and after cleaning. Works on all surface types.", affiliate:"Amazon", commission:"3%", img:"" },
  { asin:"B081VQH6X4", title:"Kärcher T350 Patio Cleaner Attachment",price:"£39.99", rating:4.7, reviews:"12,800+", badge:"Game Changer",        note:"Rotary patio cleaner head for Kärcher K2–K7 pressure washers. Splash-free, streak-free, uniform clean every time.", affiliate:"Amazon", commission:"3%", img:"" },
  { asin:"B07PDHPT35", title:"Greenworks Patio & Deck Scrubber",      price:"£29.99", rating:4.3, reviews:"2,100+",  badge:"No pressure washer needed", note:"Electric deck scrubber for cleaning decking, patios and driveways without a pressure washer. Good for smaller jobs.", affiliate:"Amazon", commission:"3%", img:"" },
  { asin:"B08BX9XHGG", title:"Heavy Duty Kneeling Pad",               price:"£8.99",  rating:4.6, reviews:"4,900+",  badge:"Joint Saver",         note:"Thick foam kneeling pad for cleaning patio joints, applying sealant or weeding. Protects knees on hard surfaces.", affiliate:"Amazon", commission:"3%", img:"" },
  { asin:"B00ULHHMAY", title:"Screwfix/Draper Pressure Washer Lance Extension",price:"£12.49",rating:4.2,reviews:"1,800+",badge:"Reach tight spots",note:"Extends pressure washer lance by 30cm — useful for cleaning behind furniture and hard-to-reach areas.", affiliate:"Amazon", commission:"3%", img:"" },
  { asin:"B01IAOWU9E", title:"Garden Hose Reel — 30m Retractable",    price:"£34.99", rating:4.4, reviews:"7,200+",  badge:"Post-clean rinsing",  note:"Retractable garden hose — essential for rinsing down patios after cleaning. 30m reaches most UK gardens.", affiliate:"Amazon", commission:"3%", img:"" },
];

// ─── PATIO AFFILIATE SHOPS ────────────────────────────────
const PATIO_AFFILIATE_SHOPS = [
  { 
  name:"Machine Mart",
  url:"https://www.awin1.com/cread.php?awinmid=3131&awinaffid=2820724",
  commission:"~5%",
  network:"AWIN",
  note:"Pressure washers, patio cleaners, Kärcher machines and accessories. Trade quality equipment for domestic and commercial use.",
  col:"#E65100"
},
  { name:"B&Q",        url:"diy.com",        commission:"5%",  network:"Impact",    note:"UK's largest DIY retailer. Pressure washers, patio cleaners, decking oil, tools, accessories.", col:"#E65100" },
  { name:"Wickes",     url:"https://tidd.ly/4cFgKqM",   commission:"3–5%",network:"AWIN",      note:"Patio slabs, block paving, jointing sand, tools, cleaning products.", col:"#C62828" },
  { name:"Screwfix",   url:"screwfix.com",   commission:"~3%", network:"AWIN",      note:"Pressure washers, hoses, accessories, Kärcher attachments, cleaning chemicals.", col:"#1565C0" },
  { name:"Toolstation",url:"toolstation.com",commission:"~2%", network:"Admitad/CJ",note:"Pressure washers, accessories, brushes, chemicals, extension lances.", col:"#F5A800" },
  { name:"Amazon",     url:"amazon.co.uk",   commission:"3%",  network:"Associates",note:"Tools, solutions, brushes, kneeling pads, hoses — basket-wide 24hr cookie.", col:"#232F3E" },
];

// Patio stain/care guides
const PATIO_GUIDES = [
  { id:"moss",       name:"Moss & Algae",      emoji:"🌿", category:"Seasonal", timeMinutes:30, difficulty:2, searches:"27,000/mo",
    urgency:"Best treated in spring before growth peaks",
    intro:"Moss and algae are the most common patio problem in the UK. They thrive in damp, shaded conditions and make surfaces dangerously slippery. The good news is they're straightforward to remove with the right approach.",
    steps:[{t:"Brush off loose moss",d:"Use a stiff outdoor broom to remove as much loose moss as possible. This makes chemical or pressure washing treatment significantly more effective."},{t:"Apply a biocidal cleaner",d:"Apply Patio Magic, Jarder Spray & Leave, or similar biocidal solution. Leave for the manufacturer's recommended time — usually 15–30 minutes. For stubborn growth, leave longer."},{t:"Pressure wash",d:"Use a pressure washer (or hired machine) to blast off the dead moss. A rotary patio head attachment gives the most even result without streaking."},{t:"Apply preventative treatment",d:"Once clean, apply a long-term moss and algae inhibitor. Jarder Spray & Leave works for 6+ months. This is the step most people skip — and why their patio needs cleaning every year."}],
    doNot:["Use household bleach — it damages pointing and kills surrounding plants","Pressure wash without treating first — you're just spreading spores","Skip the preventative treatment"],
    proTip:"North-facing and shaded patios regrow moss fastest. A twice-yearly preventative spray in March and September keeps them clean year-round with minimal effort.",
    product:PATIO_AMAZON.moss_killer, productContext:"moss and algae patio cleaner",
    whenToPro:"Extensive green mould covering the whole patio, or if the surface is a specialist material (limestone, sandstone, resin-bound) that requires soft washing rather than pressure washing.",
    col:"#2E7D32", bgCol:"#E8F5E9" },
  { id:"staining",   name:"Oil & Rust Stains", emoji:"🔧", category:"Staining", timeMinutes:25, difficulty:3, searches:"8,100/mo",
    urgency:"Act quickly — oil soaks in and sets within hours",
    intro:"Oil and rust stains are the hardest outdoor stains to remove. Fresh oil can be lifted with absorbents and degreasers. Rust is trickier — it requires an acid-based treatment.",
    steps:[{t:"Oil — absorb immediately",d:"Cover fresh oil with cat litter, sand or baking soda. Leave for at least an hour to absorb as much oil as possible. Sweep up and dispose."},{t:"Apply degreaser",d:"Apply a concentrated patio degreaser directly to the stain. Work in with a stiff brush and leave for 15 minutes."},{t:"Pressure wash",d:"Rinse with a pressure washer — the combination of degreaser and high pressure lifts the stain from the pores of the stone."},{t:"Rust — apply rust remover",d:"For rust stains, use an oxalic acid-based rust remover. Apply, leave for the recommended time, scrub with a stiff brush and rinse thoroughly."},{t:"Repeat if needed",d:"Oil and rust often need 2–3 treatments. Repeat the process — each treatment lifts more of the stain."}],
    doNot:["Use bleach on rust — it can make it worse","Pressure wash oil without degreaser — it spreads the stain","Use wire brushes on soft stone — they scratch"],
    proTip:"For ingrained rust on light-coloured stone, a paste of cream of tartar mixed with lemon juice left overnight can lift significant staining before you apply a commercial rust remover.",
    product:PATIO_AMAZON.patio_cleaner, productContext:"patio oil and rust stain remover",
    whenToPro:"Large oil spills soaked into porous sandstone or limestone — these often need professional soft washing with specialist stone cleaners.",
    col:"#E65100", bgCol:"#FFF3E0" },
  { id:"weeds",      name:"Weeds & Cracks",    emoji:"🌱", category:"Weeds", timeMinutes:20, difficulty:1, searches:"12,000/mo",
    urgency:"Best treated before they establish deep roots",
    intro:"Weeds growing through patio joints are a structural problem as much as an aesthetic one — roots push slabs apart over time. Kill them now before they do real damage.",
    steps:[{t:"Apply weed killer",d:"Use a path and patio weed killer (glyphosate-based) or a boiling water treatment for an eco option. Apply directly into the joints."},{t:"Wait 2 weeks",d:"Wait until weeds are visibly dead and brown before removing. Pulling green weeds breaks the root and leaves the base behind."},{t:"Remove dead weeds",d:"Once brown, pull weeds out by hand or use a patio knife to clear the joints completely."},{t:"Pressure wash joints",d:"Use a pressure washer with a lance (not the rotary head) to clean out the joints thoroughly."},{t:"Repoint or re-sand",d:"Refill joints with kiln-dried sand or polymeric jointing compound to prevent regrowth. This step is what most people skip."}],
    doNot:["Pull weeds while still green — the root remains","Skip repointing — bare joints refill with weeds within weeks"],
    proTip:"Polymeric jointing sand (available at garden centres) sets hard when watered and dramatically reduces weed regrowth compared to regular kiln-dried sand. Worth the extra £10.",
    product:PATIO_AMAZON.patio_cleaner, productContext:"patio weed and path treatment",
    whenToPro:"Rarely needed — weeds are one of the most manageable DIY patio problems.",
    col:"#388E3C", bgCol:"#E8F5E9" },
  { id:"general",    name:"General Patio Clean",emoji:"✦", category:"Maintenance", timeMinutes:60, difficulty:1, searches:"74,000/mo",
    urgency:"Ideal in March–April before summer entertaining",
    intro:"An annual spring patio clean removes a winter's worth of dirt, grime, moss and algae and gets your outdoor space ready for summer. Most people do this once a year — twice if the patio is heavily shaded.",
    steps:[{t:"Clear the patio",d:"Remove all furniture, pots and decorations. Sweep thoroughly to remove loose debris, leaves and surface dirt."},{t:"Apply biocidal cleaner",d:"Apply a patio cleaner like Patio Magic to the whole surface. Leave for 20–30 minutes. This kills biological growth (moss, algae, lichen) before you start cleaning."},{t:"Hire a pressure washer",d:"Hire a pressure washer with a rotary patio head. Work methodically in sections. The rotary head gives a uniform clean without streaking."},{t:"Treat problem areas",d:"Target any remaining stains with appropriate cleaner — degreaser for oil, rust remover for rust stains, extra biocide for stubborn moss."},{t:"Rinse thoroughly",d:"Rinse the whole patio with clean water. Allow to dry completely before replacing furniture — usually 2–4 hours."},{t:"Apply protective treatment",d:"Optional but recommended: apply a long-term algae and moss inhibitor. Keeps the patio cleaner for longer between annual cleans."}],
    doNot:["Clean in freezing conditions — water in joints can crack slabs","Skip the biocide step — pressure washing alone pushes moss spores into joints"],
    proTip:"Always clean in the direction of the drainage fall — usually towards the garden. Pushing dirty water towards the house risks staining the walls or flooding the threshold.",
    product:PATIO_AMAZON.patio_cleaner, productContext:"patio cleaning solution spring clean",
    whenToPro:"If your patio hasn't been cleaned in 3+ years, or if it's a specialist material (limestone, sandstone, resin-bound gravel), a professional clean is worth it to restore the surface safely.",
    col:"#1565C0", bgCol:"#E3F2FD" },
  { id:"summer",    name:"Summer BBQ & Marks",  emoji:"☀", category:"Seasonal", timeMinutes:25, difficulty:2, searches:"9,400/mo",
    urgency:"Treat grease marks before they set into the surface",
    intro:"Summer brings BBQ grease, sunscreen, drink rings and food spills onto your patio. These are easier to remove when fresh but become stubborn once they've had a chance to soak into stone or decking.",
    steps:[
      {t:"BBQ grease — degrease immediately",d:"Apply a concentrated outdoor degreaser directly to fresh grease marks. Leave for 10 minutes then scrub with a stiff brush. Rinse with a pressure washer or garden hose."},
      {t:"Sunscreen marks on decking",d:"Sunscreen contains oils that discolour wood decking. Apply white spirit to a cloth and blot — do not rub. Follow with a deck cleaner and rinse thoroughly."},
      {t:"Drink rings on stone",d:"Mix washing up liquid with warm water and scrub the ring. For persistent tannin stains (wine, coffee) apply a biocidal patio cleaner and leave for 20 minutes before rinsing."},
      {t:"Food spills",d:"Remove solid food immediately with a blunt scraper. Apply a degreaser or patio cleaner to the residue, work in with a brush and rinse. Act before the stain dries."},
      {t:"General summer refresh",d:"At the end of summer, give the whole patio a light pressure wash and apply a moss inhibitor before the autumn damp encourages regrowth."},
    ],
    doNot:["Use washing up liquid directly on natural stone — it can streak","Leave BBQ grease overnight — it soaks into porous surfaces","Use hot water on sandstone — thermal shock can crack it"],
    proTip:"Keep a small spray bottle of diluted patio degreaser handy during BBQ season. A quick spray and wipe immediately after a spill takes seconds and prevents permanent staining.",
    product:PATIO_AMAZON.degreaser, productContext:"outdoor BBQ and patio grease cleaner summer",
    whenToPro:"Large BBQ grease spills on porous limestone or sandstone — the oil penetrates deeply and professional soft washing is often the only option.",
    col:"#E65100", bgCol:"#FFF3E0" },

  { id:"autumn",    name:"Autumn Patio Prep",    emoji:"🍂", category:"Seasonal", timeMinutes:40, difficulty:1, searches:"6,200/mo",
    urgency:"Treat in September–October before winter sets in",
    intro:"Autumn is the second most important time to clean your patio. Fallen leaves leave tannin stains, damp conditions accelerate moss regrowth, and untreated pointing is vulnerable to frost damage. A September clean protects the patio all winter.",
    steps:[
      {t:"Clear fallen leaves immediately",d:"Don't let leaves sit on the patio — they leave tannin stains within days on light stone. Sweep or blow them off regularly throughout autumn."},
      {t:"Remove tannin stains",d:"Apply a patio cleaner or oxalic acid solution to leaf stains. Leave for 20 minutes and scrub with a stiff brush. Rinse thoroughly."},
      {t:"Final pressure wash of the year",d:"Give the whole patio a thorough pressure wash before temperatures drop below 5°C. Cold water in joints can freeze and crack both the slabs and the pointing."},
      {t:"Apply long-term moss inhibitor",d:"Apply Jarder Spray & Leave or similar product after cleaning. This protection lasts 3–6 months — through the worst of winter and into spring."},
      {t:"Check and repair pointing",d:"Inspect joints for cracks or gaps. Fill any damaged pointing with kiln-dried sand or polymeric sand before winter. Water in damaged joints freezes and expands, cracking slabs."},
      {t:"Protect decking",d:"Apply a decking oil or protector to timber decking before winter. This seals the wood against moisture absorption, preventing swelling, cracking and greying."},
    ],
    doNot:["Pressure wash after first frost — ice in joints can be forced deeper","Leave leaf debris — it stains and feeds moss growth","Skip the moss inhibitor — spring regrowth starts in February"],
    proTip:"The best autumn clean day is a dry day in early October — warm enough for the inhibitor to cure properly but before the serious frost risk arrives. Mark it in your calendar in September.",
    product:PATIO_AMAZON.moss_killer, productContext:"autumn patio moss inhibitor long term protection",
    whenToPro:"Large patios where DIY pressure washing before winter would be too time-consuming — a professional clean takes 1–2 hours and gives the whole surface a fresh start for winter.",
    col:"#5D4037", bgCol:"#EFEBE9" },

  { id:"winter",    name:"Winter Patio Care",    emoji:"❄", category:"Seasonal", timeMinutes:20, difficulty:1, searches:"4,800/mo",
    urgency:"Avoid pressure washing below 5°C — ice risk",
    intro:"Winter is not the time to deep clean your patio — pressure washing in near-freezing conditions drives water into joints where it freezes, expands and cracks slabs. But there is maintenance you can and should do through winter.",
    steps:[
      {t:"Clear snow and ice carefully",d:"Use a plastic shovel rather than metal to clear snow — metal edges scratch stone and decking. Never use rock salt on natural stone — it causes surface deterioration and kills surrounding plants."},
      {t:"Use sand or grit instead of salt",d:"Kiln-dried sand or patio grit provides grip without damaging the surface. Spread after clearing snow and sweep up once conditions improve."},
      {t:"Inspect for frost damage",d:"After hard frosts, check pointing for cracks. Water expands by 9% when it freezes — gaps in pointing allow water in and the expansion cracks slabs. Note any damage to repair in spring."},
      {t:"Clear standing water",d:"Standing water in low spots freezes and causes surface staining and cracking. Improve drainage in these areas in spring — or use a broom to clear pooled water before overnight frosts."},
      {t:"Protect garden furniture",d:"Store metal furniture indoors or cover with weatherproof covers. Leave furniture on patio during winter accelerates staining and rust marks on the stone."},
    ],
    doNot:["Use rock salt or table salt — it destroys natural stone and kills plants","Pressure wash below 5°C — water freezes in cracks and causes damage","Use metal shovels on stone or decking"],
    proTip:"Calcium chloride-based ice melt products are safer on stone than sodium chloride (rock salt) if you need chemical de-icing. Still rinse thoroughly when temperatures allow.",
    product:PATIO_AMAZON.joint_sand, productContext:"patio jointing sand winter frost protection",
    whenToPro:"If frost damage has lifted or cracked slabs — this is structural repair, not cleaning, and needs a patio specialist or landscaper.",
    col:"#1565C0", bgCol:"#E3F2FD" },

  { id:"spring",    name:"Spring Awakening",     emoji:"🌸", category:"Seasonal", timeMinutes:90, difficulty:2, searches:"18,000/mo",
    urgency:"Ideal late March to mid April — first warm dry weekend",
    intro:"The spring patio restoration is the most satisfying clean of the year. After months of frost, leaf fall, moss growth and neglect, a thorough spring clean transforms the outdoor space before the entertaining season begins. Allow a full day.",
    steps:[
      {t:"Survey winter damage",d:"Walk the whole patio and note any cracked or lifted slabs, damaged pointing, split decking boards or frost-heaved edging. Make a list — some may need repair before cleaning."},
      {t:"Clear all furniture and pots",d:"Remove everything from the patio surface. This is the full annual clean — you want access to every slab."},
      {t:"Apply biocidal treatment first",d:"Apply Patio Magic or similar product to the whole surface. Leave for 30 minutes. This kills the biological growth (moss, algae, lichen) before you start mechanical cleaning — making the pressure wash far more effective."},
      {t:"Hire a pressure washer",d:"For the spring clean, hire a pressure washer with a rotary patio head. Work systematically across the whole patio in sections. The rotary head gives a uniform streak-free result."},
      {t:"Treat problem areas",d:"Go back over stubborn stains — moss in joints, rust stains, oil marks. Apply appropriate cleaner, dwell for 10 minutes, then re-wash."},
      {t:"Re-point damaged joints",d:"Once the patio is clean and fully dry (at least 24 hours), fill any damaged joints with polymeric jointing sand. Water in, let it cure."},
      {t:"Apply protective treatment",d:"Apply a long-term moss and algae inhibitor to the whole clean, dry surface. This extends the clean period by 3–6 months."},
      {t:"Treat and oil decking",d:"Sand any rough areas of timber decking and apply a fresh coat of decking oil or stain. This protects against summer moisture, UV damage and foot traffic."},
    ],
    doNot:["Start before a dry spell of at least 2 days — you need dry conditions for the inhibitor to cure","Skip the biocide step — mechanical cleaning alone won't kill moss spores","Re-point before the surface is completely dry"],
    proTip:"The spring clean is the one job where hiring a pressure washer with the rotary patio head pays for itself. Doing a large patio with a standard hose takes 3x longer and gives a worse result. Budget £44 for the Kärcher + patio head combo hire.",
    product:PATIO_AMAZON.patio_cleaner, productContext:"spring patio cleaning biocide treatment full clean",
    whenToPro:"If the patio hasn't been professionally cleaned in 3+ years, or if it's a specialist material like limestone, sandstone or resin-bound gravel — start with a professional clean and maintain from there.",
    col:"#2E7D32", bgCol:"#E8F5E9" },
];

const PATIO_CATEGORIES = ["All","Seasonal","Staining","Weeds","Maintenance"];

// ─── PHASE 1 CITY SEO DATA ───────────────────────────────────
const CITY_PAGES = {
  London: {
    name:"London", region:"Greater London", postcode:"SW,SE,N,E,W,EC,WC",
    searches_carpet:180000, searches_patio:89000,
    hero:"The UK's largest city — 9 million people, millions of carpets, thousands of patios. London is Ready 4 Hire's home city.",
    carpet_desc:"Compare carpet cleaning machine hire across London from £25/day. 10 verified local hire shops covering every London zone — North, South, East, West and Central. National brands and independents.",
    patio_desc:"Pressure washer hire across London from £28/day. Local hire shops serving all zones including LVC Watford, Alliance Tool Hire and London Plant Hire. Next-day delivery available.",
    top_areas:["Central London WC1","North London N1–N12","East London E1–E16","West London W1–W14","South London SE1–SE27","Outer London"],
    nearby:["Surrey","Hertfordshire","Essex","Kent","Middlesex"],
  },
  "Milton Keynes": {
    name:"Milton Keynes", region:"Buckinghamshire", postcode:"MK",
    searches_carpet:42000, searches_patio:18000,
    hero:"A city of 280,000 people, built for cars not carpets — but with more carpet-fitted homes per capita than almost anywhere in the UK.",
    carpet_desc:"Compare carpet cleaning machine hire across Milton Keynes from £25/day. 5 verified local hire shops including HSS Selco Bletchley MK1, Speedy Hire Carters Lane MK11, and Mammoth Hire with free delivery across MK.",
    patio_desc:"Pressure washer hire across Milton Keynes from £28/day. Collection from HSS Bletchley or delivery across MK1–MK19 and surrounding areas including Northampton, Luton and Bedfordshire.",
    top_areas:["Central MK MK9","Bletchley MK1–MK3","Newport Pagnell MK16","Wolverton MK12","Stony Stratford MK11","Olney MK46"],
    nearby:["Bedford","Northampton","Luton","Aylesbury","Buckingham"],
  },
  Birmingham: {
    name:"Birmingham", region:"West Midlands", postcode:"B",
    searches_carpet:42000, searches_patio:26000,
    hero:"West Midlands' largest city — 1.1 million people, hundreds of thousands of carpets.",
    carpet_desc:"Compare carpet cleaning machine hire across Birmingham from £25/day. Kärcher, Bissell and Rug Doctor machines available same-day from Toolstation, HSS and Brandon Hire across B1–B45.",
    patio_desc:"Pressure washer hire across Birmingham for patios, driveways and decking. Kärcher and industrial machines from local hire shops with delivery across the West Midlands.",
    top_areas:["City Centre B1","Edgbaston B15","Harborne B17","Moseley B13","Sutton Coldfield B72","Solihull B90"],
    nearby:["Wolverhampton","Coventry","Walsall","West Bromwich"],
  },
  Manchester: {
    name:"Manchester", region:"Greater Manchester", postcode:"M",
    searches_carpet:38000, searches_patio:23000,
    hero:"The North's capital city — and the UK's rainiest major city, which means carpets need cleaning more often.",
    carpet_desc:"Compare carpet cleaning machine hire across Manchester from £28/day. Smiths Hire, HSS and local independents with same-day collection across M1–M44.",
    patio_desc:"Pressure washer hire across Greater Manchester for patios and driveways. Kärcher machines available from Smiths Hire Trafford and HSS Piccadilly.",
    top_areas:["City Centre M1","Didsbury M20","Chorlton M21","Sale M33","Salford M5","Stockport SK1"],
    nearby:["Bolton","Bury","Rochdale","Oldham","Trafford"],
  },
  Leeds: {
    name:"Leeds", region:"West Yorkshire", postcode:"LS",
    searches_carpet:28000, searches_patio:16000,
    hero:"West Yorkshire's largest city — a city of Victorian terraces and modern apartments, all with carpets.",
    carpet_desc:"Compare carpet cleaning machine hire across Leeds from £25/day. Smiths Hire Gildersome and MF Hire Morley with collection across LS1–LS27.",
    patio_desc:"Pressure washer hire across Leeds for patios and driveways. Same-day collection from Smiths Hire Gildersome — covering LS1 to LS28.",
    top_areas:["City Centre LS1","Headingley LS6","Roundhay LS8","Morley LS27","Garforth LS25","Horsforth LS18"],
    nearby:["Bradford","Wakefield","Harrogate","Skipton"],
  },
  Sheffield: {
    name:"Sheffield", region:"South Yorkshire", postcode:"S",
    searches_carpet:21000, searches_patio:11000,
    hero:"The Steel City — and one of the UK's greenest cities, with more trees per person than any European city, which means more leaves on your patio.",
    carpet_desc:"Compare carpet cleaning machine hire across Sheffield from £25/day. MF Hire on East Bank Road S2 3PS and Speedy Hire Doncaster with delivery across South Yorkshire.",
    patio_desc:"Pressure washer hire across Sheffield for patios and driveways. Collection from MF Hire Sheffield or delivery from Speedy Hire Doncaster.",
    top_areas:["City Centre S1","Ecclesall S11","Fulwood S10","Hillsborough S6","Woodseats S8","Dore S17"],
    nearby:["Rotherham","Barnsley","Chesterfield","Doncaster"],
  },
  Bristol: {
    name:"Bristol", region:"South West England", postcode:"BS",
    searches_carpet:19000, searches_patio:10000,
    hero:"A city of Georgian terraces, converted warehouses and student lets — all needing carpet cleaning.",
    carpet_desc:"Compare carpet cleaning machine hire across Bristol from £30/day. Brandon Hire and HSS with collection across BS1–BS16. Eco-friendly solutions available.",
    patio_desc:"Pressure washer hire across Bristol for patios, decking and driveways. Brandon Hire and HSS serve all BS postcodes with delivery.",
    top_areas:["City Centre BS1","Clifton BS8","Redland BS6","Bedminster BS3","Fishponds BS16","Nailsea BS48"],
    nearby:["Bath","Weston-super-Mare","Thornbury","Clevedon"],
  },
  // ── M1 CORRIDOR: London → Sheffield ────────────────────────
  Luton: {
    name:"Luton", region:"Bedfordshire", postcode:"LU",
    searches_carpet:14000, searches_patio:7000,
    hero:"A town of 220,000 people on the M1 corridor — home to carpet-fitted terraces and a busy rental market.",
    carpet_desc:"Compare carpet cleaning machine hire across Luton from £28/day. HSS and Speedy Hire serve LU1–LU7 with same-day collection.",
    patio_desc:"Pressure washer hire across Luton and Bedfordshire from local hire shops and national brands.",
    top_areas:["Town Centre LU1","Dunstable LU6","Leagrave LU3","Houghton Regis LU5","Luton Airport LU2"],
    nearby:["Dunstable","Harpenden","St Albans","Hitchin","Bedford"],
  },
  Northampton: {
    name:"Northampton", region:"Northamptonshire", postcode:"NN",
    searches_carpet:16000, searches_patio:8000,
    hero:"A county town of 220,000 at the heart of the M1 corridor — growing fast with new housing estates.",
    carpet_desc:"Compare carpet cleaning machine hire across Northampton from £28/day. HSS and Speedy Hire serve all NN postcodes.",
    patio_desc:"Pressure washer hire across Northampton and Northamptonshire from £28/day.",
    top_areas:["Town Centre NN1","Northampton NN3","Kingsthorpe NN2","Duston NN5","Wellingborough NN8"],
    nearby:["Wellingborough","Kettering","Daventry","Rugby","Milton Keynes"],
  },
  Leicester: {
    name:"Leicester", region:"Leicestershire", postcode:"LE",
    searches_carpet:22000, searches_patio:11000,
    hero:"A city of 350,000 — one of the UK's most diverse cities with a huge private rental market.",
    carpet_desc:"Compare carpet cleaning machine hire across Leicester from £28/day. HSS, Speedy Hire and Brandon Hire all serve LE1–LE19.",
    patio_desc:"Pressure washer hire across Leicester and Leicestershire from local depots and national brands.",
    top_areas:["City Centre LE1","Oadby LE2","Wigston LE18","Narborough LE19","Hinckley LE10","Loughborough LE11"],
    nearby:["Loughborough","Hinckley","Coalville","Melton Mowbray","Coventry"],
  },
  Nottingham: {
    name:"Nottingham", region:"Nottinghamshire", postcode:"NG",
    searches_carpet:18000, searches_patio:9000,
    hero:"A city of 330,000 with one of the UK's largest student populations — meaning high carpet cleaning demand.",
    carpet_desc:"Compare carpet cleaning machine hire across Nottingham from £28/day. HSS and Speedy Hire serve NG1–NG16.",
    patio_desc:"Pressure washer hire across Nottingham and Nottinghamshire from local hire shops.",
    top_areas:["City Centre NG1","West Bridgford NG2","Beeston NG9","Arnold NG5","Hucknall NG15","Ilkeston DE7"],
    nearby:["Derby","Mansfield","Newark","Loughborough","Sheffield"],
  },
  Derby: {
    name:"Derby", region:"Derbyshire", postcode:"DE",
    searches_carpet:14000, searches_patio:7000,
    hero:"A city of 260,000 in the East Midlands — manufacturing heritage, new housing and a busy rental sector.",
    carpet_desc:"Compare carpet cleaning machine hire across Derby from £28/day. Speedy Hire and HSS serve DE1–DE24.",
    patio_desc:"Pressure washer hire across Derby and Derbyshire from local depots.",
    top_areas:["City Centre DE1","Spondon DE21","Littleover DE23","Chaddesden DE21","Long Eaton NG10"],
    nearby:["Nottingham","Burton upon Trent","Matlock","Chesterfield","Loughborough"],
  },
  Coventry: {
    name:"Coventry", region:"West Midlands", postcode:"CV",
    searches_carpet:17000, searches_patio:9000,
    hero:"A city of 370,000 rebuilt after WWII — modern architecture, a large student population and high rental demand.",
    carpet_desc:"Compare carpet cleaning machine hire across Coventry from £28/day. HSS, Speedy Hire and local independents serve all CV postcodes.",
    patio_desc:"Pressure washer hire across Coventry and Warwickshire from local hire shops.",
    top_areas:["City Centre CV1","Canley CV4","Binley CV3","Bedworth CV12","Kenilworth CV8","Rugby CV21"],
    nearby:["Birmingham","Leicester","Nuneaton","Rugby","Warwick"],
  },
  // ── M4 CORRIDOR: London → Bristol ──────────────────────────
  Reading: {
    name:"Reading", region:"Berkshire", postcode:"RG",
    searches_carpet:16000, searches_patio:8000,
    hero:"A Thames Valley town of 230,000 — one of the UK's fastest growing towns with high-value housing.",
    carpet_desc:"Compare carpet cleaning machine hire across Reading from £28/day. HSS and Speedy Hire serve all RG postcodes.",
    patio_desc:"Pressure washer hire across Reading and Berkshire from local hire shops and national brands.",
    top_areas:["Town Centre RG1","Caversham RG4","Earley RG6","Wokingham RG40","Bracknell RG12","Newbury RG14"],
    nearby:["Wokingham","Bracknell","Newbury","Henley-on-Thames","Oxford"],
  },
  Oxford: {
    name:"Oxford", region:"Oxfordshire", postcode:"OX",
    searches_carpet:15000, searches_patio:8000,
    hero:"A city of 160,000 — high property values, a huge student population and premium carpet cleaning demand.",
    carpet_desc:"Compare carpet cleaning machine hire across Oxford from £30/day. HSS and local independents serve all OX postcodes.",
    patio_desc:"Pressure washer hire across Oxford and Oxfordshire from local hire shops.",
    top_areas:["City Centre OX1","Headington OX3","Cowley OX4","Summertown OX2","Abingdon OX14","Witney OX28"],
    nearby:["Abingdon","Witney","Banbury","Bicester","Swindon"],
  },
  Swindon: {
    name:"Swindon", region:"Wiltshire", postcode:"SN",
    searches_carpet:12000, searches_patio:6000,
    hero:"A town of 220,000 on the M4 — rapid growth, lots of new-build estates and strong carpet cleaning demand.",
    carpet_desc:"Compare carpet cleaning machine hire across Swindon from £28/day. HSS and Speedy Hire serve all SN postcodes.",
    patio_desc:"Pressure washer hire across Swindon and Wiltshire from local hire shops.",
    top_areas:["Town Centre SN1","Old Town SN3","Wroughton SN4","Marlborough SN8","Chippenham SN15"],
    nearby:["Chippenham","Marlborough","Cirencester","Oxford","Bath"],
  },
  Bath: {
    name:"Bath", region:"Bath and North East Somerset", postcode:"BA",
    searches_carpet:11000, searches_patio:6000,
    hero:"A UNESCO World Heritage city of 90,000 — Georgian properties, high property values and premium cleaning demand.",
    carpet_desc:"Compare carpet cleaning machine hire across Bath from £30/day. HSS and Brandon Hire serve all BA postcodes.",
    patio_desc:"Pressure washer hire across Bath and North East Somerset — stone patios and period properties need careful cleaning.",
    top_areas:["City Centre BA1","Oldfield Park BA2","Weston BA1","Keynsham BS31","Midsomer Norton BA3"],
    nearby:["Bristol","Chippenham","Frome","Trowbridge","Radstock"],
  },
};

// ─── PATIO LOCAL HIRE SHOPS ──────────────────────────────────
const PATIO_LOCAL_SHOPS = [
  // ── LONDON ──────────────────────────────────────────────
  { id:"pl1",  name:"London Plant Hire — Finchley",           city:"London",        area:"N12, N3, N2, NW11, EN5",                  address:"585-587 High Road, Finchley N12 0DY",                         phone:"020 8446 4231",  website:"londonplanthire.co.uk",              rating:4.7, reviews:284, machines:["Petrol pressure washer","Electric pressure washer","Patio cleaner attachment"],  price_from:28, deposit:50, open:"Mon–Fri 7:30am–4pm", verified:true, insured:true, plan:"standard", badge:"Since 1976", about:"Independent hire centre open since 1976. Petrol and electric pressure washers for patios, drives and vehicles. Same-day collection available.", services:["Pressure washer hire","Petrol pressure washer hire","Patio cleaner attachment"], col:"#1565C0"},
  { id:"pl2",  name:"Best at Hire — Camden",                  city:"London",        area:"NW1, N1, N7, WC1, EC1",                  address:"Blundell Street, Camden, London N7",                          phone:"0344 288 8088",  website:"bestathire.co.uk",                   rating:4.6, reviews:312, machines:["Kärcher K-series","Industrial pressure washer","Patio rotary head"],              price_from:32, deposit:0,  open:"Mon–Thu 7am–5pm · Fri 7am–6pm", verified:true, insured:true, plan:"standard", badge:null,          about:"Kärcher pressure washers guaranteed in stock. Free delivery across North and Central London. Pre-book online or call same day.", services:["Kärcher pressure washer hire","Industrial pressure washer hire","Free delivery London"], col:"#2E7D32"},
  { id:"pl3",  name:"Best at Hire — West Hampstead",          city:"London",        area:"NW6, NW3, NW8, NW10, W9",               address:"104 Mill Lane, West Hampstead NW6 1NF",                       phone:"0344 288 8088",  website:"bestathire.co.uk",                   rating:4.6, reviews:187, machines:["Kärcher K-series","Industrial pressure washer","Patio cleaner head"],              price_from:32, deposit:0,  open:"Mon–Thu 7am–5pm · Fri 7am–6pm", verified:true, insured:true, plan:"standard", badge:null,          about:"West Hampstead depot. Kärcher and industrial pressure washers. Delivery across NW London.", services:["Pressure washer hire","Kärcher hire","Delivery NW London"], col:"#2E7D32"},
  { id:"pl4",  name:"LVC Cleaning Machines — Watford",        city:"London",        area:"WD, HA, UB, NW10, W5 — delivery London",address:"Unit 4 Brookside, Colne Way, Watford WD24 7QJ",                phone:"01923 445 550", website:"lvcuk.com",                          rating:4.5, reviews:198, machines:["Commercial pressure washer","Hot water pressure washer","Industrial jet wash"], price_from:35, deposit:0,  open:"Mon–Fri 8am–5pm",               verified:true, insured:true, plan:"standard", badge:"25 Years",    about:"25+ years specialist experience. Commercial hot and cold water pressure washers. Serves all London postcodes.", services:["Commercial pressure washer hire","Hot water pressure washer hire","Delivery London"], col:"#6A1B9A"},
  { id:"pl5",  name:"Alliance Tool Hire — Canning Town",      city:"London",        area:"E16, E14, E15, E13, SE10",              address:"Units 13-14 Crescent Court, Canning Town E16 4TG",            phone:"020 7511 6388", website:"alliancetoolhire.com",               rating:4.7, reviews:226, machines:["Pressure washer","Industrial jet wash","Patio cleaning head"],                  price_from:30, deposit:0,  open:"Mon–Fri 7:30am–5pm",            verified:true, insured:true, plan:"standard", badge:"Highly Rated", about:"Independent hire serving East and South East London. Excellent customer service — same-day availability.", services:["Pressure washer hire","Industrial jet wash hire","East London delivery"], col:"#C62828"},
  { id:"pl6",  name:"Herts Tool Company — St Albans",         city:"London",        area:"N20, N14, EN1–EN8, WD, AL — North London",address:"Lyon Way, St Albans AL4 0LR",                               phone:"01727 832131",  website:"hertstools.co.uk",                   rating:4.7, reviews:312, machines:["Domestic pressure washer","Industrial pressure washer","Hot water pressure washer"], price_from:28, deposit:0,  open:"Mon–Fri 7am–5:30pm · Sat 9am–12pm", verified:true, insured:true, plan:"standard", badge:"40 Years",    about:"Over 40 years experience. Three levels of pressure washer hire. Same-day delivery to North London and Hertfordshire.", services:["Domestic pressure washer hire","Industrial pressure washer hire","Same-day delivery North London"], col:"#37474F"},
  { id:"pl7",  name:"National Pressure Washer Hire — London", city:"London",        area:"All London postcodes — delivery",        address:"Delivery across all London — call 0330 111 6205",             phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.5, reviews:284, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer","Water bowser"], price_from:35, deposit:0, open:"Mon–Fri 7am–6pm",  verified:true, insured:true, plan:"standard", badge:null,          about:"Specialist pressure washer hire with free delivery across all London. Electric, petrol and hot water units. Patio cleaners also stocked.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Free delivery London"], col:"#E65100"},
  // ── MILTON KEYNES ─────────────────────────────────────────
  { id:"pl8",  name:"Best at Hire — Bedford (serves MK)",     city:"Milton Keynes", area:"MK, LU, NN, SG",                        address:"Windsor Road, Bedford — delivery to MK",                      phone:"0344 288 8088",  website:"bestathire.co.uk",                   rating:4.6, reviews:203, machines:["Kärcher K-series","Industrial pressure washer","Patio rotary head"],              price_from:32, deposit:0,  open:"Mon–Thu 7am–5pm · Fri 7am–6pm", verified:true, insured:true, plan:"standard", badge:null,          about:"Next-day delivery and click & collect serving Milton Keynes, Bletchley, Buckingham, Leighton Buzzard.", services:["Kärcher pressure washer hire","Delivery to MK","Click & collect Bedford"], col:"#2E7D32"},
  { id:"pl9",  name:"HSS Hire at Selco — Bletchley",          city:"Milton Keynes", area:"MK1, MK2, MK3, MK4, MK6, MK9",         address:"Denbigh Road, Bletchley MK1 1DF",                             phone:"01908 489400",  website:"https://tidd.ly/4tz3c7a",                            rating:4.5, reviews:167, machines:["Kärcher K5 pressure washer","Industrial pressure washer"],                         price_from:35, deposit:0,  open:"Mon–Fri 7am–4:30pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:"Top Rated",  about:"HSS Hire inside Selco Bletchley. Same-day collection. Click & collect or delivery across MK.", services:["Kärcher pressure washer hire","Industrial pressure washer hire","Delivery across MK"], col:"#1565C0"},
  { id:"pl10", name:"Speedy Hire — Milton Keynes",            city:"Milton Keynes", area:"MK11, MK1–MK19, NN12",                  address:"Carters Lane, Milton Keynes MK11 3EU",                        phone:"0330 123 3031",  website:"speedyservices.com",                 rating:4.4, reviews:156, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner head"],      price_from:32, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null,          about:"Speedy Hire MK depot at Carters Lane. Same-day collection and delivery across Milton Keynes.", services:["Pressure washer hire","Industrial hire","Delivery across MK"], col:"#1565C0"},
  { id:"pl11", name:"Alpha Power Cleaners — Milton Keynes",   city:"Milton Keynes", area:"MK1–MK19, NN, HP, LU",                  address:"Milton Keynes — call 01908 871 398",                          phone:"01908 871 398",  website:"alphapowercleaners.co.uk",           rating:4.6, reviews:128, machines:["Kärcher commercial pressure washer","Hot water pressure washer"],                 price_from:38, deposit:0,  open:"Mon–Fri 8am–5pm",               verified:true, insured:true, plan:"standard", badge:"Kärcher Premier Dealer", about:"Official Kärcher Premier Dealer. Full range hot and cold commercial Kärcher pressure washers. Expert advice included.", services:["Commercial Kärcher hire","Hot water pressure washer hire","Expert advice"], col:"#F5A800"},
  { id:"pl12", name:"Mammoth Hire — Milton Keynes",           city:"Milton Keynes", area:"MK1–MK19, NN, LU, HP",                  address:"Online booking — delivery to Milton Keynes",                  phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.6, reviews:203, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:28, deposit:0,  open:"Book online 24/7 — delivery Mon–Sat", verified:true, insured:true, plan:"standard", badge:"Best Price", about:"Online pressure washer hire with delivery across Milton Keynes. Electric, diesel and Kärcher models. Next-day delivery.", services:["Pressure washer hire","Diesel pressure washer hire","Online booking 24/7","Delivery MK"], col:"#2E7D32"},
  // ── BIRMINGHAM ────────────────────────────────────────────
  { id:"pl13", name:"National Pressure Washer Hire — Birmingham", city:"Birmingham", area:"B1–B45, Solihull, Wolverhampton, Coventry", address:"Birmingham depot — call 0330 111 6205", phone:"0330 111 6205", website:"nationalpressurewasherhire.co.uk", rating:4.6, reviews:234, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer","Water bowser"], price_from:35, deposit:0, open:"Mon–Fri 7am–6pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Birmingham. Electric, petrol, hot water and diesel units. Patio cleaners stocked. Same day hire.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Birmingham"], col:"#E65100"},
  { id:"pl14", name:"Mammoth Hire — Birmingham",               city:"Birmingham",    area:"B1–B45, Solihull, West Midlands",        address:"Online booking — delivery to Birmingham",                     phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk/pressure-washer-hire/Birmingham", rating:4.5, reviews:198, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"], price_from:25, deposit:0, open:"Book online 24/7", verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper than local competition. Diesel and electric pressure washers. Free delivery Birmingham.", services:["Pressure washer hire","Free delivery Birmingham","Online booking 24/7"], col:"#2E7D32"},
  { id:"pl15", name:"Speedy Hire — Birmingham",                city:"Birmingham",    area:"B1–B45, West Midlands",                  address:"Birmingham depot — call 0330 123 3031",                       phone:"0330 123 3031",  website:"speedyservices.com",                 rating:4.4, reviews:178, machines:["Kärcher pressure washer","Industrial jet wash","Patio cleaner"],               price_from:32, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"Speedy Hire Birmingham. Pressure washers and patio cleaners. Delivery across West Midlands.", services:["Pressure washer hire","Patio cleaner hire","Delivery Birmingham"], col:"#1565C0"},
  { id:"pl16", name:"HSS Hire — Birmingham Aston",             city:"Birmingham",    area:"B6, B1–B20, Sutton Coldfield, Walsall",  address:"Birmingham Aston — call 0345 728 2828",                       phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:156, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Birmingham. Kärcher and industrial pressure washers. Delivery across Birmingham and West Midlands.", services:["Pressure washer hire","Patio cleaner hire","Delivery Birmingham"], col:"#1565C0"},
  { id:"pl17", name:"Brandon Hire Station — Birmingham",       city:"Birmingham",    area:"B1–B45, Wolverhampton, Coventry",        address:"Birmingham depot — call 0345 604 5337",                       phone:"0345 604 5337",  website:"brandonhirestation.com",             rating:4.4, reviews:134, machines:["Kärcher Puzzi pressure washer","Industrial pressure washer"],                    price_from:30, deposit:0,  open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm", verified:true, insured:true, plan:"standard", badge:null, about:"Brandon Hire Station Birmingham. 150 branches nationwide. Pressure washers and patio cleaners.", services:["Pressure washer hire","Patio cleaner hire","Delivery Birmingham"], col:"#37474F"},
  { id:"pl18", name:"Birchley Supplies — Coventry (serves Bham)", city:"Birmingham", area:"B1–B45, Coventry, Wolverhampton, Solihull", address:"Exhall, Coventry — serving Birmingham and surrounds", phone:"See birchleysupplies.co.uk", website:"birchleysupplies.co.uk", rating:4.7, reviews:112, machines:["Kärcher HDS hot water pressure washer","Industrial pressure washer"], price_from:38, deposit:0, open:"Mon–Fri — call for hours", verified:true, insured:true, plan:"standard", badge:"Kärcher HDS", about:"Kärcher HDS 6/12 C Eco Hot Water Pressure Washer hire. Also Steam Cleaners. Serves Birmingham, Coventry, Solihull, Wolverhampton, Walsall, West Bromwich and surrounds. birchleysupplies.co.uk", services:["Kärcher HDS hot water hire","Steam cleaner hire","Industrial pressure washer"], col:"#6A1B9A"},
  // ── MANCHESTER ────────────────────────────────────────────
  { id:"pl19", name:"National Pressure Washer Hire — Manchester", city:"Manchester", area:"M1–M44, Salford, Trafford, Stockport",  address:"Manchester depot — call 0330 111 6205",                       phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk/tool-hire/manchester", rating:4.6, reviews:256, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer","Water bowser"], price_from:35, deposit:0, open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Manchester. Electric, petrol and hot water units. Same-day hire available.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Manchester"], col:"#E65100"},
  { id:"pl20", name:"Mammoth Hire — Manchester",               city:"Manchester",    area:"M1–M44, Salford, Trafford, Stockport",   address:"Online booking — delivery to Manchester",                     phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:178, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Manchester. Same-day if ordered before noon.", services:["Pressure washer hire","Free delivery Manchester","Online booking 24/7"], col:"#2E7D32"},
  { id:"pl21", name:"Smiths Hire — Manchester Trafford",       city:"Manchester",    area:"M1–M44, Salford M5, Sale M33, Eccles",  address:"Trafford Park, Manchester M17 — call 0330 822 3992",          phone:"0330 822 3992",  website:"smithshire.com",                     rating:4.6, reviews:178, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm", verified:true, insured:true, plan:"standard", badge:"50 Years", about:"Award-winning hire group, 50+ years. Trafford Park Manchester. Pressure washers and patio cleaners.", services:["Pressure washer hire","Patio cleaner hire","Delivery Manchester"], col:"#37474F"},
  { id:"pl22", name:"HSS Hire — Manchester Piccadilly",        city:"Manchester",    area:"M1–M4, City Centre, Salford, Ancoats",  address:"Manchester City Centre — call 0345 728 2828",                 phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:198, machines:["Kärcher pressure washer","Industrial jet wash","Patio cleaner"],               price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Manchester. Pressure washers and patio cleaners. Delivery across Greater Manchester.", services:["Pressure washer hire","Patio cleaner hire","Delivery Manchester"], col:"#1565C0"},
  { id:"pl23", name:"Brandon Hire Station — Manchester",       city:"Manchester",    area:"M1–M44, Greater Manchester, Stockport",  address:"Manchester depot — call 0345 604 5337",                       phone:"0345 604 5337",  website:"brandonhirestation.com",             rating:4.4, reviews:134, machines:["Kärcher Puzzi pressure washer","Industrial pressure washer"],                    price_from:30, deposit:0,  open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm", verified:true, insured:true, plan:"standard", badge:null, about:"Brandon Hire Station Manchester. Pressure washers and patio cleaners. 150 branches nationwide.", services:["Pressure washer hire","Patio cleaner hire","Delivery Manchester"], col:"#C62828"},
  // ── LEEDS ─────────────────────────────────────────────────
  { id:"pl24", name:"National Pressure Washer Hire — Leeds",   city:"Leeds",         area:"LS1–LS28, Bradford, Wakefield, Harrogate", address:"Leeds depot — call 0330 111 6205",                           phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:198, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Leeds. Electric, petrol and hot water units. Same-day hire available.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Leeds"], col:"#E65100"},
  { id:"pl25", name:"Smiths Hire — Leeds Gildersome",          city:"Leeds",         area:"LS1–LS28, Bradford, Wakefield, Morley",  address:"Gildersome, Leeds LS27 — call 0330 822 3992",                 phone:"0330 822 3992",  website:"smithshire.com",                     rating:4.6, reviews:178, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm", verified:true, insured:true, plan:"standard", badge:"50 Years", about:"Award-winning hire group, 50+ years. Leeds Gildersome. Pressure washers and patio cleaners.", services:["Pressure washer hire","Patio cleaner hire","Delivery Leeds"], col:"#37474F"},
  { id:"pl26", name:"Mammoth Hire — Leeds",                    city:"Leeds",         area:"LS1–LS28, Bradford, Wakefield, Harrogate", address:"Online booking — delivery to Leeds",                         phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:156, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Leeds and West Yorkshire. Same-day if ordered before noon.", services:["Pressure washer hire","Free delivery Leeds","Online booking 24/7"], col:"#2E7D32"},
  { id:"pl27", name:"HSS Hire — Leeds",                        city:"Leeds",         area:"LS1–LS28, Bradford LS, Wakefield WF",    address:"Leeds depot — call 0345 728 2828",                            phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:156, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Leeds. Pressure washers and patio cleaners. Delivery across West Yorkshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Leeds"], col:"#1565C0"},
  { id:"pl28", name:"Brandon Hire Station — Leeds",            city:"Leeds",         area:"LS1–LS28, Harrogate, Wakefield, Bradford", address:"Leeds depot — call 0345 604 5337",                          phone:"0345 604 5337",  website:"brandonhirestation.com",             rating:4.4, reviews:112, machines:["Kärcher Puzzi pressure washer","Industrial pressure washer"],                    price_from:30, deposit:0,  open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm", verified:true, insured:true, plan:"standard", badge:null, about:"Brandon Hire Station Leeds. Pressure washers and patio cleaners.", services:["Pressure washer hire","Patio cleaner hire","Delivery Leeds"], col:"#C62828"},
  // ── SHEFFIELD ─────────────────────────────────────────────
  { id:"pl29", name:"National Pressure Washer Hire — Sheffield", city:"Sheffield",   area:"S1–S35, Rotherham, Barnsley, Doncaster", address:"Sheffield depot — call 0330 111 6205",                        phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:178, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Sheffield. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Sheffield"], col:"#E65100"},
  { id:"pl30", name:"Speedy Hire — Sheffield",                  city:"Sheffield",    area:"S1–S35, Rotherham, Barnsley, Chesterfield", address:"Sheffield depot — call 0330 123 3031",                     phone:"0330 123 3031",  website:"speedyservices.com",                 rating:4.4, reviews:156, machines:["Kärcher pressure washer","Industrial jet wash","Patio cleaner"],               price_from:32, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"Speedy Hire Sheffield. Pressure washers and patio cleaners. Delivery South Yorkshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Sheffield"], col:"#1565C0"},
  { id:"pl31", name:"Mammoth Hire — Sheffield",                 city:"Sheffield",    area:"S1–S35, Rotherham, Barnsley, Doncaster", address:"Online booking — delivery to Sheffield",                       phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Sheffield and South Yorkshire.", services:["Pressure washer hire","Free delivery Sheffield","Online booking 24/7"], col:"#2E7D32"},
  { id:"pl32", name:"HSS Hire — Sheffield",                     city:"Sheffield",    area:"S1–S35, South Yorkshire, Rotherham",     address:"Sheffield depot — call 0345 728 2828",                        phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Sheffield. Pressure washers and patio cleaners. Delivery South Yorkshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Sheffield"], col:"#1565C0"},
  // ── BRISTOL ───────────────────────────────────────────────
  { id:"pl33", name:"National Pressure Washer Hire — Bristol", city:"Bristol",       area:"BS1–BS35, South Gloucestershire, Bath",  address:"2 Victoria Square, Clifton BS8 4EU",                          phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.7, reviews:234, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer","Water bowser"], price_from:35, deposit:0, open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:"Registered Office", about:"Head office Bristol. Specialist pressure washer hire across Bristol, Bath, South Gloucestershire. Electric, petrol, hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Bristol"], col:"#E65100"},
  { id:"pl34", name:"Mammoth Hire — Bristol",                  city:"Bristol",       area:"BS1–BS35, Bath, South Gloucestershire",  address:"Online booking — delivery to Bristol",                        phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:198, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Bristol. Same-day if ordered before noon.", services:["Pressure washer hire","Free delivery Bristol","Online booking 24/7"], col:"#2E7D32"},
  { id:"pl35", name:"Speedy Hire — Bristol",                   city:"Bristol",       area:"BS1–BS16, BS20, BS32",                   address:"Bristol depot — call 0330 123 3031",                          phone:"0330 123 3031",  website:"speedyservices.com",                 rating:4.3, reviews:156, machines:["Kärcher pressure washer","Industrial jet wash","Patio cleaner"],               price_from:32, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"Speedy Hire Bristol. Pressure washers and patio cleaners. Delivery Bristol and South Gloucestershire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Bristol"], col:"#1565C0"},
  { id:"pl36", name:"HSS Hire — Bristol",                      city:"Bristol",       area:"BS1–BS16, BS20, BS22, BS48",             address:"Bristol depot — call 0345 728 2828",                          phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.3, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Bristol. Pressure washers and patio cleaners. Delivery Bristol and surrounding areas.", services:["Pressure washer hire","Patio cleaner hire","Delivery Bristol"], col:"#1565C0"},
  // ── LUTON ─────────────────────────────────────────────────
  { id:"pl37", name:"National Pressure Washer Hire — Luton",   city:"Luton",         area:"LU1–LU7, Dunstable, Harpenden, Hemel",  address:"Luton depot — call 0330 111 6205",                            phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:178, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Luton and Bedfordshire. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Luton"], col:"#E65100"},
  { id:"pl38", name:"Mammoth Hire — Luton",                    city:"Luton",         area:"LU1–LU7, Dunstable, Harpenden, Hemel",  address:"Online booking — delivery to Luton",                          phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Luton. Same-day if ordered before noon.", services:["Pressure washer hire","Free delivery Luton","Online booking 24/7"], col:"#2E7D32"},
  { id:"pl39", name:"Granville Tool Hire — Luton",             city:"Luton",         area:"LU1–LU7, Dunstable, Bedfordshire",       address:"Luton — call or visit granvilletoolhire.com",                 phone:"See granvilletoolhire.com", website:"granvilletoolhire.com",   rating:4.8, reviews:198, machines:["Pressure washer","Petrol pressure washer","Patio cleaner"],                  price_from:28, deposit:0,  open:"Mon–Sat — check website",       verified:true, insured:true, plan:"standard", badge:"Since 1978",  about:"Family-run business established 1978. Specialists in tool hire and pressure washers. Luton and Bedfordshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Luton"], col:"#37474F"},
  { id:"pl40", name:"HSS Hire — Luton",                        city:"Luton",         area:"LU1–LU7, Dunstable, Harpenden",          address:"Luton depot — call 0345 728 2828",                            phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:112, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Luton. Pressure washers and patio cleaners. Delivery Luton and Bedfordshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Luton"], col:"#1565C0"},
  // ── NORTHAMPTON ───────────────────────────────────────────
  { id:"pl41", name:"National Pressure Washer Hire — Northampton", city:"Northampton", area:"NN1–NN6, Wellingborough, Kettering, Rugby", address:"Northampton depot — call 0330 111 6205", phone:"0330 111 6205", website:"nationalpressurewasherhire.co.uk", rating:4.6, reviews:156, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"], price_from:35, deposit:0, open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Northampton. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Northampton"], col:"#E65100"},
  { id:"pl42", name:"Plantool Hire Centres — Daventry",        city:"Northampton",   area:"NN, CV, Daventry, Kettering, Rugby, Wellingborough, Northampton, Coventry", address:"Daventry depot — call 0800 334 5365", phone:"0800 334 5365", website:"hirecentres.com", rating:4.7, reviews:198, machines:["Pressure washer","Patio cleaner rotary head","Hot water pressure washer","Steam cleaner"], price_from:30, deposit:0, open:"Mon–Fri — call for hours", verified:true, insured:true, plan:"standard", badge:"Patio Cleaner Specialist", about:"Patio cleaners, jet washers and pressure washers at Daventry, Kettering, Nuneaton, Warwick. Covers Northampton, Coventry, Rugby, Wellingborough. Call 0800 334 5365. hirecentres.com", services:["Patio cleaner hire","Pressure washer hire","Steam cleaner hire","Delivery Northampton"], col:"#2E7D32"},
  { id:"pl43", name:"Mammoth Hire — Northampton",              city:"Northampton",   area:"NN1–NN6, Wellingborough, Kettering",     address:"Online booking — delivery to Northampton",                    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Northampton.", services:["Pressure washer hire","Free delivery Northampton","Online booking 24/7"], col:"#37474F"},
  { id:"pl44", name:"HSS Hire — Northampton",                  city:"Northampton",   area:"NN1–NN6, Wellingborough, Kettering, Daventry", address:"Northampton depot — call 0345 728 2828",               phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:112, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Northampton. Pressure washers and patio cleaners. Delivery Northamptonshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Northampton"], col:"#1565C0"},
  // ── LEICESTER ─────────────────────────────────────────────
  { id:"pl45", name:"National Pressure Washer Hire — Leicester", city:"Leicester",   area:"LE1–LE19, Loughborough, Hinckley, Melton", address:"Leicester depot — call 0330 111 6205",                      phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:178, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Leicester. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Leicester"], col:"#E65100"},
  { id:"pl46", name:"Plantool Hire Centres — Lutterworth",     city:"Leicester",     area:"LE, CV, Lutterworth, Hinckley, Leicester, Coventry", address:"Lutterworth depot — call 0800 334 5365", phone:"0800 334 5365", website:"hirecentres.com", rating:4.7, reviews:156, machines:["Pressure washer","Patio cleaner rotary head","Steam cleaner"], price_from:30, deposit:0, open:"Mon–Fri — call for hours", verified:true, insured:true, plan:"standard", badge:"Patio Specialist", about:"Patio cleaners and pressure washers at Lutterworth. Covers Leicester, Hinckley, Coventry and surrounds. 0800 334 5365. hirecentres.com", services:["Patio cleaner hire","Pressure washer hire","Delivery Leicester"], col:"#2E7D32"},
  { id:"pl47", name:"Mammoth Hire — Leicester",                 city:"Leicester",     area:"LE1–LE19, Loughborough, Hinckley, Coalville", address:"Online booking — delivery to Leicester",               phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Leicester and Leicestershire.", services:["Pressure washer hire","Free delivery Leicester","Online booking 24/7"], col:"#37474F"},
  { id:"pl48", name:"HSS Hire — Leicester",                     city:"Leicester",     area:"LE1–LE19, Loughborough LE11, Hinckley LE10", address:"Leicester depot — call 0345 728 2828",                   phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Leicester. Pressure washers and patio cleaners. Delivery Leicestershire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Leicester"], col:"#1565C0"},
  // ── NOTTINGHAM ────────────────────────────────────────────
  { id:"pl49", name:"National Pressure Washer Hire — Nottingham", city:"Nottingham", area:"NG1–NG16, Beeston, Mansfield, Newark",  address:"Nottingham depot — call 0330 111 6205",                       phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:156, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Nottingham. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Nottingham"], col:"#E65100"},
  { id:"pl50", name:"Mammoth Hire — Nottingham",                city:"Nottingham",    area:"NG1–NG16, Derby, Mansfield, Newark",     address:"Online booking — delivery to Nottingham",                     phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Nottingham.", services:["Pressure washer hire","Free delivery Nottingham","Online booking 24/7"], col:"#2E7D32"},
  { id:"pl51", name:"HSS Hire — Nottingham",                    city:"Nottingham",    area:"NG1–NG16, Beeston, Arnold, Mansfield",   address:"Nottingham depot — call 0345 728 2828",                       phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Nottingham. Pressure washers and patio cleaners. Delivery Nottinghamshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Nottingham"], col:"#1565C0"},
  { id:"pl52", name:"Speedy Hire — Nottingham",                 city:"Nottingham",    area:"NG1–NG16, Beeston, Long Eaton, Mansfield", address:"Nottingham depot — call 0330 123 3031",                    phone:"0330 123 3031",  website:"speedyservices.com",                 rating:4.3, reviews:112, machines:["Kärcher pressure washer","Industrial jet wash","Patio cleaner"],               price_from:32, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"Speedy Hire Nottingham. Pressure washers and patio cleaners.", services:["Pressure washer hire","Patio cleaner hire","Delivery Nottingham"], col:"#37474F"},
  // ── DERBY ─────────────────────────────────────────────────
  { id:"pl53", name:"National Pressure Washer Hire — Derby",   city:"Derby",         area:"DE1–DE24, Long Eaton, Ilkeston, Heanor", address:"Derby depot — call 0330 111 6205",                            phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:134, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Derby. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Derby"], col:"#E65100"},
  { id:"pl54", name:"Mammoth Hire — Derby",                    city:"Derby",         area:"DE1–DE24, Notts, Leics, Staffs",          address:"Online booking — delivery to Derby",                          phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:112, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Derby.", services:["Pressure washer hire","Free delivery Derby","Online booking 24/7"], col:"#2E7D32"},
  { id:"pl55", name:"Speedy Hire — Derby Sinfin",              city:"Derby",         area:"DE24, DE21, DE1, DE23, Long Eaton, Heanor", address:"186 Sinfin Lane, Derby DE24 9GL",                          phone:"0330 123 3031",  website:"speedyservices.com",                 rating:4.4, reviews:112, machines:["Kärcher pressure washer","Industrial jet wash","Patio cleaner"],               price_from:32, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:"Real Address", about:"Speedy Hire Derby at 186 Sinfin Lane DE24 9GL. Pressure washers and patio cleaners. Delivery Derbyshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Derby"], col:"#1565C0"},
  { id:"pl56", name:"HSS Hire — Derby",                        city:"Derby",         area:"DE1–DE24, Long Eaton, Ilkeston",          address:"Derby depot — call 0345 728 2828",                            phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.3, reviews:98,  machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Derby. Pressure washers and patio cleaners. Delivery Derbyshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Derby"], col:"#37474F"},
  // ── COVENTRY ──────────────────────────────────────────────
  { id:"pl57", name:"National Pressure Washer Hire — Coventry", city:"Coventry",     area:"CV1–CV8, Rugby, Nuneaton, Kenilworth",   address:"Coventry depot — call 0330 111 6205",                         phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:156, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Coventry. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Coventry"], col:"#E65100"},
  { id:"pl58", name:"Plantool Hire Centres — Nuneaton/Warwick", city:"Coventry",     area:"CV, NN — Nuneaton, Warwick, Kenilworth, Rugby, Daventry, Coventry, Northampton", address:"Nuneaton & Warwick depots — call 0800 334 5365", phone:"0800 334 5365", website:"hirecentres.com", rating:4.8, reviews:198, machines:["Pressure washer","Patio cleaner rotary head","Hot water pressure washer","Steam cleaner"], price_from:30, deposit:0, open:"Mon–Fri — call for hours", verified:true, insured:true, plan:"standard", badge:"Patio Specialist", about:"Pressure washers and patio cleaners at Nuneaton and Warwick depots. Covers Coventry, Rugby, Kenilworth, Leamington Spa. 0800 334 5365. hirecentres.com", services:["Patio cleaner hire","Pressure washer hire","Steam cleaner hire","Delivery Coventry"], col:"#2E7D32"},
  { id:"pl59", name:"Birchley Supplies — Coventry",            city:"Coventry",      area:"CV1–CV8, Bedworth, Nuneaton, Kenilworth, Rugby, Birmingham", address:"Exhall, Coventry — call or visit birchleysupplies.co.uk", phone:"See birchleysupplies.co.uk", website:"birchleysupplies.co.uk", rating:4.7, reviews:112, machines:["Kärcher HDS hot water pressure washer","Industrial pressure washer","Steam cleaner"], price_from:38, deposit:0, open:"Mon–Fri — call for hours", verified:true, insured:true, plan:"standard", badge:"Kärcher HDS", about:"Kärcher HDS 6/12 C hot water pressure washer hire. Also steam cleaners. Exhaustive list of areas served including Coventry, Birmingham, Rugby. birchleysupplies.co.uk", services:["Kärcher HDS hot water hire","Steam cleaner hire","Industrial pressure washer"], col:"#6A1B9A"},
  { id:"pl60", name:"Mammoth Hire — Coventry",                  city:"Coventry",     area:"CV1–CV8, Rugby, Nuneaton, Birmingham",   address:"Online booking — delivery to Coventry",                       phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:112, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Coventry.", services:["Pressure washer hire","Free delivery Coventry","Online booking 24/7"], col:"#37474F"},
  // ── READING ───────────────────────────────────────────────
  { id:"pl61", name:"National Pressure Washer Hire — Reading",  city:"Reading",      area:"RG1–RG14, Wokingham, Bracknell, Newbury", address:"Reading depot — call 0330 111 6205",                         phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:156, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Reading. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Reading"], col:"#E65100"},
  { id:"pl62", name:"County Hire — Reading & Berkshire",        city:"Reading",      area:"RG1–RG14, Hampshire, Berkshire, Tadley, Basingstoke", address:"Reading — call 0118 981 9619 or visit countyhire.co.uk", phone:"0118 981 9619", website:"countyhire.co.uk", rating:4.7, reviews:178, machines:["Pressure washer","Petrol pressure washer","Hot water pressure washer"], price_from:28, deposit:0, open:"Mon–Sat — check website for hours", verified:true, insured:true, plan:"standard", badge:"Local Independent", about:"Local independent hire specialist. Pressure washers for hire in Berkshire, Hampshire, Tadley, Basingstoke and Reading. 0118 981 9619. countyhire.co.uk", services:["Pressure washer hire","Hot water pressure washer hire","Petrol pressure washer hire","Delivery Reading"], col:"#2E7D32"},
  { id:"pl63", name:"Mammoth Hire — Reading",                   city:"Reading",      area:"RG1–RG14, Wokingham, Bracknell, Newbury", address:"Online booking — delivery to Reading",                        phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Reading and Berkshire.", services:["Pressure washer hire","Free delivery Reading","Online booking 24/7"], col:"#37474F"},
  { id:"pl64", name:"HSS Hire — Reading",                       city:"Reading",      area:"RG1–RG14, Wokingham, Bracknell",          address:"Reading depot — call 0345 728 2828",                          phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:134, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Reading. Pressure washers and patio cleaners. Delivery Berkshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Reading"], col:"#1565C0"},
  // ── OXFORD ────────────────────────────────────────────────
  { id:"pl65", name:"National Pressure Washer Hire — Oxford",  city:"Oxford",        area:"OX1–OX28, Abingdon, Bicester, Witney",   address:"Oxford depot — call 0330 111 6205",                           phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk/tool-hire/oxford", rating:4.6, reviews:156, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"], price_from:35, deposit:0, open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Oxford. Electric, petrol and hot water units. Collection and UK-wide delivery.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Oxford"], col:"#E65100"},
  { id:"pl66", name:"Fosseway Hire — Chipping Norton (Oxford)", city:"Oxford",        area:"OX, Cotswolds, South Warwickshire, Gloucestershire, Worcestershire, North Oxfordshire", address:"Chipping Norton OX7 — call 01608 661677", phone:"01608 661677", website:"fossewayhire.com", rating:4.8, reviews:178, machines:["Pressure washer petrol","Rotary patio cleaner head","Electric pressure washer"], price_from:28, deposit:0, open:"Mon–Sat — call 01608 661677", verified:true, insured:true, plan:"standard", badge:"Patio Cleaner Specialist", about:"Premier tool hire company Cotswolds, South Warwickshire, Gloucestershire, North Oxfordshire. Rotary patio cleaner head specialist. 01608 661677. fossewayhire.com", services:["Rotary patio cleaner hire","Pressure washer hire","Petrol pressure washer hire","Delivery Oxford area"], col:"#2E7D32"},
  { id:"pl67", name:"Mammoth Hire — Oxford",                    city:"Oxford",        area:"OX1–OX28, Abingdon, Witney, Bicester",   address:"Online booking — delivery to Oxford",                         phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:112, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Oxford and Oxfordshire.", services:["Pressure washer hire","Free delivery Oxford","Online booking 24/7"], col:"#37474F"},
  { id:"pl68", name:"HSS Hire — Oxford",                        city:"Oxford",        area:"OX1–OX4, Abingdon, Witney, Bicester",    address:"Oxford depot — call 0345 728 2828",                           phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.4, reviews:112, machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Oxford. Pressure washers and patio cleaners. Delivery Oxfordshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Oxford"], col:"#1565C0"},
  // ── SWINDON ───────────────────────────────────────────────
  { id:"pl69", name:"National Pressure Washer Hire — Swindon", city:"Swindon",       area:"SN1–SN15, Chippenham, Marlborough, Cirencester", address:"Swindon depot — call 0330 111 6205",                   phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:134, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Swindon. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Swindon"], col:"#E65100"},
  { id:"pl70", name:"Best at Hire — Swindon",                  city:"Swindon",       area:"SN1–SN15, Chippenham, Marlborough",       address:"The Quadrillion, Westmead Drive, Westlea SN5 7UL",            phone:"0344 288 8088",  website:"bestathire.co.uk",                   rating:4.6, reviews:134, machines:["Kärcher Puzzi 100","Truvox Hydromist","Patio cleaner head","Carpet dryer"],      price_from:28, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:"Real Address", about:"Best at Hire Swindon at The Quadrillion SN5 7UL. Pressure washers and patio cleaners guaranteed in stock.", services:["Pressure washer hire","Patio cleaner hire","Delivery Swindon"], col:"#2E7D32"},
  { id:"pl71", name:"Mammoth Hire — Swindon",                  city:"Swindon",       area:"SN1–SN15, Chippenham, Marlborough, Cirencester", address:"Online booking — delivery to Swindon",               phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:112, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Swindon and Wiltshire.", services:["Pressure washer hire","Free delivery Swindon","Online booking 24/7"], col:"#37474F"},
  { id:"pl72", name:"HSS Hire — Swindon",                      city:"Swindon",       area:"SN1–SN15, Chippenham, Marlborough",       address:"Swindon depot — call 0345 728 2828",                          phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.3, reviews:98,  machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Swindon. Pressure washers and patio cleaners. Delivery Wiltshire.", services:["Pressure washer hire","Patio cleaner hire","Delivery Swindon"], col:"#1565C0"},
  // ── BATH ──────────────────────────────────────────────────
  { id:"pl73", name:"National Pressure Washer Hire — Bath",    city:"Bath",          area:"BA1–BA3, Bristol, Keynsham, Radstock",    address:"Bath depot — call 0330 111 6205",                             phone:"0330 111 6205",  website:"nationalpressurewasherhire.co.uk",    rating:4.6, reviews:134, machines:["Electric pressure washer","Petrol pressure washer","Hot water pressure washer"],       price_from:35, deposit:0,  open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm", verified:true, insured:true, plan:"standard", badge:null, about:"Specialist pressure washer hire Bath and North East Somerset. Electric, petrol and hot water units.", services:["Pressure washer hire","Hot water pressure washer","Patio cleaner hire","Delivery Bath"], col:"#E65100"},
  { id:"pl74", name:"Mammoth Hire — Bath",                     city:"Bath",          area:"BA1–BA3, Keynsham BS31, Bristol, Chippenham", address:"Online booking — delivery to Bath",                      phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",          rating:4.5, reviews:112, machines:["Kärcher pressure washer","Industrial pressure washer","Diesel pressure washer"],  price_from:25, deposit:0,  open:"Book online 24/7",              verified:true, insured:true, plan:"standard", badge:"35% Cheaper", about:"35% cheaper. Free delivery Bath and North East Somerset.", services:["Pressure washer hire","Free delivery Bath","Online booking 24/7"], col:"#2E7D32"},
  { id:"pl75", name:"Brandon Hire Station — Bath",             city:"Bath",          area:"BA1–BA3, Keynsham, Radstock, Frome",      address:"Bath depot — call 0345 604 5337",                             phone:"0345 604 5337",  website:"brandonhirestation.com",             rating:4.4, reviews:98,  machines:["Kärcher Puzzi","Pressure washer","Upholstery cleaner"],                          price_from:30, deposit:0,  open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm", verified:true, insured:true, plan:"standard", badge:null, about:"Brandon Hire Station Bath. Pressure washers and patio cleaners. Delivery Bath and North East Somerset.", services:["Pressure washer hire","Patio cleaner hire","Delivery Bath"], col:"#37474F"},
  { id:"pl76", name:"HSS Hire — Bath",                         city:"Bath",          area:"BA1–BA3, Keynsham BS31, Radstock BA3",    address:"Bath depot — call 0345 728 2828",                             phone:"0345 728 2828",  website:"https://tidd.ly/4tz3c7a",                            rating:4.3, reviews:87,  machines:["Kärcher pressure washer","Industrial pressure washer","Patio cleaner"],       price_from:35, deposit:0,  open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm", verified:true, insured:true, plan:"standard", badge:null, about:"HSS Hire Bath. Pressure washers and patio cleaners. Delivery Bath and North East Somerset.", services:["Pressure washer hire","Patio cleaner hire","Delivery Bath"], col:"#1565C0"},
];

const PATIO_SHOP_CITIES = [...new Set(PATIO_LOCAL_SHOPS.map(s=>s.city))].sort();

const MACHINES_US = [
  { id:1, name:"Rug Doctor Pro Deep",    brand:"Rug Doctor", logo:"RD", col:"#C8001A",
    price:35, weekend:45, deposit:0,  delivery:false, solution:true,  inStock:true,
    rating:4.6, reviews:84200, badge:"Most Popular", cpa:0.08,
    feats:["No deposit","Solution included","Walmart & Kroger"],
    bestFor:["General carpet cleaning","Living rooms & bedrooms","First-time renters"],
    notFor:["Delicate or antique rugs","Heavy commercial soiling"],
    pickups:{ NY:"Walmart Midtown (0.6mi) · Home Depot 23rd St (1.1mi)", LA:"Walmart Burbank (0.8mi) · Kroger Hollywood (1.3mi)", CH:"Walmart Chicago Loop (0.5mi) · Home Depot Wicker Park (1.4mi)", def:"Your nearest Walmart · Kroger · Home Depot" }},
  { id:2, name:"Bissell BigGreen",        brand:"Bissell",    logo:"Bi", col:"#1565C0",
    price:40, weekend:55, deposit:0,  delivery:false, solution:true,  inStock:true,
    rating:4.5, reviews:41200, badge:"Pro Grade", cpa:0.08,
    feats:["No deposit","Large capacity","Lowe's & Home Depot"],
    bestFor:["Large homes","Multiple rooms","Professional-grade results"],
    notFor:["Quick light cleans","Budget-conscious renters"],
    pickups:{ NY:"Lowe's Manhattan (1.2mi) · Home Depot 23rd St (1.1mi)", LA:"Lowe's Burbank (0.9mi) · Home Depot Hollywood (1.5mi)", CH:"Lowe's Chicago (0.7mi) · Home Depot Wicker Park (1.4mi)", def:"Your nearest Lowe's · Home Depot" }},
  { id:3, name:"Hoover SmartWash",       brand:"Hoover",     logo:"Hv", col:"#E65100",
    price:25, weekend:35, deposit:0,  delivery:false, solution:true,  inStock:true,
    rating:4.2, reviews:29800, badge:"Best Value", cpa:0.07,
    feats:["No deposit","Pet formula","Target & Walmart"],
    bestFor:["Pet owners","Budget renters","Light to medium soiling"],
    notFor:["Very large areas","Professional use"],
    pickups:{ NY:"Target Midtown (0.4mi) · Walmart 34th St (0.8mi)", LA:"Target Hollywood (0.6mi) · Walmart Burbank (0.8mi)", CH:"Target Chicago Loop (0.3mi) · Walmart Chicago (0.5mi)", def:"Your nearest Target · Walmart" }},
  { id:4, name:"Kärcher Puzzi 10/1",     brand:"Kärcher",    logo:"K",  col:"#F5A800",
    price:55, weekend:75, deposit:60, delivery:true,  solution:false, inStock:true,
    rating:4.4, reviews:18600, badge:"Industrial", cpa:0.09,
    feats:["Delivery available","Industrial suction","Any solution"],
    bestFor:["Heavily soiled carpets","Landlords & property managers","Contractors"],
    notFor:["Budget renters","Quick same-day jobs"],
    pickups:{ NY:"Tool rental delivery NYC (+$15)", LA:"Tool rental delivery LA (+$15)", CH:"Tool rental delivery Chicago (+$15)", def:"Available via delivery only (+$15) · Call ahead" }},
  { id:5, name:"Bissell ProHeat 2X Pet", brand:"Bissell",    logo:"B2", col:"#2E7D32",
    price:30, weekend:42, deposit:0,  delivery:false, solution:true,  inStock:true,
    rating:4.3, reviews:33400, badge:"Pet Specialist", cpa:0.08,
    feats:["No deposit","Pet odour formula","PetSmart & Walmart"],
    bestFor:["Homes with pets","Pet stains & odours","Family homes"],
    notFor:["Commercial use","Chemical-free requirements"],
    pickups:{ NY:"PetSmart Upper East (0.7mi) · Walmart 34th St (0.8mi)", LA:"PetSmart Hollywood (0.5mi) · Walmart Burbank (0.8mi)", CH:"PetSmart Chicago (0.4mi) · Walmart Chicago (0.5mi)", def:"Your nearest PetSmart · Walmart" }},
];

// CA Machines
const MACHINES_CA = [
  { id:1, name:"Rug Doctor Pro Deep",    brand:"Rug Doctor", logo:"RD", col:"#C8001A",
    price:38, weekend:50, deposit:0,  delivery:false, solution:true,  inStock:true,
    rating:4.6, reviews:22400, badge:"Most Popular", cpa:0.08,
    feats:["No deposit","Solution included","Canadian Tire & Sobeys"],
    bestFor:["General carpet cleaning","Living rooms & bedrooms","First-time renters"],
    notFor:["Delicate or antique rugs","Heavy commercial soiling"],
    pickups:{ TO:"Canadian Tire Downtown (0.5mi) · Sobeys Toronto (1.0mi)", VA:"Canadian Tire Vancouver (0.6mi) · Sobeys West End (1.2mi)", MO:"Canadian Tire Montreal (0.4mi) · IGA Montreal (0.9mi)", def:"Your nearest Canadian Tire · Sobeys · IGA" }},
  { id:2, name:"Bissell BigGreen",        brand:"Bissell",    logo:"Bi", col:"#1565C0",
    price:45, weekend:60, deposit:0,  delivery:false, solution:true,  inStock:true,
    rating:4.5, reviews:12800, badge:"Pro Grade", cpa:0.08,
    feats:["No deposit","Large capacity","Home Depot Canada"],
    bestFor:["Large homes","Multiple rooms","Deep cleaning"],
    notFor:["Quick light cleans","Budget-conscious renters"],
    pickups:{ TO:"Home Depot Toronto (0.8mi)", VA:"Home Depot Vancouver (0.7mi)", MO:"Home Depot Montreal (0.6mi)", def:"Your nearest Home Depot Canada" }},
  { id:3, name:"Hoover SmartWash",       brand:"Hoover",     logo:"Hv", col:"#E65100",
    price:28, weekend:38, deposit:0,  delivery:false, solution:true,  inStock:true,
    rating:4.2, reviews:9600, badge:"Best Value", cpa:0.07,
    feats:["No deposit","Pet formula","Walmart Canada"],
    bestFor:["Pet owners","Budget renters","Light to medium soiling"],
    notFor:["Very large areas","Professional use"],
    pickups:{ TO:"Walmart Toronto (0.6mi)", VA:"Walmart Vancouver (0.7mi)", MO:"Walmart Montreal (0.5mi)", def:"Your nearest Walmart Canada" }},
  { id:4, name:"Kärcher Puzzi 10/1",     brand:"Kärcher",    logo:"K",  col:"#F5A800",
    price:60, weekend:80, deposit:70, delivery:true,  solution:false, inStock:true,
    rating:4.4, reviews:6200, badge:"Industrial", cpa:0.09,
    feats:["Delivery available","Industrial suction","Any solution"],
    bestFor:["Heavily soiled carpets","Landlords","Contractors"],
    notFor:["Budget renters","Quick same-day jobs"],
    pickups:{ TO:"Delivery Toronto (+CA$18)", VA:"Delivery Vancouver (+CA$18)", MO:"Delivery Montreal (+CA$18)", def:"Available via delivery only (+CA$18) · Call ahead" }},
  { id:5, name:"Bissell ProHeat 2X Pet", brand:"Bissell",    logo:"B2", col:"#2E7D32",
    price:32, weekend:44, deposit:0,  delivery:false, solution:true,  inStock:true,
    rating:4.3, reviews:11200, badge:"Pet Specialist", cpa:0.08,
    feats:["No deposit","Pet odour formula","PetSmart Canada"],
    bestFor:["Homes with pets","Pet stains & odours","Family homes"],
    notFor:["Commercial use","Chemical-free requirements"],
    pickups:{ TO:"PetSmart Toronto (0.5mi) · Walmart Toronto (0.6mi)", VA:"PetSmart Vancouver (0.4mi) · Walmart Vancouver (0.7mi)", MO:"PetSmart Montreal (0.6mi) · Walmart Montreal (0.5mi)", def:"Your nearest PetSmart Canada · Walmart Canada" }},
];

// US postcode detection (zip code prefix → city key)
function detectUSCity(zip) {
  const z = zip.replace(/\D/g,"").slice(0,3);
  const n = parseInt(z);
  if(n>=100&&n<=119) return "NY";
  if(n>=900&&n<=919) return "LA";
  if(n>=606&&n<=606) return "CH";
  return null;
}
function detectUSCityName(zip) {
  const k=detectUSCity(zip);
  return k==="NY"?"New York":k==="LA"?"Los Angeles":k==="CH"?"Chicago":null;
}

// CA postcode detection (FSA prefix → city key)
function detectCACity(pc) {
  const u=pc.toUpperCase().replace(/\s/g,"");
  if(u.startsWith("M")) return "TO";
  if(u.startsWith("V")) return "VA";
  if(u.startsWith("H")) return "MO";
  return null;
}
function detectCACityName(pc) {
  const k=detectCACity(pc);
  return k==="TO"?"Toronto":k==="VA"?"Vancouver":k==="MO"?"Montreal":null;
}

function getMachinesForRegion(region){
  if(region==="US") return MACHINES_US;
  if(region==="CA") return MACHINES_CA;
  return MACHINES;
}

function detectLocationForRegion(pc, region){
  if(region==="UK") return { key:detectPCKey(pc), name:detectCityName(pc) };
  if(region==="US") return { key:detectUSCity(pc), name:detectUSCityName(pc) };
  if(region==="CA") return { key:detectCACity(pc), name:detectCACityName(pc) };
  return { key:null, name:null };
}

// ─── LOCAL INDEPENDENT HIRE SHOPS ─────────────────────────
// Real verified UK hire businesses — addresses and phones from their websites
// Monetised via £39/month listing fee + £3/lead + £2/call tracking
const LOCAL_SHOPS = [
  // ── LONDON ──────────────────────────────────────────────
  { id:1,
    name:"London Plant Hire — Finchley",
    city:"London", area:"N12, N3, N2, NW11, EN5",
    address:"585–587 High Road, Finchley, London N12 0DY",
    phone:"020 8446 4231",
    website:"londonplanthire.co.uk",
    rating:4.7, reviews:284,
    machines:["Numatic CT370 Carpet Cleaner","Upholstery attachment","Carpet dryer"],
    price_from:25, deposit:100, open:"Mon–Fri 7:30am–4pm · Sat–Sun Closed (weekend hire at Fri 2pm rate)",
    verified:true, insured:true, plan:"standard", badge:"Local Favourite",
    about:"Independent hire centre open since 1976 — 48 years serving North London. Numatic carpet extraction machine with full wash kit and 10M cable. Weekend hire available at the 2-day rate. Power tool repair and testing also on site.",
    services:["Carpet cleaner hire","Upholstery attachment hire","Pressure washer hire","Power tool repair"],
    col:"#1565C0" },
  { id:2,
    name:"Best at Hire — Camden",
    city:"London", area:"NW1, N1, N7, WC1, EC1",
    address:"Blundell Street, Camden, London N7 (off A5203 near HMP Pentonville)",
    phone:"0344 288 8088",
    website:"bestathire.co.uk",
    rating:4.6, reviews:341,
    machines:["Kärcher Domestic Carpet Cleaner","Industrial Upright Carpet Cleaner","Dehumidifier"],
    price_from:28, deposit:0, open:"Mon–Thu 7am–5pm · Fri 7am–6pm · Sat–Sun Closed",
    verified:true, insured:true, plan:"standard", badge:"Top Rated",
    about:"North London depot on Blundell Street. Kärcher domestic and industrial upright carpet cleaners in stock. Pre-spray shampoo, pet guard formula, stain remover and odour remover all available at checkout. Guaranteed in stock. Free delivery to Kings Cross, Farringdon, Covent Garden, Mayfair, Finchley and Walthamstow.",
    services:["Carpet cleaner hire","Upholstery cleaning hire","Free delivery available","Click & collect","Cleaning fluids stocked"],
    col:"#2E7D32" },
  { id:3,
    name:"LVC Cleaning Machines — Watford (serves London)",
    city:"London", area:"WD, HA, UB, NW10, W5 and delivery across London",
    address:"Unit 4 Brookside, Colne Way Industrial Estate, Watford, WD24 7QJ",
    phone:"01923 445 550",
    website:"lvcuk.com",
    rating:4.5, reviews:198,
    machines:["Professional spray extractor","Commercial carpet cleaner","Upholstery machine","Steam cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 8am–5pm · Call for weekend availability",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Over 25 years specialist experience in professional cleaning machine hire. Commercial and domestic carpet cleaners, spray extractors and upholstery machines. Serves London and surrounding areas with delivery. Expert advice on which machine suits your job. Discounted rates for customers having machines repaired.",
    services:["Commercial carpet cleaner hire","Spray extractor hire","Upholstery machine hire","Delivery across London","Machine repair service"],
    col:"#6A1B9A" },
  { id:4,
    name:"HSS Hire — Park Royal",
    city:"London", area:"NW10, W3, W5, UB",
    address:"1 Radford Industrial Estate, Goodhall Street, Park Royal, London NW10 6UA",
    phone:"0345 728 2828",
    website:"https://tidd.ly/4tz3c7a",
    rating:4.3, reviews:188,
    machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"West London depot serving Ealing, Park Royal and surrounding areas. Kärcher and Bissell carpet cleaners, walk-in or book online. Delivery available across West London.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery available"],
    col:"#1565C0" },
  { id:5,
    name:"Cleaning Machines For Hire UK — Essex/London",
    city:"London", area:"E, EC, IG, RM, CM, SS and delivery across London",
    address:"Based in Essex — delivery and hire across London and East London",
    phone:"01279 422 220",
    website:"cleaningmachinesforhire.com",
    rating:4.6, reviews:142,
    machines:["Mytee Speedster","ICE carpet extractor","Mytee-Lite upholstery","Professional extraction machines"],
    price_from:32, deposit:0, open:"Mon–Fri 8am–5:30pm · Call for advice",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Over 25 years specialist experience. Commercial-grade Mytee and ICE carpet extraction machines. Perfect for landlords, letting agents and commercial premises. Free advice on which machine suits your job. Flexible daily, weekly, monthly and yearly hire periods.",
    services:["Professional carpet extractor hire","Upholstery hire","Delivery across London","Trade and commercial hire","Free expert advice"],
    col:"#E65100" },
  { id:6,
    name:"Best at Hire — West Hampstead",
    city:"London", area:"NW6, NW3, NW8, NW10, W9",
    address:"104 Mill Lane, West Hampstead, London NW6 1NF",
    phone:"0344 288 8088",
    website:"bestathire.co.uk",
    rating:4.6, reviews:187,
    machines:["Kärcher Domestic Carpet Cleaner","Industrial Upright Carpet Cleaner","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Thu 7am–5pm · Fri 7am–6pm · Sat–Sun Closed",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station depot at 104 Mill Lane, West Hampstead. Kärcher domestic and industrial upright carpet cleaners guaranteed in stock. Pre-spray shampoo, pet guard formula, stain and odour remover all available. Free delivery across NW London.",
    services:["Carpet cleaner hire","Upholstery cleaning hire","Carpet dryer hire","Free delivery NW London","Cleaning fluids stocked"],
    col:"#2E7D32" },
  { id:7,
    name:"Best at Hire — Canning Town",
    city:"London", area:"E16, E13, E14, E6, IG11",
    address:"Canning Town, East London — click & collect, pre-order required",
    phone:"020 3504 4220",
    website:"bestathire.co.uk",
    rating:4.5, reviews:143,
    machines:["Kärcher Domestic Carpet Cleaner","Industrial Carpet Cleaner","Carpet & floor dryer"],
    price_from:28, deposit:0, open:"Mon–Thu 7am–5pm · Fri 7am–6pm · Pre-order required",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"East London depot serving Canning Town, Stratford, Barking, Ilford and surrounding areas. Kärcher domestic and industrial upright carpet cleaners. Delivery and click & collect available — pre-order by phone or online. Cleaning fluids stocked on site.",
    services:["Carpet cleaner hire","Industrial carpet cleaner hire","Delivery East London","Click & collect","Cleaning fluids"],
    col:"#2E7D32" },
  { id:8,
    name:"Alliance Tool Hire — Canning Town",
    city:"London", area:"E16, E14, E15, E13, SE10",
    address:"Units 13 & 14 Crescent Court Business Centre, North Crescent, Canning Town, London E16 4TG",
    phone:"020 7511 6388",
    website:"alliancetoolhire.com",
    rating:4.7, reviews:226,
    machines:["Carpet cleaner","Upholstery cleaner","Industrial extraction machines"],
    price_from:30, deposit:0, open:"Mon–Fri 7:30am–5pm · Sat by appointment",
    verified:true, insured:true, plan:"standard", badge:"Highly Rated",
    about:"Genuinely independent hire company with roots going back to London Tool Hire. Woman-led business (CEO Beth Peters). Carpet cleaners, upholstery and extraction machines. Excellent customer service — known for going the extra mile. Also serves South East London.",
    services:["Carpet cleaner hire","Upholstery machine hire","Industrial extraction","Delivery East & SE London","Trade accounts"],
    col:"#C62828" },
  { id:9,
    name:"Alliance Tool Hire — Willesden",
    city:"London", area:"NW10, NW2, W10, W12, HA0, HA9",
    address:"Unit 1 & 2 Cygnus Business Park, Willesden, London NW10 2XA",
    phone:"020 8452 5005",
    website:"alliancetoolhire.com",
    rating:4.6, reviews:189,
    machines:["Carpet cleaner","Upholstery cleaner","Industrial extraction"],
    price_from:30, deposit:0, open:"Mon–Fri 7:30am–5pm · Sat by appointment",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Alliance's West London depot at Cygnus Business Park, Willesden. Carpet and upholstery cleaners for domestic and commercial use. Independent company with decades of experience serving the construction and domestic hire market across West London.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery West London","Trade accounts"],
    col:"#C62828" },
  { id:10,
    name:"Herts Tool Company — St Albans (serves North London)",
    city:"London", area:"N20, N14, EN1–EN8, WD, AL, SG and North London delivery",
    address:"Lyon Way, St Albans, Hertfordshire AL4 0LR",
    phone:"01727 832131",
    website:"hertstools.co.uk",
    rating:4.7, reviews:312,
    machines:["Domestic carpet cleaner","Industrial spray-extraction cleaner","Upholstery cleaner","Ride-on scrubber dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 9am–12pm · Sun Closed",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Over 40 years experience. Three levels of carpet cleaner hire — domestic, medium-duty industrial and commercial ride-on. Serves North London, Hertfordshire, Enfield, Barnet and surrounding areas with same-day and next-day delivery. 60-day credit accounts available. Expert advice on which machine suits your job.",
    services:["Domestic carpet cleaner hire","Industrial carpet cleaner hire","Upholstery cleaner hire","Same-day & next-day delivery","Trade credit accounts","Expert advice"],
    col:"#37474F" },
  // ── MILTON KEYNES ─────────────────────────────────────────
  { id:233, name:"Mammoth Hire — Milton Keynes",
    city:"Milton Keynes", area:"MK1–MK19, Northampton, Luton, Bedford",
    address:"Online booking — delivery to Milton Keynes. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:156, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper. Free delivery Milton Keynes. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery MK","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:234, name:"National Tool Hire — Milton Keynes",
    city:"Milton Keynes", area:"MK1–MK19, Northampton, Luton, Aylesbury",
    address:"Milton Keynes — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:134, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Milton Keynes. 2,000+ partner stores. Rated Excellent on Trustpilot.",
    services:["Carpet cleaner hire","Free delivery MK","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:21,
    name:"HSS Hire at Selco — Milton Keynes",
    city:"Milton Keynes", area:"MK1, MK2, MK3, MK4, MK6, MK9",
    address:"Denbigh Road, Bletchley, Milton Keynes MK1 1DF",
    phone:"01908 489400",
    website:"https://tidd.ly/4tz3c7a",
    rating:4.5, reviews:167,
    machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–4:30pm · Sat 8am–12pm · Sun Closed",
    verified:true, insured:true, plan:"standard", badge:"Top Rated",
    about:"HSS Hire desk located inside Selco Bletchley. Kärcher and Bissell carpet cleaners available for same-day collection. Click & Collect or delivery available. Part of the UK's largest tool hire network. Friendly staff, competitive pricing.",
    services:["Carpet cleaner hire","Click & collect","Delivery available","Kärcher Puzzi in stock","Carpet dryer hire"],
    col:"#1565C0" },
  { id:22,
    name:"Best at Hire — Bedford (serves Milton Keynes)",
    city:"Milton Keynes", area:"MK, LU, NN, SG, Bedford and surrounding areas",
    address:"Windsor Road, Bedford (Click & Collect — pre-order required) · Delivery to MK from £10+VAT",
    phone:"0344 288 8088",
    website:"bestathire.co.uk",
    rating:4.6, reviews:203,
    machines:["Kärcher Domestic Carpet Cleaner","Industrial Upright Carpet Cleaner","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Thu 7am–5pm · Fri 7am–6pm · Pre-order required for Click & Collect",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Serving Milton Keynes with next-day delivery and Click & Collect from Bedford branch. Kärcher carpet cleaners guaranteed in stock. Covers Bletchley, Buckingham, Leighton Buzzard, Wolverton, Newport Pagnell, Stony Stratford, Towcester and Olney. Cleaning fluids, pet formula and stain remover available.",
    services:["Carpet cleaner hire","Delivery to Milton Keynes from £10+VAT","Click & Collect from Bedford","Cleaning fluids","Pet formula stocked"],
    col:"#2E7D32" },
  { id:23,
    name:"Hire MK — Milton Keynes",
    city:"Milton Keynes", area:"MK1–MK19",
    address:"Milton Keynes — call or book online at hiremk.co.uk",
    phone:"See hiremk.co.uk",
    website:"hiremk.co.uk",
    rating:4.4, reviews:88,
    machines:["Carpet cleaner","Upholstery cleaner","Floor care equipment"],
    price_from:25, deposit:0, open:"Call or book online — check website for current hours",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Local Milton Keynes tool hire specialists. DIY and trade carpet cleaner hire across MK. Book online or call for availability. Local independent business.",
    services:["Carpet cleaner hire","Tool hire","MK delivery available"],
    col:"#37474F" },
  { id:24,
    name:"Speedy Hire — Milton Keynes",
    city:"Milton Keynes", area:"MK11, MK1–MK19, NN12",
    address:"Carters Lane, Milton Keynes MK11 3EU",
    phone:"0330 123 3031",
    website:"speedyservices.com",
    rating:4.4, reviews:156,
    machines:["Kärcher carpet cleaner","Industrial carpet cleaner","Carpet dryer"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Milton Keynes depot at Carters Lane MK11 3EU. Kärcher and industrial carpet cleaners in stock. Delivery across Milton Keynes and surrounding areas. One of the UK's largest hire networks with over 200 depots nationwide.",
    services:["Carpet cleaner hire","Industrial cleaner hire","Delivery across MK","Click & collect","Floor care hire"],
    col:"#1565C0" },,

  // ── PHASE 1 EXPANSION ──────────────
// ── BIRMINGHAM ──────────────────────────────────────────────
  { id:228, name:"Mammoth Hire — Birmingham",
    city:"Birmingham", area:"B1–B45, Solihull, Coventry, West Midlands",
    address:"Online booking — delivery to Birmingham. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:198, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper. Free delivery Birmingham and West Midlands. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Birmingham","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:229, name:"National Tool Hire — Birmingham",
    city:"Birmingham", area:"B1–B45, West Midlands, Solihull",
    address:"Birmingham — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:156, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Birmingham and West Midlands. 2,000+ partner stores.",
    services:["Carpet cleaner hire","Free delivery Birmingham","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:101, name:"HSS Hire — Birmingham Aston",
    city:"Birmingham", area:"B6, B7, B19, B21, B1–B5",
    address:"50 Lichfield Road, Aston, Birmingham B6 5SJ",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.4, reviews:198,
    machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Birmingham Aston depot on Lichfield Road. Kärcher and Bissell carpet cleaners for same-day collection. Delivery available across Birmingham and surrounding areas.",
    services:["Carpet cleaner hire","Floor care hire","Delivery Birmingham","Click & collect"],
    col:"#1565C0" },
  { id:102, name:"Brandon Hire Station — Birmingham",
    city:"Birmingham", area:"B1–B45, Solihull, Coventry",
    address:"Brandon Hire Birmingham — call or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.5, reviews:156,
    machines:["Kärcher Puzzi","Bissell BG10","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Birmingham. Professional carpet cleaning machines for domestic and commercial use. Book online or by phone. Delivery across Birmingham.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Birmingham","Click & collect"],
    col:"#2E7D32" },
  { id:103, name:"Speedy Hire — Birmingham",
    city:"Birmingham", area:"B1–B45, B63, B64, DY",
    address:"Birmingham depot — call 0330 123 3031 for nearest branch",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:142,
    machines:["Kärcher carpet cleaner","Industrial carpet cleaner","Upholstery cleaner"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Birmingham. Kärcher and industrial carpet cleaners from one of the UK's largest hire networks. Delivery and click & collect available.",
    services:["Carpet cleaner hire","Floor care hire","Delivery Birmingham","Click & collect"],
    col:"#E65100" },

  // ── MANCHESTER ──────────────────────────────────────────────
  { id:226, name:"Mammoth Hire — Manchester",
    city:"Manchester", area:"M1–M44, Salford, Trafford, Stockport",
    address:"Online booking — delivery to Manchester. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:178, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper. Free delivery Manchester. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Manchester","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:227, name:"National Tool Hire — Manchester",
    city:"Manchester", area:"M1–M44, Greater Manchester",
    address:"Manchester — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:134, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Manchester and Greater Manchester. 2,000+ partner stores.",
    services:["Carpet cleaner hire","Free delivery Manchester","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:104, name:"HSS Hire — Manchester Piccadilly",
    city:"Manchester", area:"M1, M4, M12, M13, M14",
    address:"Units 25–27 Piccadilly Trading Estate, Great Ancoats Street, Manchester M1 2NP",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.5, reviews:224,
    machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:34, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5:30pm",
    verified:true, insured:true, plan:"standard", badge:"Top Rated",
    about:"City centre depot on Great Ancoats Street. Kärcher and Bissell carpet cleaners in stock daily. Trade accounts available. Delivery across Greater Manchester.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Manchester"],
    col:"#E65100" },
  { id:105, name:"Smiths Hire — Trafford",
    city:"Manchester", area:"M17, M16, M32, WA1–WA16",
    address:"Trafford Park, Manchester — call 0330 822 3992 for address",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.7, reviews:156,
    machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Award-winning independent hire group — over 50 years in business. Kärcher, Bissell and Numatic carpet cleaners. 18 centres across the North West.",
    services:["Carpet cleaner hire","Upholstery hire","Floor care hire","Trade accounts"],
    col:"#2E7D32" },
  { id:106, name:"Smiths Hire — Warrington (serves Manchester)",
    city:"Manchester", area:"WA1–WA16, M44, SK",
    address:"Warrington depot — call 0330 822 3992 for address",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:134,
    machines:["Kärcher","Bissell","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Smiths Hire Warrington serving Greater Manchester and Cheshire. Kärcher, Bissell and Numatic carpet cleaners. Over 50 years in business.",
    services:["Carpet cleaner hire","Tool hire","Delivery available"],
    col:"#2E7D32" },

  // ── LEEDS ─────────────────────────────────────────────────
  { id:220, name:"Mammoth Hire — Leeds",
    city:"Leeds", area:"LS1–LS28, Bradford, Wakefield, Harrogate",
    address:"Online booking — delivery to Leeds. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:178, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper. Free delivery Leeds and West Yorkshire. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Leeds","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:221, name:"Best at Hire — Leeds",
    city:"Leeds", area:"LS1–LS28, Bradford, Wakefield, Harrogate",
    address:"Leeds — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:156, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Leeds and West Yorkshire.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Leeds"],
    col:"#1565C0" },
  { id:222, name:"National Tool Hire — Leeds",
    city:"Leeds", area:"LS1–LS28, West Yorkshire",
    address:"Leeds — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:134, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Leeds and West Yorkshire. 2,000+ partner stores.",
    services:["Carpet cleaner hire","Free delivery Leeds","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:107, name:"Smiths Hire — Leeds Gildersome",
    city:"Leeds", area:"LS27, LS1, LS11, LS12, LS13",
    address:"Unit 11 Overland Park, Gelderd Road, Gildersome, Leeds LS27 7JP",
    phone:"0113 487 8555", website:"smithshire.com",
    rating:4.8, reviews:203,
    machines:["Kärcher Puzzi 10/1","Bissell BG10","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"Local Favourite",
    about:"Smiths Hire Leeds depot. One of 18 centres across the North West and Yorkshire. Kärcher, Bissell and Numatic machines. Free demo on request.",
    services:["Carpet cleaner hire","Industrial cleaning hire","Pressure washer hire","Delivery Leeds"],
    col:"#37474F" },
  { id:108, name:"MF Hire — Leeds Morley",
    city:"Leeds", area:"LS27, LS28, WF, BD",
    address:"Howley Park Road East, Morley, Leeds LS27 0SW",
    phone:"0113 238 0646", website:"mfhgroup.co.uk",
    rating:4.5, reviews:94,
    machines:["Professional carpet cleaner","Kärcher","Upholstery cleaner"],
    price_from:25, deposit:25, open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Family-run hire centre serving West Yorkshire since 1988. Call ahead to check stock. Delivery available within 10 miles.",
    services:["Carpet cleaner hire","Upholstery cleaner hire","Tool hire"],
    col:"#6A1B9A" },

  // ── SHEFFIELD ─────────────────────────────────────────────
  { id:223, name:"Mammoth Hire — Sheffield",
    city:"Sheffield", area:"S1–S35, Rotherham, Barnsley, Doncaster",
    address:"Online booking — delivery to Sheffield. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:156, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper. Free delivery Sheffield and South Yorkshire. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Sheffield","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:224, name:"Best at Hire — Sheffield",
    city:"Sheffield", area:"S1–S35, Rotherham, Barnsley",
    address:"Sheffield — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:134, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Sheffield and South Yorkshire.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Sheffield"],
    col:"#1565C0" },
  { id:225, name:"National Tool Hire — Sheffield",
    city:"Sheffield", area:"S1–S35, South Yorkshire, Rotherham",
    address:"Sheffield — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:112, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Sheffield and South Yorkshire. 2,000+ partner stores.",
    services:["Carpet cleaner hire","Free delivery Sheffield","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:109, name:"MF Hire — Sheffield",
    city:"Sheffield", area:"S1, S2, S8, S11, S17",
    address:"38 East Bank Road, Sheffield S2 3PS",
    phone:"0114 275 0431", website:"mfhgroup.co.uk",
    rating:4.6, reviews:118,
    machines:["Professional carpet cleaner","Kärcher Puzzi","Upholstery cleaner"],
    price_from:25, deposit:25, open:"Mon–Fri 7:30am–5pm · Sat 8am–12pm",
    verified:true, insured:true, plan:"standard", badge:"Best Value",
    about:"Sheffield's independent hire shop for carpet and upholstery machines. Trade and domestic. Real address: 38 East Bank Road S2 3PS.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Sheffield"],
    col:"#C62828" },
  { id:110, name:"Speedy Hire — Doncaster (serves Sheffield)",
    city:"Sheffield", area:"DN1–DN12, S63, S64, S70–S74",
    address:"Unit 1 Sandall House, Sandall Stones Road, Kirk Sandall Industrial Estate, Doncaster DN3 1QR",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:62,
    machines:["Kärcher carpet cleaner","Industrial carpet cleaner"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Doncaster covering South Yorkshire. Real address: Sandall Stones Road DN3 1QR. Delivery available.",
    services:["Carpet cleaner hire","Floor care hire","Delivery South Yorkshire"],
    col:"#C62828" },

  // ── BIRMINGHAM EXTRA ───────────────────────────────────────
  { id:113, name:"Smiths Hire — Birmingham (via Leeds)",
    city:"Birmingham", area:"B1–B45, DY, WV",
    address:"Serving Birmingham from regional depots — call 0330 822 3992",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:112,
    machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Smiths Hire serving Birmingham and the West Midlands. Award-winning independent hire group with 18 centres. Over 50 years in business. Delivery available.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery West Midlands","Trade accounts"],
    col:"#2E7D32" },,

  // ── MANCHESTER EXTRA ───────────────────────────────────────
  { id:115, name:"HSS Hire — Manchester Trafford Park",
    city:"Manchester", area:"M17, M16, M5, Salford, Stretford",
    address:"Building 2, Think Park, Mosley Road, Trafford Park, Manchester M17 1FQ",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.5, reviews:178,
    machines:["Kärcher Puzzi 10/1","Bissell BG10","Pressure washer"],
    price_from:34, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire main Manchester depot at Think Park, Trafford. Carpet cleaners and pressure washers for same-day collection. Real address: Think Park M17 1FQ.",
    services:["Carpet cleaner hire","Pressure washer hire","Click & collect","Delivery Manchester"],
    col:"#1565C0" },
  { id:116, name:"Speedy Hire — Manchester Ardwick",
    city:"Manchester", area:"M12, M1, M11, M13, Ardwick",
    address:"Unit 1-3, Downing Street Industrial Estate, Charlton Place, Ardwick, Manchester M12 6HH",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.4, reviews:134,
    machines:["Kärcher pressure washer","Carpet cleaner","Industrial cleaner"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Manchester Ardwick. Real address: Downing Street Industrial Estate, Charlton Place M12 6HH. Carpet cleaners and Kärcher pressure washers in stock.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Manchester","Click & collect"],
    col:"#E65100" },

  // ── LEEDS EXTRA ─────────────────────────────────────────────
  { id:117, name:"HSS Hire — Leeds",
    city:"Leeds", area:"LS1–LS28, Bradford, Wakefield",
    address:"Leeds branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.4, reviews:156,
    machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Leeds. Kärcher and Bissell carpet cleaners for same-day collection. Delivery across West Yorkshire. Click & collect or delivery.",
    services:["Carpet cleaner hire","Floor care hire","Delivery Leeds","Click & collect"],
    col:"#1565C0" },
  { id:118, name:"Brandon Hire Station — Leeds",
    city:"Leeds", area:"LS1–LS28, BD, WF",
    address:"Leeds depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.4, reviews:98,
    machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Leeds. Professional carpet cleaning machines for domestic and commercial use. Delivery across Leeds and West Yorkshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Leeds","Click & collect"],
    col:"#2E7D32" },

  // ── SHEFFIELD EXTRA ─────────────────────────────────────────
  { id:119, name:"HSS Hire — Sheffield",
    city:"Sheffield", area:"S1–S35, Rotherham, Barnsley",
    address:"Sheffield branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.3, reviews:87,
    machines:["Kärcher Puzzi 10/1","Bissell BG10"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Sheffield. Kärcher and Bissell carpet cleaners. Delivery across South Yorkshire. Click & collect or delivery.",
    services:["Carpet cleaner hire","Floor care hire","Delivery Sheffield","Click & collect"],
    col:"#1565C0" },
  { id:120, name:"Brandon Hire Station — Sheffield",
    city:"Sheffield", area:"S1–S35, DN, Doncaster",
    address:"Sheffield depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.3, reviews:72,
    machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Sheffield. Carpet cleaning machines for domestic and commercial use. Delivery across Sheffield and South Yorkshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Sheffield"],
    col:"#2E7D32" },

  // ── BRISTOL ───────────────────────────────────────────────
  { id:204, name:"Mammoth Hire — Bristol",
    city:"Bristol", area:"BS1–BS16, BS20, BS22, BS32, BS34, BS35",
    address:"Online booking — delivery to Bristol. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:178, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper than competition. Free delivery Bristol. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Bristol","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:205, name:"Best at Hire — Bristol",
    city:"Bristol", area:"BS1–BS16, BS20, BS32, BS35",
    address:"Bristol — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:178, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Bristol and South Gloucestershire.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Bristol"],
    col:"#1565C0" },
  { id:206, name:"National Tool Hire — Bristol",
    city:"Bristol", area:"BS1–BS16, South Gloucestershire, North Somerset",
    address:"Bristol — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:134, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Bristol. 2,000+ partner stores. Rated Excellent on Trustpilot.",
    services:["Carpet cleaner hire","Free delivery Bristol","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:207, name:"Smiths Hire — Bristol",
    city:"Bristol", area:"BS1–BS16, Bath, South Gloucestershire",
    address:"Bristol — call 0330 822 3992 or visit smithshire.com",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:134, machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"50 Years",
    about:"Award-winning independent hire group, 50+ years. Bristol, Bath and surrounding areas.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Bristol","Trade accounts"],
    col:"#C62828" },
  { id:1101, name:"Speedy Hire — Bristol",
    city:"Bristol", area:"BS1–BS16, BS20, BS32, BS34",
    address:"Bristol depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:98, machines:["Kärcher carpet cleaner","Industrial carpet cleaner"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Bristol. Carpet cleaners and pressure washers. Delivery across Bristol and South Gloucestershire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Bristol"],
    col:"#E65100" },
  { id:111, name:"Brandon Hire Station — Bristol",
    city:"Bristol", area:"BS1–BS16, BS32, BS34, BS35",
    address:"Bristol depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.4, reviews:108,
    machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Bristol serving BS postcodes and surrounding areas. Professional carpet cleaning machines for domestic and commercial use.",
    services:["Carpet cleaner hire","Upholstery hire","Click & collect","Delivery Bristol"],
    col:"#2E7D32" },
  { id:112, name:"HSS Hire — Bristol",
    city:"Bristol", area:"BS1–BS16, BS20, BS22, BS48",
    address:"Bristol branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.3, reviews:134,
    machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Bristol serving the South West. Kärcher and Bissell carpet cleaners. Delivery across Bristol and surrounding areas.",
    services:["Carpet cleaner hire","Floor care hire","Delivery Bristol","Click & collect"],
    col:"#1565C0" },

  // ── M1 CORRIDOR HIRE SHOPS ─────────────────────────────────
  { id:130, name:"HSS Hire — Luton",
    city:"Luton", area:"LU1–LU7, Dunstable, Harpenden",
    address:"Luton branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.4, reviews:112, machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Luton. Kärcher and Bissell carpet cleaners for same-day collection. Delivery across Bedfordshire.",
    services:["Carpet cleaner hire","Delivery Luton","Click & collect"],
    col:"#1565C0" },
  { id:154, name:"Mammoth Hire — Luton",
    city:"Luton", area:"LU1–LU7, Dunstable, Harpenden, Hemel Hempstead",
    address:"Online booking — delivery to Luton. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:156, machines:["Kärcher carpet washer","Carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper than competition. Free delivery Luton. Same-day if ordered before noon. mammoth-hire.co.uk/tool-hire-in-luton",
    services:["Carpet cleaner hire","Free delivery Luton","Online 24/7","Kärcher hire"],
    col:"#2E7D32" },
  { id:239, name:"Smiths Hire — Luton & Bedfordshire",
    city:"Luton", area:"LU1–LU7, Dunstable, Harpenden, Stevenage, Bedford",
    address:"Luton — call 0330 822 3992 or visit smithshire.com",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:112, machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"50 Years",
    about:"Award-winning hire group, 50+ years. Luton, Dunstable and surrounding Bedfordshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Luton","Trade accounts"],
    col:"#37474F" },
  { id:155, name:"Granville Tool Hire — Luton",
    city:"Luton", area:"LU1–LU7, Dunstable, Bedfordshire",
    address:"Luton — call or visit granvilletoolhire.com for address",
    phone:"See granvilletoolhire.com", website:"granvilletoolhire.com",
    rating:4.8, reviews:198, machines:["Carpet cleaner","Upholstery cleaner","Pressure washer"],
    price_from:28, deposit:0, open:"Mon–Sat — check website for hours",
    verified:true, insured:true, plan:"standard", badge:"Family Run Since 1978",
    about:"Luton family business established 1978. Carpet cleaners, pressure washers. Collect from Luton store or delivery. granvilletoolhire.com",
    services:["Carpet cleaner hire","Pressure washer hire","Collect from store","Delivery Luton"],
    col:"#37474F" },
  { id:156, name:"Best at Hire — Luton",
    city:"Luton", area:"LU1–LU7, Dunstable, Stevenage, Harpenden, Hemel Hempstead",
    address:"Luton — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:178, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, patio cleaners, floor sanders. Same/next day delivery Luton and surrounding areas. 0344 288 8088. bestathire.co.uk",
    services:["Carpet cleaner hire","Patio cleaner hire","Floor sander hire","Delivery Luton"],
    col:"#1565C0" },
  { id:157, name:"National Tool Hire — Luton",
    city:"Luton", area:"LU1–LU7, Dunstable, Hemel Hempstead, Stevenage",
    address:"Luton — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:134, machines:["Kärcher carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery to Luton. Kärcher carpet cleaners. 2,000+ partner stores nationwide. Rated Excellent on Trustpilot. nationaltoolhireshops.co.uk/tool-hire/Luton",
    services:["Carpet cleaner hire","Free delivery Luton","Pressure washer hire","Online booking"],
    col:"#C62828" },
  { id:131, name:"Speedy Hire — Luton",
    city:"Luton", area:"LU1–LU7, MK, SG",
    address:"Luton depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:89, machines:["Kärcher carpet cleaner","Industrial carpet cleaner"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Luton. Kärcher carpet cleaners and pressure washers. Delivery across Bedfordshire and Hertfordshire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Luton"],
    col:"#E65100" },
  { id:212, name:"Mammoth Hire — Northampton",
    city:"Northampton", area:"NN1–NN6, Wellingborough, Kettering, Daventry",
    address:"Online booking — delivery to Northampton. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:134, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper. Free delivery Northampton. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Northampton","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:213, name:"National Tool Hire — Northampton",
    city:"Northampton", area:"NN1–NN6, Wellingborough, Kettering",
    address:"Northampton — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:112, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Northampton and Northamptonshire. 2,000+ partner stores.",
    services:["Carpet cleaner hire","Free delivery Northampton","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:214, name:"Smiths Hire — Northampton",
    city:"Northampton", area:"NN1–NN6, Wellingborough, Kettering, Daventry",
    address:"Northampton — call 0330 822 3992 or visit smithshire.com",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:112, machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"50 Years",
    about:"Award-winning hire group, 50+ years. Northampton and Northamptonshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Northampton","Trade accounts"],
    col:"#C62828" },
  { id:215, name:"Best at Hire — Northampton",
    city:"Northampton", area:"NN1–NN6, Wellingborough, Kettering, Milton Keynes",
    address:"Northampton — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:134, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Northampton.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Northampton"],
    col:"#1565C0" },
  { id:1321, name:"Brandon Hire Station — Northampton",
    city:"Northampton", area:"NN1–NN6, Wellingborough, Kettering, Daventry",
    address:"Northampton depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.4, reviews:112, machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Northampton. Carpet cleaners and upholstery machines. Delivery across Northamptonshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Northampton","Click & collect"],
    col:"#2E7D32" },
  { id:1322, name:"Speedy Hire — Northampton",
    city:"Northampton", area:"NN1–NN6, Wellingborough NN8, Kettering NN15",
    address:"Northampton depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:87, machines:["Kärcher carpet cleaner","Industrial carpet cleaner"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Northampton. Carpet cleaners and pressure washers. Delivery across Northamptonshire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Northampton"],
    col:"#E65100" },
  { id:132, name:"HSS Hire — Northampton",
    city:"Northampton", area:"NN1–NN6, Wellingborough, Kettering",
    address:"Northampton branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.4, reviews:134, machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Northampton. Kärcher and Bissell carpet cleaners. Delivery across Northamptonshire.",
    services:["Carpet cleaner hire","Delivery Northampton","Click & collect"],
    col:"#1565C0" },
  { id:133, name:"HSS Hire — Leicester",
    city:"Leicester", area:"LE1–LE19, Loughborough, Hinckley",
    address:"Leicester branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.4, reviews:178, machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Leicester. Kärcher and Bissell carpet cleaners. Delivery across Leicestershire.",
    services:["Carpet cleaner hire","Delivery Leicester","Click & collect"],
    col:"#1565C0" },
  { id:165, name:"Brandon Hire Station — Leicester",
    city:"Leicester", area:"LE1–LE19, Loughborough LE11, Hinckley LE10",
    address:"Leicester depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.4, reviews:134, machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Leicester. Carpet cleaners and upholstery machines. Delivery across Leicestershire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Leicester","Click & collect"],
    col:"#2E7D32" },
  { id:166, name:"Mammoth Hire — Leicester",
    city:"Leicester", area:"LE1–LE19, Loughborough, Hinckley, Coalville",
    address:"Online booking — delivery to Leicester. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:156, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper than competition. Free delivery Leicester. Same-day if ordered before noon. mammoth-hire.co.uk",
    services:["Carpet cleaner hire","Free delivery Leicester","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:167, name:"Best at Hire — Leicester",
    city:"Leicester", area:"LE1–LE19, Loughborough, Hinckley",
    address:"Leicester — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:156, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Leicester and Leicestershire.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Leicester"],
    col:"#1565C0" },
  { id:168, name:"National Tool Hire — Leicester",
    city:"Leicester", area:"LE1–LE19, Leicestershire, Northamptonshire",
    address:"Leicester — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:112, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Leicester. Kärcher carpet cleaners. 2,000+ partner stores nationwide. Rated Excellent on Trustpilot.",
    services:["Carpet cleaner hire","Free delivery Leicester","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:169, name:"Smiths Hire — Leicester",
    city:"Leicester", area:"LE1–LE19, Loughborough, Hinckley, Coalville",
    address:"Leicester depot — call 0330 822 3992 or visit smithshire.com",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:134, machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"Award Winning",
    about:"Award-winning independent hire group, 50+ years. Leicester and Leicestershire. Kärcher, Bissell and Numatic carpet cleaners.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Leicester","Trade accounts"],
    col:"#37474F" },
  { id:134, name:"Speedy Hire — Leicester",
    city:"Leicester", area:"LE1–LE19, LE11, LE67",
    address:"Leicester depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:112, machines:["Kärcher carpet cleaner","Industrial carpet cleaner"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Leicester. Carpet cleaners and pressure washers. Delivery across Leicestershire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Leicester"],
    col:"#E65100" },
  { id:216, name:"Mammoth Hire — Nottingham",
    city:"Nottingham", area:"NG1–NG16, Mansfield, Newark, Long Eaton",
    address:"Online booking — delivery to Nottingham. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:156, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper. Free delivery Nottingham. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Nottingham","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:217, name:"National Tool Hire — Nottingham",
    city:"Nottingham", area:"NG1–NG16, Mansfield, Newark",
    address:"Nottingham — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:112, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Nottingham and Nottinghamshire. 2,000+ partner stores.",
    services:["Carpet cleaner hire","Free delivery Nottingham","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:218, name:"Smiths Hire — Nottingham",
    city:"Nottingham", area:"NG1–NG16, Derby, Mansfield",
    address:"Nottingham — call 0330 822 3992 or visit smithshire.com",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:134, machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"50 Years",
    about:"Award-winning hire group, 50+ years. Nottingham, Derby and surrounding areas.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Nottingham","Trade accounts"],
    col:"#C62828" },
  { id:219, name:"Best at Hire — Nottingham",
    city:"Nottingham", area:"NG1–NG16, Beeston, Arnold, Mansfield",
    address:"Nottingham — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:134, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Nottingham.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Nottingham"],
    col:"#1565C0" },
  { id:1351, name:"Brandon Hire Station — Nottingham",
    city:"Nottingham", area:"NG1–NG16, Beeston, Mansfield",
    address:"Nottingham depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.4, reviews:112, machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Nottingham. Carpet cleaners and upholstery machines. Delivery across Nottinghamshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Nottingham","Click & collect"],
    col:"#2E7D32" },
  { id:1352, name:"Speedy Hire — Nottingham",
    city:"Nottingham", area:"NG1–NG16, Mansfield, Newark",
    address:"Nottingham depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:87, machines:["Kärcher carpet cleaner","Industrial carpet cleaner"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Nottingham. Carpet cleaners and pressure washers. Delivery across Nottinghamshire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Nottingham"],
    col:"#E65100" },
  { id:135, name:"HSS Hire — Nottingham",
    city:"Nottingham", area:"NG1–NG16, Beeston, Arnold",
    address:"Nottingham branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.4, reviews:156, machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Nottingham. Kärcher and Bissell carpet cleaners. Delivery across Nottinghamshire.",
    services:["Carpet cleaner hire","Delivery Nottingham","Click & collect"],
    col:"#1565C0" },
  { id:1361, name:"Brandon Hire Station — Derby",
    city:"Derby", area:"DE1–DE24, Long Eaton, Ilkeston",
    address:"Derby depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.4, reviews:98, machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Derby. Carpet cleaners and upholstery machines. Delivery across Derbyshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Derby","Click & collect"],
    col:"#2E7D32" },
  { id:160, name:"Speedy Hire — Derby Sinfin",
    city:"Derby", area:"DE24, DE21, DE1, DE23, Long Eaton, Heanor",
    address:"186 Sinfin Lane, Derby DE24 9GL",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.4, reviews:134, machines:["Kärcher carpet cleaner","Industrial carpet cleaner","Carpet dryer"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Real Address",
    about:"Speedy Hire Derby at 186 Sinfin Lane DE24 9GL. Carpet cleaners and pressure washers. Delivery across Derbyshire and Nottinghamshire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Derby","Click & collect"],
    col:"#E65100" },
  { id:161, name:"Mammoth Hire — Derby",
    city:"Derby", area:"DE1–DE24, Notts, Leics, Staffs",
    address:"Online booking — delivery to Derby. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:156, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper than competition. Free delivery Derby. Same-day delivery if ordered before noon. mammoth-hire.co.uk",
    services:["Carpet cleaner hire","Free delivery Derby","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:162, name:"Best at Hire — Derby",
    city:"Derby", area:"DE1–DE24, Long Eaton, Heanor, Ripley",
    address:"Derby — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:156, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Derby and Derbyshire. 0344 288 8088.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Derby"],
    col:"#1565C0" },
  { id:163, name:"National Tool Hire — Derby",
    city:"Derby", area:"DE1–DE24, Derbyshire, Nottinghamshire",
    address:"Derby — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:112, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Derby. Kärcher carpet cleaners, floor sanders. 2,000+ partner stores nationwide. Rated Excellent on Trustpilot.",
    services:["Carpet cleaner hire","Free delivery Derby","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:164, name:"Smiths Hire — Derby",
    city:"Derby", area:"DE1–DE24, Ripley, Heanor, Ilkeston",
    address:"Derby depot — call 0330 822 3992 or visit smithshire.com",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:134, machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"Award Winning",
    about:"Award-winning independent hire group, 50+ years. Derby and Derbyshire. Kärcher, Bissell and Numatic carpet cleaners.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Derby","Trade accounts"],
    col:"#37474F" },
  { id:136, name:"HSS Hire — Derby",
    city:"Derby", area:"DE1–DE24, Long Eaton, Ilkeston",
    address:"Derby branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.3, reviews:98, machines:["Kärcher Puzzi 10/1","Bissell BG10"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Derby. Kärcher and Bissell carpet cleaners. Delivery across Derbyshire.",
    services:["Carpet cleaner hire","Delivery Derby","Click & collect"],
    col:"#1565C0" },
  { id:208, name:"Mammoth Hire — Coventry",
    city:"Coventry", area:"CV1–CV8, Rugby, Nuneaton, Kenilworth, Leamington Spa",
    address:"Online booking — delivery to Coventry. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:156, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper than competition. Free delivery Coventry. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Coventry","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:209, name:"National Tool Hire — Coventry",
    city:"Coventry", area:"CV1–CV8, Warwickshire, Rugby",
    address:"Coventry — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:112, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Coventry and Warwickshire. 2,000+ partner stores. Rated Excellent on Trustpilot.",
    services:["Carpet cleaner hire","Free delivery Coventry","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:210, name:"Smiths Hire — Coventry",
    city:"Coventry", area:"CV1–CV8, Rugby, Nuneaton, Kenilworth",
    address:"Coventry — call 0330 822 3992 or visit smithshire.com",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:112, machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"50 Years",
    about:"Award-winning independent hire group, 50+ years. Coventry and Warwickshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Coventry","Trade accounts"],
    col:"#C62828" },
  { id:211, name:"Hire It — Coventry",
    city:"Coventry", area:"CV1–CV8, Kenilworth, Rugby, Bedworth",
    address:"Coventry — call or visit hireit.co.uk for nearest depot",
    phone:"See hireit.co.uk", website:"hireit.co.uk",
    rating:4.5, reviews:98, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:30, deposit:0, open:"Mon–Sat — check website for hours",
    verified:true, insured:true, plan:"standard", badge:"Local Independent",
    about:"Local independent hire shop serving Coventry and surrounding areas. Carpet cleaners, floor sanders, pressure washers. hireit.co.uk",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Coventry"],
    col:"#6A1B9A" },
  { id:1371, name:"Brandon Hire Station — Coventry",
    city:"Coventry", area:"CV1–CV8, Kenilworth, Rugby, Nuneaton",
    address:"Coventry depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.4, reviews:112, machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Coventry. Carpet cleaners and upholstery machines. Delivery across Coventry and Warwickshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Coventry","Click & collect"],
    col:"#2E7D32" },
  { id:1372, name:"Speedy Hire — Coventry",
    city:"Coventry", area:"CV1–CV8, Rugby, Nuneaton, Bedworth",
    address:"Coventry depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:87, machines:["Kärcher carpet cleaner","Industrial carpet cleaner"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Coventry. Carpet cleaners and pressure washers. Delivery across Coventry and Warwickshire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Coventry"],
    col:"#E65100" },
  { id:137, name:"HSS Hire — Coventry",
    city:"Coventry", area:"CV1–CV8, Kenilworth, Rugby",
    address:"Coventry branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.4, reviews:134, machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Coventry. Kärcher and Bissell carpet cleaners. Delivery across Coventry and Warwickshire.",
    services:["Carpet cleaner hire","Delivery Coventry","Click & collect"],
    col:"#1565C0" },

  // ── M4 CORRIDOR HIRE SHOPS ─────────────────────────────────
  { id:1401, name:"Brandon Hire Station — Reading",
    city:"Reading", area:"RG1–RG14, Wokingham, Bracknell, Newbury",
    address:"Reading depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.4, reviews:112, machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Reading. Carpet cleaners and upholstery machines. Click & collect or delivery across Berkshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Reading","Click & collect"],
    col:"#2E7D32" },
  { id:170, name:"Speedy Hire — Reading",
    city:"Reading", area:"RG1–RG14, Wokingham, Bracknell, Newbury",
    address:"Reading depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:112, machines:["Kärcher carpet cleaner","Industrial carpet cleaner","Pressure washer"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Reading. Carpet cleaners and pressure washers. Delivery across Berkshire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Reading"],
    col:"#E65100" },
  { id:171, name:"Mammoth Hire — Reading",
    city:"Reading", area:"RG1–RG14, Wokingham, Bracknell, Newbury",
    address:"Online booking — delivery to Reading. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:134, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper than competition. Free delivery Reading. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Reading","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:172, name:"Best at Hire — Reading",
    city:"Reading", area:"RG1–RG14, Wokingham, Bracknell, Newbury, Maidenhead",
    address:"Reading — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:156, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Reading and Berkshire.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Reading"],
    col:"#2E7D32" },
  { id:173, name:"National Tool Hire — Reading",
    city:"Reading", area:"RG1–RG14, Berkshire, Oxfordshire",
    address:"Reading — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:112, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Reading and Berkshire. Kärcher carpet cleaners. 2,000+ partner stores. Rated Excellent on Trustpilot.",
    services:["Carpet cleaner hire","Free delivery Reading","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:174, name:"Force 4 Tool Hire — Reading",
    city:"Reading", area:"RG1–RG7, Theale, Calcot, Purley on Thames",
    address:"Reading, Berkshire — call or visit force4toolhire.co.uk",
    phone:"See force4toolhire.co.uk", website:"force4toolhire.co.uk",
    rating:4.6, reviews:112, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Mon–Sat — check website for hours",
    verified:true, insured:true, plan:"standard", badge:"Local Independent",
    about:"Local independent hire shop Reading and West Berkshire. Carpet cleaners, floor sanders, pressure washers. Personal service from a local team. force4toolhire.co.uk",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Reading"],
    col:"#C62828" },
  { id:140, name:"HSS Hire — Reading",
    city:"Reading", area:"RG1–RG14, Wokingham, Bracknell",
    address:"Reading branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.4, reviews:156, machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Reading. Kärcher and Bissell carpet cleaners. Delivery across Berkshire.",
    services:["Carpet cleaner hire","Delivery Reading","Click & collect"],
    col:"#1565C0" },
  { id:230, name:"Mammoth Hire — Oxford",
    city:"Oxford", area:"OX1–OX28, Abingdon, Witney, Bicester, Didcot",
    address:"Online booking — delivery to Oxford. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:134, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper. Free delivery Oxford and Oxfordshire. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Oxford","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:231, name:"Best at Hire — Oxford",
    city:"Oxford", area:"OX1–OX28, Abingdon, Witney, Bicester",
    address:"Oxford — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:134, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Oxford and Oxfordshire.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Oxford"],
    col:"#1565C0" },
  { id:232, name:"Speedy Hire — Oxford",
    city:"Oxford", area:"OX1–OX28, Abingdon OX14, Bicester OX26",
    address:"Oxford depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:98, machines:["Kärcher carpet cleaner","Industrial carpet cleaner","Pressure washer"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Oxford. Carpet cleaners and pressure washers. Delivery across Oxfordshire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Oxford"],
    col:"#E65100" },
  { id:141, name:"HSS Hire — Oxford",
    city:"Oxford", area:"OX1–OX4, Abingdon, Witney",
    address:"Oxford branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.4, reviews:134, machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Oxford. Kärcher and Bissell carpet cleaners. Delivery across Oxfordshire.",
    services:["Carpet cleaner hire","Delivery Oxford","Click & collect"],
    col:"#1565C0" },
  { id:1411, name:"Brandon Hire Station — Oxford",
    city:"Oxford", area:"OX1–OX28, Abingdon, Bicester, Witney",
    address:"Oxford depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.5, reviews:112, machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Oxford. 150 branches nationwide. Carpet cleaners, floor sanders. Click & collect or delivery across Oxfordshire.",
    services:["Carpet cleaner hire","Floor sander hire","Delivery Oxford","Click & collect"],
    col:"#2E7D32" },,
  { id:1413, name:"National Tool Hire — Witney (serves Oxford)",
    city:"Oxford", area:"OX29, OX1–OX28, Cotswolds, West Oxfordshire",
    address:"Witney Oxon OX29 0SR — visit nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.4, reviews:98, machines:["Carpet cleaner","Floor sander","Mini digger"],
    price_from:30, deposit:0, open:"Mon–Sat — check website for hours",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"National Tool Hire Witney OX29 0SR serving Oxford and West Oxfordshire. Carpet cleaners and floor sanders. Click & collect or delivery.",
    services:["Carpet cleaner hire","Floor sander hire","Delivery Oxford area"],
    col:"#C62828" },
  { id:142, name:"Best at Hire — Swindon",
    city:"Swindon", area:"SN5, SN1–SN15, Chippenham, Marlborough",
    address:"The Quadrillion, Westmead Drive, Westlea, Swindon SN5 7UL",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:198, machines:["Kärcher Puzzi 100","Truvox Hydromist HC250","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Real Address",
    about:"Best at Hire Swindon at The Quadrillion, Westmead Drive, Westlea SN5 7UL. Kärcher Puzzi 100 and Truvox Hydromist carpet cleaners in stock. Delivery across Wiltshire.",
    services:["Carpet cleaner hire","Kärcher Puzzi hire","Truvox hire","Delivery Swindon"],
    col:"#2E7D32" },
  { id:235, name:"Mammoth Hire — Swindon",
    city:"Swindon", area:"SN1–SN15, Chippenham, Marlborough, Cirencester",
    address:"Online booking — delivery to Swindon. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:112, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper. Free delivery Swindon and Wiltshire. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Swindon","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },,
  { id:237, name:"Smiths Hire — Swindon",
    city:"Swindon", area:"SN1–SN15, Cirencester, Faringdon, Wiltshire",
    address:"Swindon — call 0330 822 3992 or visit smithshire.com",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:98, machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"50 Years",
    about:"Award-winning hire group, 50+ years. Swindon and Wiltshire.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Swindon","Trade accounts"],
    col:"#37474F" },
  { id:238, name:"Speedy Hire — Swindon",
    city:"Swindon", area:"SN1–SN15, Chippenham, Marlborough",
    address:"Swindon depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:87, machines:["Kärcher carpet cleaner","Industrial carpet cleaner","Pressure washer"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Swindon. Carpet cleaners and pressure washers. Delivery across Wiltshire.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Swindon"],
    col:"#E65100" },
  { id:1421, name:"HSS Hire — Swindon",
    city:"Swindon", area:"SN1–SN15, Chippenham, Marlborough",
    address:"Swindon branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.3, reviews:112, machines:["Kärcher Puzzi 10/1","Bissell BG10"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Swindon. Kärcher and Bissell carpet cleaners. Delivery across Wiltshire.",
    services:["Carpet cleaner hire","Delivery Swindon","Click & collect"],
    col:"#1565C0" },
  { id:1422, name:"National Tool Hire — Swindon",
    city:"Swindon", area:"SN1–SN15, Wiltshire, Cotswolds",
    address:"Swindon depot — call or visit nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.4, reviews:134, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:30, deposit:0, open:"Mon–Sat — check website for hours",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"National Tool Hire Swindon. Carpet cleaners, floor sanders and pressure washers. Over 90 shops across UK. Click & collect or delivery.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Swindon"],
    col:"#37474F" },
  { id:200, name:"Mammoth Hire — Bath",
    city:"Bath", area:"BA1–BA3, Keynsham, Radstock, Midsomer Norton",
    address:"Online booking — delivery to Bath. mammoth-hire.co.uk",
    phone:"See mammoth-hire.co.uk", website:"mammoth-hire.co.uk",
    rating:4.5, reviews:134, machines:["Kärcher carpet washer","Professional carpet cleaner","Floor sander"],
    price_from:25, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"35% Cheaper",
    about:"35% cheaper than competition. Free delivery Bath and North East Somerset. Same-day if ordered before noon.",
    services:["Carpet cleaner hire","Free delivery Bath","Online 24/7","Floor sander hire"],
    col:"#2E7D32" },
  { id:201, name:"Best at Hire — Bath",
    city:"Bath", area:"BA1–BA3, Keynsham, Radstock, Bristol",
    address:"Bath — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.6, reviews:134, machines:["Kärcher Puzzi 100","Truvox Hydromist","Carpet dryer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Guaranteed stock. Carpet cleaners, floor sanders, pressure washers. Delivery Bath and North East Somerset.",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Bath"],
    col:"#1565C0" },
  { id:202, name:"National Tool Hire — Bath",
    city:"Bath", area:"BA1–BA3, Wiltshire, Somerset",
    address:"Bath — book online at nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:98, machines:["Carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Book online — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"Free delivery Bath. Kärcher carpet cleaners. 2,000+ partner stores. Rated Excellent on Trustpilot.",
    services:["Carpet cleaner hire","Free delivery Bath","Pressure washer hire","Online booking"],
    col:"#37474F" },
  { id:203, name:"Smiths Hire — Bath & Bristol",
    city:"Bath", area:"BA1–BA3, BS postcodes, Wiltshire",
    address:"Bath — call 0330 822 3992 or visit smithshire.com",
    phone:"0330 822 3992", website:"smithshire.com",
    rating:4.6, reviews:112, machines:["Kärcher Puzzi","Bissell ProHeat","Numatic George"],
    price_from:28, deposit:20, open:"Mon–Fri 7:30am–5:30pm · Sat 8am–4pm",
    verified:true, insured:true, plan:"standard", badge:"50 Years",
    about:"Award-winning independent hire group, 50+ years. Bath, Bristol and surrounding areas.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Bath","Trade accounts"],
    col:"#C62828" },
  { id:143, name:"Brandon Hire Station — Bath",
    city:"Bath", area:"BA1–BA3, Keynsham, Radstock",
    address:"Bath depot — call 0345 604 5337 or visit brandonhirestation.com",
    phone:"0345 604 5337", website:"brandonhirestation.com",
    rating:4.4, reviews:98, machines:["Kärcher Puzzi","Bissell","Upholstery cleaner"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm · Sat 7:30am–4pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Brandon Hire Station Bath. Professional carpet cleaning machines. Delivery across Bath and North East Somerset.",
    services:["Carpet cleaner hire","Upholstery hire","Delivery Bath"],
    col:"#2E7D32" },
  { id:1431, name:"HSS Hire — Bath",
    city:"Bath", area:"BA1–BA3, Keynsham BS31, Radstock BA3",
    address:"Bath branch — call 0345 728 2828 or visit hss.com",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.3, reviews:87, machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Bath. Kärcher and Bissell carpet cleaners. Delivery across Bath and North East Somerset.",
    services:["Carpet cleaner hire","Delivery Bath","Click & collect"],
    col:"#1565C0" },
  { id:1432, name:"Speedy Hire — Bath",
    city:"Bath", area:"BA1–BA3, BS31, Midsomer Norton BA3",
    address:"Bath depot — call 0330 123 3031 or visit speedyservices.com",
    phone:"0330 123 3031", website:"speedyservices.com",
    rating:4.3, reviews:72, machines:["Carpet cleaner","Pressure washer"],
    price_from:32, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"Speedy Hire Bath. Carpet cleaners and pressure washers. Delivery across Bath and surrounding areas.",
    services:["Carpet cleaner hire","Pressure washer hire","Delivery Bath"],
    col:"#E65100" },
  // ── LEICESTER — additional verified shops ─────────────────
  { id:200, name:"MF Hire — Leicester",
    city:"Leicester", area:"LE4 9LZ · Wigston · Hinckley · Loughborough",
    address:"2 Highmeres Road, Leicester LE4 9LZ",
    phone:"0116 276 3807", website:"mfhire.co.uk",
    rating:4.8, reviews:234, machines:["Kärcher Puzzi","Carpet cleaner","Upholstery cleaner","Floor sander"],
    price_from:30, deposit:0, open:"Mon–Fri 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"40 Years",
    about:"MF Hire Leicester — 2 Highmeres Road LE4 9LZ. 40+ years independent specialist. Kärcher carpet cleaners. Call 0116 276 3807 · ele@mfhgroup.co.uk. mfhire.co.uk",
    services:["Carpet cleaner hire","Upholstery cleaner hire","Floor sander hire","Click & collect LE4"],
    col:"#2E7D32" },
  { id:201, name:"Parker Hire Services — Leicester",
    city:"Leicester", area:"LE5 4DA · LE1–LE19 · Hinckley · Oadby",
    address:"3 Abbotsford Road (next to Humberstone Park), Leicester LE5 4DA",
    phone:"0116 2740404", website:"parkerhireservices.co.uk",
    rating:4.7, reviews:178, machines:["Carpet cleaner","Carpet dryer","Pressure washer"],
    price_from:28, deposit:0, open:"Mon–Fri 7:30am–4:30pm",
    verified:true, insured:true, plan:"standard", badge:"Local Independent",
    about:"Parker Hire Services — 3 Abbotsford Road, Leicester LE5 4DA (next to Humberstone Park). 0116 2740404. Carpet cleaners. 2-hour local delivery. Weekend rate at day rate (Fri noon–Mon 8am). parkerhireservices.co.uk",
    services:["Carpet cleaner hire","Carpet dryer hire","2hr local delivery","Weekend rate"],
    col:"#1565C0" },,,,
  // ── DERBY — additional verified shops ─────────────────────
  { id:210, name:"Total Hire & Sales — Derby Central",
    city:"Derby", area:"DE24 8EL · DE1–DE24 · Long Eaton · Ilkeston",
    address:"99 Victory Road, Derby DE24 8EL",
    phone:"01332 776622", website:"totalhireandsales.co.uk",
    rating:4.8, reviews:198, machines:["Industrial carpet cleaner","Wallpaper steamer","Pressure washer","Floor sander"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Since 1999",
    about:"Total Hire & Sales Derby Central — 99 Victory Road DE24 8EL. Est. 1999. Industrial carpet cleaners, pressure washers. Ample parking. 01332 776622 · enquiries@totalhireandsales.co.uk. totalhireandsales.co.uk",
    services:["Carpet cleaner hire","Pressure washer hire","Click & collect DE24","Industrial hire"],
    col:"#C62828" },
  { id:211, name:"Total Hire & Sales — Ripley (Derby/Notts border)",
    city:"Derby", area:"DE5 3AX · Derby · Nottingham · Belper · Alfreton",
    address:"132 Nottingham Road, Ripley, Derbyshire DE5 3AX",
    phone:"01773 740233", website:"totalhireandsales.co.uk",
    rating:4.7, reviews:134, machines:["Carpet cleaner","Wacker plate","Mini digger","Generator"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Derby & Notts",
    about:"Total Hire & Sales Ripley — 132 Nottingham Road, Ripley DE5 3AX. Serves Derby and Nottinghamshire. 01773 740233. Carpet cleaners and full plant hire. totalhireandsales.co.uk",
    services:["Carpet cleaner hire","Plant hire","Derby & Notts delivery","Click & collect DE5"],
    col:"#37474F" },,,,
  // ── READING — additional verified shops ───────────────────
  { id:220, name:"Best at Hire — Reading (Richfield Avenue)",
    city:"Reading", area:"RG1–RG14 · Wokingham · Bracknell · Newbury",
    address:"Richfield Avenue (off A33 opposite Reading Festival entrance), Reading",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.8, reviews:286, machines:["Kärcher carpet washer","Floor sander","Pressure washer","Floor polisher"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Best at Hire Reading — Richfield Avenue off A33, between Reading West and Reading stations. Top 200 tools guaranteed in stock. Kärcher carpet washers. 0344 288 8088. bestathire.co.uk/branches/reading-tool-hire-shop",
    services:["Kärcher carpet hire","Floor sander hire","Pressure washer hire","Click & collect Reading"],
    col:"#2E7D32" },
  { id:221, name:"FTH Hire Group — Reading Hub",
    city:"Reading", area:"RG2 0NH · Maidenhead · Slough · Newbury · Bracknell · Windsor",
    address:"Boulton Road, Reading RG2 0NH (J11 M4, A33)",
    phone:"See fthhiregroup.co.uk", website:"fthhiregroup.co.uk",
    rating:4.7, reviews:156, machines:["Carpet cleaner","Pressure washer","Floor sander","Site equipment"],
    price_from:30, deposit:0, open:"Mon–Fri 7am–5:30pm",
    verified:true, insured:true, plan:"standard", badge:"M4 Corridor",
    about:"FTH Hire Group Reading — Boulton Road RG2 0NH (J11 M4/A33). Covers Reading, Maidenhead, Slough, Newbury, Bracknell, High Wycombe, Oxford, Swindon, Ascot, Windsor. fthhiregroup.co.uk/reading-hire-hub",
    services:["Carpet cleaner hire","Pressure washer hire","Plant hire Reading","Construction hire"],
    col:"#1565C0" },,,,
  // ── COVENTRY — additional verified shops ──────────────────
  { id:230, name:"Best at Hire — Coventry",
    city:"Coventry", area:"CV1–CV8 · Rugby · Kenilworth · Bedworth · Nuneaton",
    address:"Coventry depot — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.7, reviews:156, machines:["Kärcher Puzzi","Truvox carpet cleaner","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Best at Hire Coventry. Guaranteed stock of carpet cleaners, floor sanders. 0344 288 8088. bestathire.co.uk",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Coventry"],
    col:"#2E7D32" },,,,
  // ── NOTTINGHAM — additional verified shops ────────────────
  { id:240, name:"Total Hire & Sales — Huthwaite (serves Notts)",
    city:"Nottingham", area:"NG17 2NW · NG1–NG16 · Mansfield · Kirkby",
    address:"6 Sutton Road, Huthwaite, Nottinghamshire NG17 2NW",
    phone:"01623 510066", website:"totalhireandsales.co.uk",
    rating:4.8, reviews:156, machines:["Carpet cleaner","Pressure washer","Mini digger","Floor sander"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Notts & Derby",
    about:"Total Hire & Sales Huthwaite — 6 Sutton Road NG17 2NW. 01623 510066. Serves Derbyshire and Nottinghamshire. Carpet cleaners, pressure washers. totalhireandsales.co.uk",
    services:["Carpet cleaner hire","Pressure washer hire","Plant hire Notts","Click & collect NG17"],
    col:"#C62828" },,,,
  // ── NORTHAMPTON — additional verified shops ───────────────,,,,
  // ── BRISTOL — additional verified shops ───────────────────,,
  { id:263, name:"HSS Hire — Bristol Southmead",
    city:"Bristol", area:"BS10 · BS1–BS16 · Avonmouth · Filton",
    address:"Southmead Road area, Bristol BS10 — call 0345 728 2828",
    phone:"0345 728 2828", website:"https://tidd.ly/4tz3c7a",
    rating:4.3, reviews:112, machines:["Kärcher Puzzi 10/1","Bissell BG10","Carpet dryer"],
    price_from:35, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:null,
    about:"HSS Hire Bristol Southmead. Kärcher and Bissell carpet cleaners. Click & collect or delivery across Bristol. 0345 728 2828. hss.com",
    services:["Carpet cleaner hire","Delivery Bristol","Click & collect BS10","Kärcher hire"],
    col:"#1565C0" },
  // ── BIRMINGHAM — additional shops ─────────────────────────
  { id:270, name:"Best at Hire — Birmingham",
    city:"Birmingham", area:"B1–B45 · Solihull · West Bromwich · Walsall",
    address:"Birmingham depot — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.7, reviews:178, machines:["Kärcher Puzzi","Truvox Hydromist","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Best at Hire Birmingham. Guaranteed stock. Kärcher and Truvox carpet cleaners. 0344 288 8088. bestathire.co.uk",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Birmingham"],
    col:"#2E7D32" },
  // ── MANCHESTER — additional shops ─────────────────────────
  { id:280, name:"Best at Hire — Manchester",
    city:"Manchester", area:"M1–M44 · Salford · Stockport · Trafford",
    address:"Manchester depot — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.7, reviews:178, machines:["Kärcher Puzzi","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Best at Hire Manchester. Guaranteed stock. Kärcher carpet cleaners. 0344 288 8088. bestathire.co.uk",
    services:["Carpet cleaner hire","Floor sander hire","Pressure washer hire","Delivery Manchester"],
    col:"#2E7D32" },
  // ── SHEFFIELD — additional shops ──────────────────────────,,
  // ── LEEDS — additional shops ───────────────────────────────,,
  // ── SWINDON — additional shops ────────────────────────────,,,,
  // ── BATH — additional shops ────────────────────────────────,,,,
  // ── OXFORD — additional shops (to reach 7) ─────────────────,,
  { id:332, name:"National Tool Hire — Oxford",
    city:"Oxford", area:"OX1–OX28 · Abingdon OX14 · Bicester OX26 · Banbury OX16",
    address:"Oxford — book nationaltoolhireshops.co.uk",
    phone:"See nationaltoolhireshops.co.uk", website:"nationaltoolhireshops.co.uk",
    rating:4.5, reviews:87, machines:["Kärcher Puzzi carpet cleaner","Floor sander"],
    price_from:28, deposit:0, open:"Book online 24/7 — delivery Mon–Sat",
    verified:true, insured:true, plan:"standard", badge:"Free Delivery",
    about:"National Tool Hire Oxford. Kärcher Puzzi carpet cleaners, free delivery. nationaltoolhireshops.co.uk",
    services:["Kärcher Puzzi hire","Free delivery Oxford","Weekend hire"],
    col:"#C62828" },
  // ── MILTON KEYNES — additional shops ──────────────────────
  { id:340, name:"Best at Hire — Milton Keynes",
    city:"Milton Keynes", area:"MK1–MK19 · Northampton · Luton · Bedford",
    address:"Milton Keynes depot — call 0344 288 8088 or visit bestathire.co.uk",
    phone:"0344 288 8088", website:"bestathire.co.uk",
    rating:4.7, reviews:156, machines:["Kärcher Puzzi","Truvox Hydromist","Floor sander","Pressure washer"],
    price_from:28, deposit:0, open:"Mon–Fri 7am–6pm · Sat 7:30am–5pm",
    verified:true, insured:true, plan:"standard", badge:"Guaranteed Stock",
    about:"Best at Hire Milton Keynes. Guaranteed stock. Kärcher and Truvox carpet cleaners. 0344 288 8088. bestathire.co.uk",
    services:["Carpet cleaner hire","Kärcher hire","Truvox hire","Delivery MK"],
    col:"#2E7D32" },,,
];

const SHOP_CITIES = [...new Set(LOCAL_SHOPS.map(s=>s.city))].sort();

// ─── AMAZON AFFILIATE PRODUCTS ────────────────────────────
// Replace tag= values with your real Amazon Associates tag
// UK tag format: yourname-21  |  US tag format: yourname-20
const AMZ_TAG = "ready4hire-21";
const AMZ = (asin) => `https://www.amazon.co.uk/dp/${asin}?tag=${AMZ_TAG}`;

const AMAZON_PRODUCTS = {
  // Carpet cleaning solutions
  rugdoctor_solution: {
    asin:"B00LJXKBP4", title:"Rug Doctor Carpet Detergent", price:"£9.99",
    rating:4.5, reviews:"2,800+", badge:"Official formula",
    note:"Official formula — must use with Rug Doctor machine",
    img:"🧴",
  },
  karcher_solution: {
    asin:"B07YVQTGDM", title:"Kärcher RM 760 Carpet Cleaner", price:"£12.49",
    rating:4.4, reviews:"1,200+", badge:"For Kärcher machines",
    note:"Specifically formulated for Kärcher Puzzi machines",
    img:"🧪",
  },
  bissell_solution: {
    asin:"B000BVFYTC", title:"Bissell Pet Stain and Odour Formula", price:"£11.99",
    rating:4.6, reviews:"3,400+", badge:"Best for pets",
    note:"Works in Bissell ProHeat — eliminates pet odours",
    img:"🐾",
  },
  pretreat_spray: {
    asin:"B01LZQX6UQ", title:"Vanish Pet Expert Pre-Treat Spray", price:"£6.49",
    rating:4.4, reviews:"5,100+", badge:"Pre-treat stains",
    note:"Spray on stains 5 mins before using the machine",
    img:"💧",
  },
  universal_solution: {
    asin:"B07DPF9JD4", title:"Dr. Beckmann Carpet Cleaner", price:"£4.99",
    rating:4.3, reviews:"8,700+", badge:"Works in any machine",
    note:"Compatible with all hire machines — safe universal formula",
    img:"",
  },
  stain_remover: {
    asin:"B000GCBOO8", title:"Vanish Carpet Gold Foam Spray", price:"£5.49",
    rating:4.5, reviews:"12,400+", badge:"Top seller",
    note:"Great for spot-treating before and after machine cleaning",
    img:"⭐",
  },
  // Patio cleaning products
  patio_cleaner: {
    asin:"B07BDTM3XN", title:"Jeyes Fluid Outdoor Cleaner", price:"£8.99",
    rating:4.5, reviews:"6,200+", badge:"Bestseller",
    note:"Multi-surface outdoor cleaner — paths, patios, drains",
    img:"🌿",
  },
  patio_sealer: {
    asin:"B078Y9JHCX", title:"Ronseal Patio Seal", price:"£16.99",
    rating:4.3, reviews:"2,100+", badge:"Protects 12 months",
    note:"Apply after cleaning to protect against moss and algae regrowth",
    img:"🛡️",
  },
  block_paving_cleaner: {
    asin:"B07X5CX9D8", title:"Wet and Forget Moss Mould Lichen Remover", price:"£14.99",
    rating:4.4, reviews:"4,800+", badge:"No scrubbing needed",
    note:"Apply and leave — works over 4-6 weeks. No pressure washer needed.",
    img:"🧹",
  },
  decking_cleaner: {
    asin:"B082Y6TPGN", title:"Ronseal Decking Cleaner", price:"£12.99",
    rating:4.3, reviews:"1,900+", badge:"For all wood decking",
    note:"Removes algae and grime before applying decking oil or stain",
    img:"🪵",
  },
  // EOT products
  oven_cleaner: {
    asin:"B00A6FT8JG", title:"Oven Pride Complete Oven Cleaning Kit", price:"£5.49",
    rating:4.5, reviews:"18,200+", badge:"No scrubbing",
    note:"Bag-based system — soak overnight for a spotless oven",
    img:"🫧",
  },
  limescale_remover: {
    asin:"B07BVKWBDQ", title:"HG Limescale Remover", price:"£6.99",
    rating:4.6, reviews:"7,400+", badge:"Professional strength",
    note:"Bathrooms, taps, showerheads — removes years of limescale buildup",
    img:"💎",
  },
  mould_remover: {
    asin:"B0098VRKF0", title:"HG Mould Spray", price:"£5.99",
    rating:4.5, reviews:"9,100+", badge:"Kills mould spores",
    note:"Grout, silicone seals, tiles — works in under 10 minutes",
    img:"🔬",
  },
  microfibre_cloths: {
    asin:"B0797BDFGS", title:"AmazonBasics Microfibre Cloths 24 Pack", price:"£12.99",
    rating:4.6, reviews:"14,300+", badge:"Best value",
    note:"Essential for streak-free surfaces — windows, worktops, appliances",
    img:"✨",
  },
};

// Always-visible Amazon product strip
function AmazonWidget({product, context}){
  return(
    <div style={{
      marginTop:10,
      background:"linear-gradient(135deg,#FFFBF0,#FFF8E1)",
      border:"1.5px solid #FFD54F",
      borderRadius:12,
      padding:"12px 14px",
      display:"flex", gap:11, alignItems:"center", flexWrap:"wrap",
    }}>
      <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
        <div style={{background:"#FF9900",borderRadius:7,padding:"3px 7px",fontSize:11,fontWeight:900,color:"#fff",letterSpacing:.5}}>amazon</div>
        <div style={{fontSize:8,fontWeight:800,color:"#CC7700",letterSpacing:.5}}>AFFILIATE</div>
      </div>
      <div style={{width:34,height:34,borderRadius:9,background:G.amber,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{product.img}</div>
      <div style={{flex:1,minWidth:130}}>
        <div style={{fontSize:9,fontWeight:800,color:"#78540A",letterSpacing:1,marginBottom:2}}>{context.toUpperCase()}</div>
        <div style={{fontWeight:700,fontSize:13,color:G.ink,marginBottom:2}}>{product.title}</div>
        <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginBottom:2}}>
          <span style={{color:G.gold,fontSize:11}}>{"★".repeat(Math.floor(product.rating))}</span>
          <span style={{fontSize:11,color:G.muted}}>{product.rating} · {product.reviews}</span>
          <span style={{background:"#FFF3E0",color:G.orange,border:"1px solid #FFCC80",fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:20}}>{product.badge}</span>
        </div>
        <div style={{fontSize:11,color:G.muted,lineHeight:1.45}}>{product.note}</div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.forest,marginBottom:5,lineHeight:1}}>{product.price}</div>
        <a href={AMZ(product.asin)} target="_blank" rel="noopener noreferrer"
          style={{display:"inline-block",padding:"8px 16px",background:"#FF9900",borderRadius:9,
            color:"#fff",fontSize:12,fontWeight:800,textDecoration:"none",
            boxShadow:"0 3px 10px rgba(255,153,0,.32)",whiteSpace:"nowrap"}}>
          Buy on Amazon →
        </a>
        <div style={{fontSize:9,color:"#A07830",marginTop:4}}>ⓘ Affiliate link · We earn ~4%</div>
      </div>
    </div>
  );
}

function detectPCKey(pc) {
  const u = pc.toUpperCase().replace(/\s/g,"");
  if (/^(SW|SE|EC|WC|W1|N1|E1|NW)/.test(u)) return "SW";
  if (/^M\d/.test(u)) return "M";
  if (/^B\d/.test(u)) return "B";
  return null;
}
function detectCityName(pc) {
  const u = pc.trim().toUpperCase();
  // City name detection
  const cityMap = {
    'LONDON':'London','BIRMINGHAM':'Birmingham','MANCHESTER':'Manchester',
    'LEEDS':'Leeds','SHEFFIELD':'Sheffield','BRISTOL':'Bristol',
    'LEICESTER':'Leicester','NOTTINGHAM':'Nottingham','DERBY':'Derby',
    'COVENTRY':'Coventry','READING':'Reading','OXFORD':'Oxford',
    'SWINDON':'Swindon','BATH':'Bath','LUTON':'Luton',
    'NORTHAMPTON':'Northampton','MILTON KEYNES':'Milton Keynes','MK':'Milton Keynes'
  };
  if(cityMap[u]) return cityMap[u];
  // Postcode prefix detection
  const k = detectPCKey(pc);
  return k==="SW"?"London":k==="M"?"Manchester":k==="B"?"Birmingham":
    k==="LS"?"Leeds":k==="S"?"Sheffield":k==="BS"?"Bristol":
    k==="LE"?"Leicester":k==="NG"?"Nottingham":k==="DE"?"Derby":
    k==="CV"?"Coventry":k==="RG"?"Reading":k==="OX"?"Oxford":
    k==="SN"?"Swindon":k==="BA"?"Bath":k==="LU"?"Luton":
    k==="NN"?"Northampton":k==="MK"?"Milton Keynes":null;
}

// ── META / HEAD SETUP ─────────────────────────────────────
// Add these to your public/index.html <head> when deploying:
// <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧹</text></svg>"/>
// <meta property="og:title" content="Ready 4 Hire — Carpet Cleaner Hire UK"/>
// <meta property="og:description" content="Compare carpet cleaning machine hire from £22/day. Verified local professionals. Free quotes."/>
// <meta property="og:image" content="https://ready4hire.co.uk/og-image.jpg"/>
// <meta property="og:url" content="https://ready4hire.co.uk"/>
// <meta name="description" content="Compare carpet cleaning machine hire across the UK from £22/day. Rug Doctor, Kärcher, Bissell. Free quotes from verified local professionals."/>
// Google Analytics: add <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script> to index.html
// Formspree contact form: replace YOUR_FORMSPREE_ID in ContactPage with your real ID from formspree.io

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#C8E6C9;border-radius:4px}
input,select,textarea,button{font-family:'DM Sans',sans-serif}
input::placeholder,textarea::placeholder{color:#9CAF9D}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes popIn{from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes toastSlide{from{transform:translateX(-50%) translateY(10px);opacity:0}to{transform:translateX(-50%);opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes shimmer{0%{background-position:-300px 0}100%{background-position:300px 0}}
.fu{animation:fadeUp .28s ease both}
.pop{animation:popIn .22s ease both}
.ch{transition:box-shadow .18s,transform .18s}
.ch:hover{box-shadow:0 12px 36px rgba(27,94,32,.14)!important;transform:translateY(-2px)}
.bp{transition:filter .15s,transform .12s}
.bp:hover{filter:brightness(1.08);transform:translateY(-1px)}
.sk{background:linear-gradient(90deg,#eef4ee 25%,#ddeadd 50%,#eef4ee 75%);background-size:300px 100%;animation:shimmer 1.1s infinite;border-radius:6px}
.mobnav{display:none;position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #C8E6C9;z-index:300;height:56px}
@media(max-width:620px){
  .mobnav{display:flex}
  .desklinks{display:none!important}
  .heroH1{font-size:28px!important}
  .heroToggle{justify-content:center!important;border-radius:20px!important}
  .searchCard{padding:16px!important}
  .pillars{grid-template-columns:1fr!important}
  .ctrlRow{flex-wrap:wrap!important}
  .ctrlRow .ctrlCount{width:100%!important;text-align:left!important;padding-bottom:0!important}
  .cardBody{flex-direction:column!important}
  .priceCol{text-align:left!important;min-width:unset!important;flex-direction:row;align-items:center;flex-wrap:wrap;gap:12px}
  .trustBar{gap:14px!important}
  .threeCol{grid-template-columns:1fr!important}
  .twoCol{grid-template-columns:1fr!important}
  .footerGrid{grid-template-columns:1fr!important}
}
`;

const inp = {width:"100%",padding:"11px 14px",background:"#fff",border:"1.5px solid #C8E6C9",borderRadius:10,fontSize:14,color:"#1A2E1B",outline:"none"};

// ─── NEWSLETTER SIGNUP ─────────────────────────────────────
function NewsletterSignup({dark=true}){
  const [email,setEmail]=useState("");
  const [done,setDone]=useState(false);
  const [busy,setBusy]=useState(false);
  const submit=async()=>{
    if(!email||!email.includes("@"))return;
    setBusy(true);
    await new Promise(r=>setTimeout(r,600));
    setBusy(false);
    setDone(true);
  };
  if(done) return(
    <div style={{textAlign:"center",padding:"10px 0"}}>
      <div style={{fontSize:24,marginBottom:6}}>✓</div>
      <div style={{color:dark?"rgba(255,255,255,.85)":G.forest,fontWeight:700,fontSize:13}}>You are subscribed!</div>
      <div style={{color:dark?"rgba(255,255,255,.6)":G.muted,fontSize:11,marginTop:3}}>Your first guide lands this week.</div>
    </div>
  );
  return(
    <div style={{display:"flex",gap:8,maxWidth:420,margin:"0 auto",flexWrap:"wrap",justifyContent:"center"}}>
      <input value={email} onChange={e=>setEmail(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&submit()}
        placeholder="your@email.com" type="email"
        style={{flex:"1 1 200px",padding:"10px 14px",borderRadius:10,border:dark?"none":"1.5px solid "+G.border,fontSize:13,outline:"none",background:dark?"rgba(255,255,255,.95)":G.white,color:G.ink}}/>
      <button onClick={submit} disabled={busy} className="bp"
        style={{flex:"0 0 auto",padding:"10px 18px",background:G.gold,border:"none",borderRadius:10,color:G.ink,fontSize:13,fontWeight:800,cursor:busy?"wait":"pointer"}}>
        {busy?"…":"Subscribe →"}
      </button>
    </div>
  );
}

// ─── ICONS ────────────────────────────────────────────────
function PersonIcon({size=16,color=G.muted}){
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

// ─── NAV ──────────────────────────────────────────────────
function Nav({tab,setTab,user,setAuthOpen,alertCount,onSignOut,onDashboard}){
  const [menuOpen,setMenuOpen]=useState(false);
  const [userDrop,setUserDrop]=useState(false);
  const [citiesOpen,setCitiesOpen]=useState(false);

  const CITY_GROUPS=[{label:"",cities:[
    ["city-london","London"],["city-miltonkeynes","Milton Keynes"],
    ["city-birmingham","Birmingham"],["city-manchester","Manchester"],["city-leeds","Leeds"],["city-sheffield","Sheffield"],["city-bristol","Bristol"],
    ["city-luton","Luton"],["city-northampton","Northampton"],["city-leicester","Leicester"],["city-nottingham","Nottingham"],["city-derby","Derby"],["city-coventry","Coventry"],
    ["city-reading","Reading"],["city-oxford","Oxford"],["city-swindon","Swindon"],["city-bath","Bath"],
  ]}];

  const NAV_LINKS=[
    {label:"Home",tab:"home"},
    {label:"Hire a Machine",tab:"hire"},
    {label:"Book Carpet Pro",tab:"services"},
    {label:"Patio Hire",tab:"patiohire"},
    {label:"Book Patio Pro",tab:"patioservices"},
    {label:"End of Tenancy",tab:"eot"},
    {label:"Carpet Care Guide",tab:"careguide"},
    {label:"Patio Care Guide",tab:"patioguide"},
    {label:"Blog",tab:"blog"},
    {label:"About",tab:"about"},
    {label:"Contact",tab:"contact"},
    {label:"For Businesses",tab:"business"},
    {label:"List Your Hire Shop",tab:"shopapply"},
  ];

  return(
    <>
      <nav style={{background:G.white,borderBottom:`1px solid ${G.border}`,padding:"0 16px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 8px rgba(27,94,32,.06)"}}>
        {/* Logo */}
        <button onClick={()=>setTab("home")} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
          <span style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.forest,lineHeight:1}}>
            Ready <span style={{color:G.gold}}>4</span> Hire
          </span>
          <span style={{fontSize:9,color:G.muted,letterSpacing:1.5,fontWeight:700,marginTop:1}}>HOME AND GARDEN CLEANING</span>
        </button>

        {/* Right controls */}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {/* UK badge */}
          <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,color:G.forest}}>UK</div>

          {/* Profile / alerts */}
          <div style={{position:"relative"}}>
            <button onClick={()=>user?onDashboard():setUserDrop(!userDrop)}
              style={{background:"none",border:`1.5px solid ${userDrop?G.forest:G.border}`,borderRadius:"50%",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"border-color .15s",position:"relative"}}>
              {user
                ? <span style={{fontFamily:"'DM Serif Display',serif",fontSize:13,fontWeight:700,color:G.forest}}>{user.name[0].toUpperCase()}</span>
                : <PersonIcon size={16} color={G.forest}/>}
              {alertCount>0&&<span style={{position:"absolute",top:-3,right:-3,background:G.bright,color:G.white,borderRadius:"50%",width:14,height:14,fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{alertCount}</span>}
            </button>
            {userDrop&&!user&&(
              <div style={{position:"absolute",right:0,top:40,background:G.white,border:`1px solid ${G.border}`,borderRadius:12,padding:8,minWidth:160,boxShadow:"0 8px 24px rgba(0,0,0,.12)",zIndex:200}}>
                <button onClick={()=>{setUserDrop(false);setAuthOpen("signin");}} style={{display:"block",width:"100%",padding:"8px 12px",background:"none",border:"none",textAlign:"left",fontSize:13,color:G.ink,cursor:"pointer",borderRadius:8}}>Sign in</button>
                <button onClick={()=>{setUserDrop(false);setAuthOpen("register");}} style={{display:"block",width:"100%",padding:"8px 12px",background:G.forest,border:"none",textAlign:"left",fontSize:13,color:G.white,cursor:"pointer",borderRadius:8,fontWeight:700}}>Create account</button>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button onClick={()=>setMenuOpen(!menuOpen)}
            style={{background:"none",border:`1.5px solid ${menuOpen?G.forest:G.border}`,borderRadius:9,width:34,height:34,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,cursor:"pointer",transition:"border-color .15s"}}>
            {[0,1,2].map(i=><span key={i} style={{width:14,height:1.5,background:menuOpen?G.forest:G.muted,borderRadius:2,transition:"background .15s"}}/>)}
          </button>
        </div>
      </nav>

      {/* Slide-out menu */}
      {menuOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:300}} onClick={()=>setMenuOpen(false)}>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:280,background:G.white,boxShadow:"-4px 0 24px rgba(0,0,0,.14)",display:"flex",flexDirection:"column",overflow:"hidden"}}
            onClick={e=>e.stopPropagation()}>
            <div style={{padding:"16px 18px",borderBottom:`1px solid ${G.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.forest}}>Ready <span style={{color:G.gold}}>4</span> Hire</span>
              <button onClick={()=>setMenuOpen(false)} style={{background:"none",border:"none",fontSize:20,color:G.muted,cursor:"pointer",lineHeight:1}}>×</button>
            </div>
            <div style={{overflowY:"auto",flex:1,maxHeight:"85vh",padding:"8px 0"}}>
              {NAV_LINKS.map(({label,tab:t})=>(
                <button key={t} onClick={()=>{setTab(t);setMenuOpen(false);}}
                  style={{display:"flex",width:"100%",padding:"11px 18px",background:tab===t?G.pale:"none",border:"none",textAlign:"left",fontSize:13,color:tab===t?G.forest:G.body,fontWeight:tab===t?700:400,cursor:"pointer",alignItems:"center",gap:8}}>
                  {tab===t&&<span style={{width:6,height:6,borderRadius:"50%",background:G.forest,flexShrink:0}}/>}
                  {label}
                </button>
              ))}
              {/* Cities section */}
              <div style={{borderTop:`1px solid ${G.border}`,margin:"6px 0"}}/>
              <button onClick={()=>setCitiesOpen(!citiesOpen)}
                style={{display:"flex",width:"100%",padding:"11px 18px",background:"none",border:"none",textAlign:"left",fontSize:13,color:G.body,cursor:"pointer",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontWeight:600}}>Cities ▼</span>
                <span style={{fontSize:10,color:G.muted,transform:citiesOpen?"rotate(180deg)":"none",transition:"transform .2s",display:"inline-block"}}></span>
              </button>
              {citiesOpen&&(
                <div>
                  {/* City search input */}
                  <div style={{padding:"6px 14px 8px"}}>
                    <input
                      placeholder="Search city..."
                      onChange={e=>{
                        const v=e.target.value.toLowerCase();
                        e.target._filter=v;
                        e.target.closest('.cityList').querySelectorAll('.cityBtn').forEach(btn=>{
                          btn.style.display=btn.dataset.city.includes(v)?'flex':'none';
                        });
                      }}
                      style={{width:"100%",padding:"7px 11px",border:`1px solid ${G.border}`,borderRadius:8,fontSize:12,outline:"none",boxSizing:"border-box"}}/>
                  </div>
                  <div className="cityList">
                    {CITY_GROUPS.map(group=>(
                      <div key={group.label||"all"}>
                        {group.label&&<div style={{fontSize:8,fontWeight:800,color:G.muted,letterSpacing:1.2,padding:"4px 11px 2px"}}>{group.label.toUpperCase()}</div>}
                        {group.cities.map(([t,l])=>(
                          <button key={t} data-city={l.toLowerCase()} className="cityBtn"
                            onClick={()=>{setTab(t);setMenuOpen(false);}}
                            style={{display:"flex",width:"100%",padding:"9px 24px",background:tab===t?G.pale:"none",border:"none",textAlign:"left",fontSize:13,color:tab===t?G.forest:G.body,cursor:"pointer",alignItems:"center",gap:8}}>
                            {tab===t&&<span style={{width:6,height:6,borderRadius:"50%",background:G.forest,flexShrink:0}}/>}
                            {l}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Sitemap link */}
              <div style={{borderTop:`1px solid ${G.border}`,margin:"6px 0"}}/>
              <button onClick={()=>{setTab("sitemap");setMenuOpen(false);}} style={{display:"block",width:"100%",padding:"11px 18px",background:"none",border:"none",textAlign:"left",fontSize:12,color:G.muted,cursor:"pointer"}}>Sitemap</button>
            </div>
            {user&&(
              <div style={{padding:"12px 18px",borderTop:`1px solid ${G.border}`}}>
                <button onClick={()=>{onSignOut();setMenuOpen(false);}} style={{width:"100%",padding:"9px 0",background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,color:G.forest,fontSize:12,fontWeight:700,cursor:"pointer"}}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── ATOMS ────────────────────────────────────────────────
function Stars({r,n,size=13}){
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:5}}>
      <span style={{color:G.gold,fontSize:size}}>{"★".repeat(Math.floor(r))}{"☆".repeat(5-Math.floor(r))}</span>
      {n!==undefined&&<span style={{color:G.muted,fontSize:size-1}}>{r} · {n>999?`${(n/1000).toFixed(0)}k`:n}</span>}
    </span>
  );
}
function Chip({children,green,xs}){
  return <span style={{background:green?G.pale:"#F0F4F0",color:green?G.dark:G.body,border:`1px solid ${green?G.border:"#DDE4DD"}`,fontSize:xs?10:11,fontWeight:600,padding:xs?"2px 8px":"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>✓ {children}</span>;
}
function Pill({text,color=G.forest}){
  return <span style={{background:`${color}18`,color,border:`1px solid ${color}28`,fontSize:9,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:.8,whiteSpace:"nowrap"}}>{text.toUpperCase()}</span>;
}
function SLabel({t}){
  return <div style={{fontSize:10,fontWeight:800,letterSpacing:2,color:G.bright,marginBottom:10}}>{t}</div>;
}
function LiveDot(){
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,background:G.pale,border:`1px solid ${G.border}`,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700,color:G.dark}}><span style={{width:6,height:6,background:G.bright,borderRadius:"50%",animation:"pulse 1.5s infinite"}}/>LIVE</span>;
}
function StockPill({ok}){
  return <span style={{background:ok?G.pale:G.orangeLight,color:ok?G.forest:G.orange,border:`1px solid ${ok?G.border:"#FFCC80"}`,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,whiteSpace:"nowrap"}}>{ok?"✓ In Stock":"⚠ Limited — Call Ahead"}</span>;
}
function Overlay({onClose,children}){
  return(
    <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(4px)",padding:"16px"}}>
      {children}
    </div>
  );
}

// ─── POSTCODE LOOKUP ──────────────────────────────────────
function PCLookup({onFound}){
  const [pc,setPc]=useState("");
  const [st,setSt]=useState("idle");
  const go=async()=>{
    if(!pc.trim())return;
    setSt("loading");
    await new Promise(r=>setTimeout(r,600));
 const cn=detectCityName(pc);
if(cn){
  setSt("found");
  onFound(pc.trim().toUpperCase(),detectPCKey(pc));
} else setSt("err");
  };
  return(
    <div>
      <div style={{display:"flex",gap:8}}>
        <input value={pc} onChange={e=>setPc(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="Enter your postcode e.g. SW1 2AA or M1 1AE" style={{...inp,flex:1}}/>
        <button onClick={go} className="bp" style={{padding:"11px 16px",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer",flexShrink:0}}>
          {st==="loading"?"…":"Find →"}
        </button>
      </div>
      {st==="found"&&<p className="fu" style={{fontSize:12,color:G.forest,fontWeight:600,marginTop:5}}>Showing pickup points near {pc.toUpperCase()} ({detectCityName(pc)})</p>}
      {st==="err"&&<p className="fu" style={{fontSize:12,color:G.orange,marginTop:5}}>Postcode not recognised — showing general pickup info</p>}
    </div>
  );
}

// ─── ALERT MODAL ──────────────────────────────────────────
function AlertModal({machine,onClose,onSet}){
  const [email,setEmail]=useState("");
  const [target,setTarget]=useState(machine?machine.livePrice-2:22);
  const [done,setDone]=useState(false);
  const [busy,setBusy]=useState(false);
  const submit=async()=>{
    if(!email)return;
    setBusy(true);
    await new Promise(r=>setTimeout(r,700));
    setDone(true);onSet();
  };
  return(
    <Overlay onClose={onClose}>
      <div className="pop" style={{background:G.white,borderRadius:20,padding:30,width:400,maxWidth:"100%",position:"relative",boxShadow:"0 20px 60px rgba(0,0,0,.18)"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:16,background:"none",border:"none",color:G.muted,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
        {!done?(
          <>
            
            <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:G.ink,marginBottom:4}}>Set a Price Alert</h3>
            {machine&&<p style={{color:G.muted,fontSize:13,lineHeight:1.6,marginBottom:16}}>We will email you the moment <strong>{machine.name}</strong> drops below your target price.</p>}
            <div style={{marginBottom:11}}>
              <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>YOUR EMAIL</div>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" type="email" style={inp}/>
            </div>
            <div style={{marginBottom:6}}>
              <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>ALERT WHEN PRICE DROPS TO</div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.forest}}>£</span>
                <input type="number" value={target} onChange={e=>setTarget(+e.target.value)} min={15} max={machine?machine.livePrice-1:50} style={{...inp,width:88}}/>
                <span style={{fontSize:13,color:G.muted}}>per day</span>
              </div>
              {machine&&<p style={{fontSize:11,color:G.muted,marginTop:4}}>Current: £{machine.livePrice}/day · You would save £{machine.livePrice-target}/day</p>}
            </div>
            <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:11,margin:"13px 0",fontSize:12,color:G.body,lineHeight:1.75}}>
              ✓ Prices checked daily &nbsp;·&nbsp; ✓ One email when it drops &nbsp;·&nbsp; ✓ No spam &nbsp;·&nbsp; ✓ Unsubscribe anytime
            </div>
            <button onClick={submit} disabled={busy} className="bp" style={{width:"100%",padding:"12px 0",background:G.forest,border:"none",borderRadius:11,color:G.white,fontSize:14,fontWeight:800,cursor:"pointer",opacity:busy?.7:1}}>
              {busy?"Setting alert…":"Set Price Alert →"}
            </button>
          </>
        ):(
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:32,marginBottom:12}}>✓</div>
            <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:G.ink,marginBottom:8}}>Alert set!</h3>
            <p style={{color:G.muted,fontSize:13}}>We will email you at <strong>{email}</strong> when the price drops.</p>
            <button onClick={onClose} className="bp" style={{marginTop:16,padding:"9px 22px",background:G.forest,border:"none",borderRadius:10,color:G.white,fontWeight:700,cursor:"pointer"}}>Done</button>
          </div>
        )}
      </div>
    </Overlay>
  );
}

// ─── HOME ─────────────────────────────────────────────────
function Home({setTab,R}){
  const [mode,setMode]=useState("hire");
  const [pc,setPc]=useState("");

  const CITY_ROUTES={
    "london":"hire","milton keynes":"city-miltonkeynes","mk":"city-miltonkeynes",
    "birmingham":"city-birmingham","bham":"city-birmingham",
    "manchester":"city-manchester","mcr":"city-manchester",
    "leeds":"city-leeds","sheffield":"city-sheffield","bristol":"city-bristol",
    "luton":"city-luton","northampton":"city-northampton","leicester":"city-leicester",
    "nottingham":"city-nottingham","derby":"city-derby","coventry":"city-coventry",
    "reading":"city-reading","oxford":"city-oxford","swindon":"city-swindon","bath":"city-bath",
  };
  const detectCityRoute=val=>{const v=val.trim().toLowerCase();return CITY_ROUTES[v]||null;};
  const handleCarpetSearch=()=>{const r=detectCityRoute(pc);if(r)setTab(r);else setTab(mode);};

  const trustItems=[["742k","Monthly searches"],["17 cities","UK coverage"],["469+","Listed businesses"],["Free","Always for consumers"],["4.9 ★","1,840 UK reviews"],["ICO","Registered ZA123456"]];
  const heroBg=`linear-gradient(168deg,${G.forest} 0%,${G.dark} 52%,${G.mid} 100%)`;

  return(
    <div>
      {/* HERO */}
      <div style={{background:heroBg,padding:"60px 20px 64px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:`radial-gradient(${G.white} 1px,transparent 1px)`,backgroundSize:"28px 28px",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1,textAlign:"center"}}>

          {/* SERVICE TOGGLE */}
          <div style={{display:"flex",justifyContent:"center",width:"100%",marginBottom:24}}>
          <div className="heroToggle" style={{display:"inline-flex",background:"rgba(0,0,0,.25)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.15)",borderRadius:40,padding:4,gap:3}}>
            <button style={{padding:"9px 16px",border:"none",borderRadius:36,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",background:"rgba(255,255,255,.95)",color:G.forest,flexShrink:0}}>
              Carpet Cleaning
            </button>
            <button onClick={()=>setTab("patiohire")}
              style={{padding:"9px 16px",border:"none",borderRadius:36,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",background:"transparent",color:"rgba(255,255,255,.75)",flexShrink:0}}>
              Patio and Outdoor
            </button>
            <button onClick={()=>setTab("eot")}
              style={{padding:"9px 16px",border:"none",borderRadius:36,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",background:"transparent",color:"rgba(255,255,255,.75)",flexShrink:0}}>
              End of Tenancy
            </button>
          </div>
          </div>

          {/* CARPET HERO */}
          <h1 className="heroH1" style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(30px,6vw,62px)",color:G.white,lineHeight:1.1,letterSpacing:-1,marginBottom:12}}>
            Every Carpet Clean.<br/><em style={{color:G.light}}>Best Price Guaranteed.</em>
          </h1>
          <p style={{color:"rgba(255,255,255,.62)",fontSize:15,maxWidth:460,margin:"0 auto 38px",lineHeight:1.8}}>
            Compare carpet cleaning machine hire from £22/day, or get free quotes from verified local professionals — prices updated daily across the UK.
          </p>

          <div className="searchCard" style={{background:G.white,borderRadius:20,padding:22,maxWidth:650,margin:"0 auto",boxShadow:"0 20px 56px rgba(0,0,0,.22)"}}>
            <div style={{display:"flex",background:G.frost,borderRadius:11,padding:3,marginBottom:16,gap:2}}>
              {[["hire","Hire a Machine"],["services","Book a Professional"],["eot","End of Tenancy"]].map(([m,l])=>(
                <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"9px 4px",border:"none",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s",background:mode===m?G.forest:"transparent",color:mode===m?G.white:G.muted,whiteSpace:"nowrap"}}>{l}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
              <div style={{flex:"1 1 180px"}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>POSTCODE OR CITY</div>
                <input value={pc} onChange={e=>setPc(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleCarpetSearch()}
                  placeholder="e.g. SW1 2AA or London" style={inp}/>
                {pc&&detectCityRoute(pc)&&<div style={{fontSize:11,color:G.forest,fontWeight:600,marginTop:3}}>Go to {pc.trim()} →</div>}
              </div>
              {mode==="hire"&&<div style={{flex:"1 1 130px"}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>DURATION</div><select style={{...inp,cursor:"pointer"}}>{["1 day","2 days","Weekend","3 days","1 week"].map(o=><option key={o}>{o}</option>)}</select></div>}
              {mode==="services"&&<div style={{flex:"1 1 130px"}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>ROOMS</div><select style={{...inp,cursor:"pointer"}}>{["1 room","2 rooms","3 rooms","4 rooms","Whole house"].map(o=><option key={o}>{o}</option>)}</select></div>}
              {mode==="eot"&&<div style={{flex:"1 1 130px",minWidth:0,overflow:"hidden"}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>MOVE-OUT DATE</div><input type="date" style={{...inp,cursor:"pointer",fontSize:12,width:"100%",boxSizing:"border-box"}}/></div>}
              <button onClick={handleCarpetSearch} className="bp" style={{flex:"0 0 auto",padding:"12px 22px",background:G.forest,border:"none",borderRadius:11,color:G.white,fontSize:14,fontWeight:800,cursor:"pointer"}}>Search →</button>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{background:G.forest,padding:"15px 20px"}}>
        <div className="trustBar" style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:16}}>
          {trustItems.map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:G.white}}>{v}</div>
              <div style={{color:G.light,fontSize:10,marginTop:1}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CITY DROPDOWN */}
      <div style={{background:G.white,borderBottom:`1px solid ${G.border}`,padding:"12px 20px"}}>
        <div style={{maxWidth:940,margin:"0 auto",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,flexShrink:0}}>FIND YOUR CITY</div>
          <select defaultValue="" onChange={e=>{const val=e.target.value;if(val)setTab(val);e.target.value="";}}
            style={{...inp,flex:"1 1 200px",maxWidth:320,cursor:"pointer"}}>
            <option value="" disabled>Select a city...</option>
            <optgroup label="UK Cities — Live">
              {[["city-london","London"],["city-miltonkeynes","Milton Keynes"],["city-birmingham","Birmingham"],["city-manchester","Manchester"],["city-leeds","Leeds"],["city-sheffield","Sheffield"],["city-bristol","Bristol"],["city-luton","Luton"],["city-northampton","Northampton"],["city-leicester","Leicester"],["city-nottingham","Nottingham"],["city-derby","Derby"],["city-coventry","Coventry"],["city-reading","Reading"],["city-oxford","Oxford"],["city-swindon","Swindon"],["city-bath","Bath"]].map(([v,l])=>(
                <option key={v} value={v}>{l}</option>
              ))}
            </optgroup>
            <optgroup label="Coming Soon">
              {["Edinburgh","Glasgow","Liverpool","Newcastle","Cardiff"].map(c=><option key={c} disabled>{c}</option>)}
            </optgroup>
          </select>
          <span style={{fontSize:11,color:G.muted}}>17 cities live · more coming soon</span>
        </div>
      </div>

      {/* THREE WAYS */}
      <div style={{maxWidth:940,margin:"0 auto",padding:"56px 20px"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <SLabel t="THREE WAYS WE HELP"/>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,36px)",color:G.ink,letterSpacing:-.5}}>Find the right solution for your carpet</h2>
          <p style={{color:G.muted,fontSize:14,maxWidth:420,margin:"10px auto 0",lineHeight:1.75}}>Not sure whether to hire or book a pro? Our buyer guide helps you decide in 2 minutes.</p>
        </div>
        <div className="pillars" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {[
            {t:"hire",    title:"Hire a Machine",      dark:true,  bg:[G.forest,G.dark],  bullets:["From £22/day","No deposit options","Collect same day","5 machines compared"],    cta:"Compare machines →",    ctaCol:G.light},
            {t:"services",title:"Book a Professional", dark:false, bg:[G.white,G.white],   bullets:["From £75/room","Verified & insured","Free quotes","742k monthly UK searches"],  cta:"Find local cleaners →", ctaCol:G.forest},
            {t:"eot",     title:"End of Tenancy",      dark:true,  bg:[G.ink,"#2E4030"],   bullets:["Deposit return focus","Urgent 24hr option","Landlord checklist","Pro guarantee"], cta:"See EOT options →",   ctaCol:G.light},
          ].map(p=>(
            <div key={p.t} className="ch" onClick={()=>setTab(p.t)} style={{background:`linear-gradient(145deg,${p.bg[0]},${p.bg[1]})`,border:p.dark?"none":`1.5px solid ${G.border}`,borderRadius:20,padding:28,cursor:"pointer",boxShadow:p.dark?"0 6px 22px rgba(27,94,32,.16)":"0 3px 12px rgba(27,94,32,.07)"}}>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:p.dark?G.white:G.ink,marginBottom:8}}>{p.title}</h3>
              <div style={{marginBottom:15}}>{p.bullets.map(b=><div key={b} style={{fontSize:12,color:p.dark?"rgba(255,255,255,.68)":G.body,marginBottom:4}}>✓ {b}</div>)}</div>
              <div style={{fontWeight:700,fontSize:13,color:p.ctaCol}}>{p.cta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BUSINESS CTA */}
      <div style={{background:`linear-gradient(135deg,${G.ink},#1E3520)`,padding:"44px 20px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{marginBottom:22}}>
            <div style={{fontSize:10,fontWeight:800,color:G.bright,letterSpacing:2,marginBottom:10}}>FOR CLEANING BUSINESSES AND HIRE SHOPS</div>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,3vw,34px)",color:G.white,marginBottom:10,lineHeight:1.2}}>Get More Customers.<br/>From £39/month.</h2>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:14,lineHeight:1.75,maxWidth:480}}>742,000 people search for carpet cleaning across the UK every month. List your business and start receiving verified enquiries.</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",marginBottom:18}}>
            {[["Cleaning Business","List your professional carpet cleaning service — from £39/month","business"],
              ["Hire Shop","List your carpet machine hire shop — from £39/month","shopapply"],
              ["Patio Business","List your patio & outdoor cleaning service — from £39/month","patioservices"]].map(([t,d,dest])=>(
              <div key={t} onClick={()=>setTab(dest)}
                style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.18)",borderRadius:14,padding:"15px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,boxSizing:"border-box",width:"100%"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.15)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.08)"}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,color:G.white,fontSize:14,marginBottom:4}}>{t}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.55)",lineHeight:1.5}}>{d}</div>
                </div>
                <div style={{fontWeight:700,fontSize:12,color:G.bright,flexShrink:0,paddingLeft:8}}>Apply now →</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[["742k","UK searches/month"],["469+","Listed businesses"],["£39","Starting from"],["48hrs","To go live"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center",flex:"1 1 60px"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.bright}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.45)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS + TRUST */}
      <div style={{background:G.frost,borderTop:`1px solid ${G.border}`,borderBottom:`1px solid ${G.border}`,padding:"44px 20px"}}>
        <div className="threeCol" style={{maxWidth:940,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:28}}>
          <div>
            <SLabel t="CUSTOMER REVIEWS"/>
            {[{n:"Sarah T.",t:"Found Rug Doctor £3 cheaper than going direct. 30 seconds to compare."},
              {n:"James M.",t:"The end of tenancy section saved my deposit. Brilliant."},
              {n:"Emma R.",t:"Booked Crystal Clean Pro through here. Spotless results, fast response."}].map((r,i)=>(
              <div key={i} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:11,padding:13,marginBottom:9}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontWeight:700,fontSize:12,color:G.ink}}>{r.n}</span>
                  <Stars r={5} size={11}/>
                </div>
                <div style={{fontSize:12,color:G.muted,lineHeight:1.6}}>{r.t}</div>
              </div>
            ))}
          </div>
          <div>
            <SLabel t="WHY READY 4 HIRE"/>
            {[["No ads or sponsored results","We never accept payment to push a listing higher. Order is by rating only."],["Real verified businesses","Every business is verified before listing — phone, insurance and trading history checked."],["Always free for consumers","Comparing prices, sending enquiries and reading guides is always free. No sign-up required."]].map(([t,d])=>(
              <div key={t} style={{marginBottom:14}}>
                <div style={{fontWeight:700,fontSize:12,color:G.ink,marginBottom:3}}>✓ {t}</div>
                <div style={{fontSize:12,color:G.muted,lineHeight:1.6}}>{d}</div>
              </div>
            ))}
          </div>
          <div>
            <SLabel t="LATEST FROM THE GUIDE"/>
            {[["How to get your full deposit back","End of tenancy carpet cleaning — what landlords actually check"],["Rug Doctor vs Bissell — 2026 comparison","Which machine gives better results for UK carpets?"],["Spring patio cleaning guide","The right order to clean block paving, decking and fencing"]].map(([t,d])=>(
              <div key={t} onClick={()=>setTab("guide")} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:11,padding:13,marginBottom:9,cursor:"pointer"}}>
                <div style={{fontWeight:700,fontSize:12,color:G.forest,marginBottom:3}}>{t}</div>
                <div style={{fontSize:11,color:G.muted,lineHeight:1.5}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer setTab={setTab}/>
    </div>
  );
}

// ─── HIRE PAGE ─────────────────────────────────────────────
// ─── LOCAL SHOPS SECTION ──────────────────────────────────
function LocalShopsSection({user,onLoginNeeded,setTab,defaultCity}){
  const [city,setCity]=useState(defaultCity||"London");
  const [sort,setSort]=useState("rating");
  const [contactShop,setContactShop]=useState(null);
  const [contactDone,setContactDone]=useState(false);
  const [contactStep,setContactStep]=useState(1);
  const [cityOpen,setCityOpen]=useState(false);
  const [citySearch,setCitySearch]=useState("");
  const [premiumOpenId,setPremiumOpenId]=useState(null);
  useEffect(()=>{
    const h=e=>{
      if(!e.target.closest(".premiumPopup"))setPremiumOpenId(null);
    };
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);

  const allCities=["All",...SHOP_CITIES];
  const filteredCities=allCities.filter(c=>c&&c.toLowerCase().includes(citySearch.toLowerCase()));
  const dropRef=useRef(null);

  // Close only when clicking outside the dropdown container
  useEffect(()=>{
    const handler=(e)=>{
      if(dropRef.current&&!dropRef.current.contains(e.target)){
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown",handler);
    return()=>document.removeEventListener("mousedown",handler);
  },[]);

  const shown=[...LOCAL_SHOPS]
    .filter(s=>city==="All"||s.city===city)
    .sort((a,b)=>sort==="price"?a.price_from-b.price_from:b.rating-a.rating);

  const openContact=s=>{
    setContactShop(s);setContactStep(1);setContactDone(false);
  };

  return(
    <div style={{marginTop:32}}>
      {/* Section header */}
      <div style={{background:`linear-gradient(135deg,${G.ink},#2A3D2B)`,borderRadius:18,padding:"22px 24px",marginBottom:20,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:200}}>
          <div style={{fontSize:10,fontWeight:800,color:G.light,letterSpacing:2,marginBottom:6}}>INDEPENDENT HIRE SHOPS</div>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.white,marginBottom:6,lineHeight:1.2}}>
            No pickup point near you?
          </h2>
          <p style={{color:"rgba(255,255,255,.6)",fontSize:13,lineHeight:1.7}}>
            These local independent hire shops carry carpet cleaners too — often cheaper than national brands, with same-day collection and expert advice on the spot.
          </p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,flexShrink:0}}>
          {[["","131 hire shops"],["","17 UK cities"],["","From £24/day"],["","No deposit options"]].map(([ic,l])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:7,fontSize:12,color:"rgba(255,255,255,.75)"}}>
              <span></span><span>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls — searchable city dropdown + sort pills, all one line */}
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,flexWrap:"wrap"}}>

        {/* Searchable city dropdown */}
        <div ref={dropRef} style={{position:"relative"}}>
          <button onClick={()=>{setCityOpen(!cityOpen);setCitySearch("");}}
            style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",
              background:G.white,border:`1.5px solid ${cityOpen||city!=="All"?G.forest:G.border}`,
              borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700,
              color:city!=="All"?G.forest:G.ink,transition:"all .15s",whiteSpace:"nowrap"}}>
            {city==="All"?"All Cities":city}
            <span style={{fontSize:9,color:G.muted,marginLeft:2}}>{cityOpen?"▲":"▼"}</span>
          </button>

          {cityOpen&&(
            <div className="pop" style={{position:"absolute",top:"calc(100% + 6px)",left:0,
              background:G.white,border:`1px solid ${G.border}`,borderRadius:13,
              boxShadow:"0 8px 28px rgba(0,0,0,.12)",zIndex:300,width:220,overflow:"hidden"}}>
              {/* Search input inside dropdown */}
              <div style={{padding:"10px 10px 6px"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,background:G.frost,
                  borderRadius:8,padding:"7px 10px",border:`1px solid ${G.border}`}}>
                  <span style={{fontSize:13,color:G.muted}}>🔍</span>
                  <input
                    autoFocus
                    value={citySearch}
                    onChange={e=>setCitySearch(e.target.value)}
                    placeholder="Search city…"
                    style={{border:"none",outline:"none",background:"transparent",
                      fontSize:12,color:G.ink,width:"100%"}}/>
                  {citySearch&&<button onClick={()=>setCitySearch("")}
                    style={{background:"none",border:"none",color:G.muted,cursor:"pointer",fontSize:14,lineHeight:1,padding:0}}>×</button>}
                </div>
              </div>
              {/* City list */}
              <div style={{maxHeight:200,overflowY:"auto",paddingBottom:6}}>
                {filteredCities.length===0?(
                  <div style={{padding:"12px 14px",fontSize:12,color:G.muted,textAlign:"center"}}>No cities found</div>
                ):filteredCities.map(c=>(
                  <button key={c} onClick={()=>{setCity(c);setCityOpen(false);setCitySearch("");}}
                    style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
                      padding:"9px 14px",background:city===c?G.pale:"transparent",
                      border:"none",cursor:"pointer",fontSize:12,
                      fontWeight:city===c?700:400,color:city===c?G.forest:G.ink,
                      textAlign:"left",gap:8}}>
                    <span>{c==="All"?"🌍 All Cities":c}</span>
                    {city===c&&<span style={{color:G.forest,fontSize:13}}>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{width:1,height:16,background:G.border,flexShrink:0}}/>

        {/* Sort pills — inline, compact */}
        <span style={{fontSize:11,color:G.muted,fontWeight:600,flexShrink:0}}>Sort:</span>
        {[["rating","⭐ Best Rated"],["price","Lowest Price"]].map(([v,l])=>(
          <button key={v} onClick={()=>setSort(v)}
            style={{padding:"6px 12px",border:`1px solid ${sort===v?G.forest:G.border}`,borderRadius:20,
              background:sort===v?G.forest:G.white,color:sort===v?G.white:G.muted,
              fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s"}}>
            {l}
          </button>
        ))}

        {/* Result count */}
        <div style={{marginLeft:"auto",fontSize:11,color:G.muted,flexShrink:0}}>
          <strong style={{color:G.ink}}>{shown.length}</strong> shop{shown.length!==1?"s":""} · All verified
        </div>
      </div>

      {/* Shop cards */}
      <div style={{display:"flex",flexDirection:"column",gap:13}}>
        {shown.map((s,i)=>(
          <div key={s.id} className="ch" style={{background:G.white,borderRadius:18,padding:20,
            border:`1.5px solid ${i===0&&sort==="rating"?G.dark:G.border}`,position:"relative",
            boxShadow:i===0&&sort==="rating"?"0 4px 20px rgba(27,94,32,.09)":"0 2px 8px rgba(0,0,0,.04)"}}>

            {s.badge&&<div style={{position:"absolute",top:-11,left:18,
              background:i===0&&sort==="rating"?`linear-gradient(135deg,${G.forest},${G.mid})`:G.ink,
              color:G.white,fontSize:9,fontWeight:800,padding:"3px 12px",borderRadius:20,letterSpacing:1}}>
              {s.badge.toUpperCase()}
            </div>}

            {/* Plan badge top right */}
            <div style={{position:"absolute",top:14,right:14}}>
              {s.plan==="premium"&&<span style={{background:`linear-gradient(135deg,${G.gold},#F57F17)`,color:G.white,fontSize:9,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:.8}}>⭐ PREMIUM</span>}
              {s.plan==="standard"&&<span style={{background:G.pale,color:G.forest,border:`1px solid ${G.border}`,fontSize:9,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:.8}}>STANDARD</span>}
              {s.plan==="basic"&&<span style={{background:"#F5F5F5",color:G.muted,border:"1px solid #E0E0E0",fontSize:9,fontWeight:700,padding:"3px 10px",borderRadius:20,letterSpacing:.8}}>BASIC</span>}
            </div>

            <div className="cardBody" style={{display:"flex",gap:14,alignItems:"flex-start"}}>
              {/* Logo */}
              <div style={{width:50,height:50,borderRadius:14,flexShrink:0,background:s.col,
                display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:11}}>
                {s.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
              </div>

              {/* Info */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:3}}>
                  <span style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.ink}}>{s.name}</span>
                  {s.verified&&<Pill text="✓ Verified" color={G.forest}/>}
                  {s.insured&&<Pill text="🛡️ Insured" color={G.blue}/>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                  <Stars r={s.rating} n={s.reviews}/>
                </div>
                <div style={{fontSize:11,color:G.muted,marginBottom:5}}>
                  {s.city} · Covers {s.area} · 🕐 {s.open}
                </div>
                <div style={{fontSize:12,color:G.body,lineHeight:1.6,fontStyle:"italic",marginBottom:8}}>{s.about}</div>
                {/* Machines they stock */}
                <div style={{marginBottom:7}}>
                  <div style={{fontSize:9,fontWeight:800,color:G.muted,letterSpacing:1,marginBottom:4}}>MACHINES IN STOCK</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {s.machines.map(m=><Chip key={m} green xs>{m}</Chip>)}
                  </div>
                </div>
                {/* Services */}
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {s.services.map(sv=><span key={sv} style={{background:"#F5F5F5",color:G.muted,border:"1px solid #E0E0E0",fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:20}}>• {sv}</span>)}
                </div>

                {/* Free listing badge + enquiry insight + premium upgrade prompt */}
                <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>
                  {/* Enquiry insight for free listings */}
                  <div style={{background:"#F3F8F3",border:`1px solid ${G.border}`,borderRadius:10,padding:"8px 12px",fontSize:11,color:G.body,lineHeight:1.6}}>
                    <span style={{fontWeight:700,color:G.forest}}>📊 This month: </span>
                    <span style={{fontWeight:700,color:G.ink}}>{[8,12,6,14,9,11,7,15,10,13,8,16,9][i%13]} people</span> viewed your listing · <span style={{fontWeight:700,color:G.ink}}>{[2,3,1,4,2,3,1,2,4,1,3,2,2][i%13]} enquiries</span> sent.
                    <span style={{color:G.muted}}> Upgrade to see full analytics and appear at the top.</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                    {/* Free listing badge */}
                    <div style={{display:"flex",alignItems:"center",gap:5,background:G.pale,border:`1px solid ${G.border}`,borderRadius:20,padding:"4px 11px"}}>
                      <div style={{width:7,height:7,borderRadius:"50%",background:G.forest,flexShrink:0}}/>
                      <span style={{fontSize:11,fontWeight:700,color:G.forest}}>Free listing</span>
                    </div>
                    {/* Upgrade prompt */}
                    <div style={{display:"flex",alignItems:"center",gap:5,background:"#FFF8E1",border:"1px solid #F9A82566",borderRadius:20,padding:"4px 11px",cursor:"pointer"}}
                      onClick={()=>setTab("shopapply")}>
                      <span style={{fontSize:11,fontWeight:700,color:"#78540A"}}>Upgrade to Premium</span>
                      <span style={{fontSize:11,color:"#78540A",fontWeight:800}}>→</span>
                    </div>
                  </div>{/* end flex row */}
                  <div className="premiumPopup" style={{position:"relative"}}>
                    <button
                      onClick={()=>setPremiumOpenId(premiumOpenId===s.id?null:s.id)}
                      style={{width:22,height:22,borderRadius:"50%",background:premiumOpenId===s.id?G.forest:G.pale,
                        border:`1.5px solid ${premiumOpenId===s.id?G.forest:G.border}`,
                        display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
                        fontSize:12,fontWeight:800,color:premiumOpenId===s.id?G.white:G.forest,flexShrink:0,transition:"all .15s"}}>
                      i
                    </button>
                    {premiumOpenId===s.id&&(
                      <div className="premiumPopup" onClick={()=>setPremiumOpenId(null)}
                        style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:600,
                          display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px"}}>
                        <div className="premiumPopup" onClick={e=>e.stopPropagation()}
                          style={{background:G.white,borderRadius:20,padding:22,width:"100%",maxWidth:360,
                            maxHeight:"80vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,.25)"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                            <div style={{fontFamily:"'DM Serif Display',serif",fontWeight:700,color:G.forest,fontSize:16}}>What you get with Premium</div>
                            <button onClick={()=>setPremiumOpenId(null)}
                              style={{background:G.frost,border:`1px solid ${G.border}`,borderRadius:"50%",width:28,height:28,
                                display:"flex",alignItems:"center",justifyContent:"center",
                                color:G.muted,fontSize:16,cursor:"pointer",flexShrink:0}}>×</button>
                          </div>
                          {[
                            ["Top placement","Your shop appears first in your city — above all Standard and Free listings. Always."],
                            ["Verified badge","Green Verified badge — insurance and Companies House checked."],
                            ["Quote requests routed to you","Every matching customer enquiry sent directly by email and SMS."],
                            ["Customer reviews","Verified customers can leave star ratings on your listing."],
                            ["Featured in care guides","Recommended in Carpet Care and Patio Care guides for your city."],
                            ["Monthly performance report","Views, enquiries received and estimated job value each month."],
                            ["Priority support","Changes to your listing handled within 24 hours."],
                          ].map(([title,desc])=>(
                            <div key={title} style={{display:"flex",gap:10,marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${G.border}`}}>
                              <div style={{width:8,height:8,borderRadius:"50%",background:G.forest,marginTop:4,flexShrink:0}}/>
                              <div>
                                <div style={{fontSize:12,fontWeight:700,color:G.ink,marginBottom:2}}>{title}</div>
                                <div style={{fontSize:11,color:G.muted,lineHeight:1.6}}>{desc}</div>
                              </div>
                            </div>
                          ))}
                          <div style={{marginTop:4,marginBottom:14,fontSize:11,color:G.muted,textAlign:"center"}}>
                            Get in touch to find out more about our Premium listing.
                          </div>
                          <button onClick={()=>{setPremiumOpenId(null);setTab("shopapply");}} className="bp"
                            style={{width:"100%",padding:"12px 0",background:G.forest,border:"none",
                              borderRadius:11,color:G.white,fontSize:13,fontWeight:800,cursor:"pointer"}}>
                            Apply for Premium →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="priceCol" style={{textAlign:"right",minWidth:140,flexShrink:0}}>
                <div style={{color:G.muted,fontSize:11}}>From</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:30,color:G.forest,lineHeight:1}}>£{s.price_from}</div>
                <div style={{color:G.muted,fontSize:11,marginBottom:4}}>per day</div>
                {s.deposit===0
                  ?<div style={{background:G.pale,color:G.dark,border:`1px solid ${G.border}`,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,marginBottom:8,display:"inline-block"}}>No deposit</div>
                  :<div style={{background:G.orangeLight,color:G.orange,border:"1px solid #FFCC8088",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,marginBottom:8,display:"inline-block"}}>£{s.deposit} deposit</div>
                }
                <div style={{display:"flex",gap:6}}>
                  {/* Click-to-call — tracked for monetisation */}
                  <a href={`tel:${s.phone.replace(/\s/g,"")}`} style={{flex:1,display:"block",padding:"9px 6px",background:G.forest,borderRadius:10,color:G.white,fontSize:11,fontWeight:700,textDecoration:"none",textAlign:"center"}}>
                    📞 Call Now
                  </a>
                  <button onClick={()=>openContact(s)} className="bp"
                    style={{flex:1,padding:"9px 6px",background:"none",border:`1.5px solid ${G.forest}`,borderRadius:10,color:G.forest,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                    Enquiry →
                  </button>
                </div>
                <div style={{fontSize:9,color:G.muted,textAlign:"center",marginTop:3}}>{s.phone}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prompt for more shops to sign up */}
      <div style={{marginTop:22,background:`linear-gradient(135deg,${G.forest},${G.dark})`,borderRadius:16,padding:22,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:200}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.white,marginBottom:5}}>
            Do you run a hire shop?
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.7}}>
            Get your machines in front of 742,000 monthly UK carpet cleaning searchers. Listing from £39/month — one extra booking pays for it.
          </div>
        </div>
        <button onClick={()=>setTab("shopapply")} className="bp"
          style={{padding:"11px 22px",background:G.gold,border:"none",borderRadius:11,
            color:G.ink,fontSize:13,fontWeight:900,cursor:"pointer",flexShrink:0,
            boxShadow:"0 4px 14px rgba(249,168,37,.35)"}}>
          List My Shop →
        </button>
      </div>

      {/* Enquiry modal */}
      {contactShop&&(
        <Overlay onClose={()=>{setContactShop(null);setContactDone(false);}}>
          <div className="pop" style={{background:G.white,borderRadius:20,padding:28,width:430,maxWidth:"100%",maxHeight:"90vh",overflowY:"auto",position:"relative",boxShadow:"0 20px 60px rgba(0,0,0,.18)"}}>
            <button onClick={()=>{setContactShop(null);setContactDone(false);}}
              style={{position:"absolute",top:14,right:16,background:"none",border:"none",color:G.muted,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
            {!contactDone?(
              <>
                <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:16}}>
                  <div style={{width:40,height:40,borderRadius:11,background:contactShop.col,flexShrink:0}}></div>
                  <div>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.ink}}>{contactShop.name}</div>
                    <div style={{color:G.muted,fontSize:11}}>{contactShop.city} · {contactShop.area}</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:5,marginBottom:18}}>
                  {[1,2].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=contactStep?G.forest:G.border,transition:"background .3s"}}/>)}
                </div>
                {contactStep===1&&(
                  <div className="fu">
                    <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:11}}>1. What do you need?</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14}}>
                      {[["Check availability","Is a machine free on my date?"],["Get a price","How much for X days?"],["Book a machine","I want to reserve now"],["Ask a question","Need advice first"]].map(([t,d])=>(
                        <label key={t} style={{display:"flex",flexDirection:"column",gap:3,background:G.frost,borderRadius:10,padding:"10px 11px",cursor:"pointer",border:`1px solid ${G.border}`}}>
                          <div style={{display:"flex",alignItems:"center",gap:7}}>
                            <input type="radio" name="enquiry_type" style={{accentColor:G.forest}}/>
                            <span style={{fontSize:12,fontWeight:700,color:G.ink}}>{t}</span>
                          </div>
                          <span style={{fontSize:11,color:G.muted,paddingLeft:19}}>{d}</span>
                        </label>
                      ))}
                    </div>
                    <div style={{marginBottom:11}}>
                      <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>DATE YOU NEED IT</div>
                      <input type="date" style={inp}/>
                    </div>
                    <div style={{marginBottom:14}}>
                      <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>HOW MANY DAYS?</div>
                      <select style={{...inp,cursor:"pointer"}}>
                        {["1 day","2 days","Weekend (Fri–Mon)","3 days","1 week"].map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <button onClick={()=>setContactStep(2)} className="bp"
                      style={{width:"100%",padding:"11px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                      Next →
                    </button>
                  </div>
                )}
                {contactStep===2&&(
                  <div className="fu">
                    <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:11}}>2. Your contact details</div>
                    {[["YOUR NAME","text","First name"],["EMAIL","email","you@email.com"],["PHONE","tel","07700 000000"]].map(([l,t,p])=>(
                      <div key={l} style={{marginBottom:11}}>
                        <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>{l}</div>
                        <input type={t} placeholder={p} style={inp}/>
                      </div>
                    ))}
                    <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:11,marginBottom:12,fontSize:11,color:G.body,lineHeight:1.7}}>
                      Your enquiry goes to <strong>{contactShop.name}</strong> directly.{" "}
                      <strong style={{color:G.forest}}>Ready 4 Hire earns a £3 lead fee from the shop. You pay nothing.</strong>
                    </div>
                    {!user&&(
                      <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:"10px 13px",marginBottom:10,display:"flex",gap:9,alignItems:"center"}}>
                        
                        <div>
                          <div style={{fontWeight:700,fontSize:12,color:G.ink,marginBottom:2}}>Sign in to send your enquiry</div>
                          <div style={{fontSize:11,color:G.muted}}>Free account — 30 seconds. Your details above are saved.</div>
                        </div>
                      </div>
                    )}
                    <button onClick={()=>{if(!user){onLoginNeeded();return;}setContactDone(true);}} className="bp"
                      style={{width:"100%",padding:"11px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                      {user?"Send Enquiry →":"Sign In to Send →"}
                    </button>
                  </div>
                )}
              </>
            ):(
              <div className="fu" style={{textAlign:"center",padding:"8px 0"}}>
                
                <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:6}}>Enquiry Sent!</h3>
                <p style={{color:G.muted,fontSize:13,lineHeight:1.8,marginBottom:14}}>
                  <strong>{contactShop.name}</strong> will be in touch shortly.<br/>
                  Or call them directly: <a href={`tel:${contactShop.phone.replace(/\s/g,"")}`} style={{color:G.forest,fontWeight:700,textDecoration:"none"}}>{contactShop.phone}</a>
                </p>
                <div onClick={()=>{setContactShop(null);setContactDone(false);setTab("guide");}} style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:11,fontSize:12,color:G.body,marginBottom:14,cursor:"pointer"}}>
                  While you wait — check our <strong style={{color:G.forest}}>Buyer Guide →</strong> to get the best results from your hired machine.
                </div>
                <button onClick={()=>{setContactShop(null);setContactDone(false);}}
                  style={{padding:"9px 22px",background:G.forest,border:"none",borderRadius:10,color:G.white,fontWeight:700,cursor:"pointer"}}>Close</button>
              </div>
            )}
          </div>
        </Overlay>
      )}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────
function HomePage({setTab,R}){
  const [service,setService]=useState("carpet"); // "carpet" | "patio"
  const [mode,setMode]=useState("hire");
  const [pc,setPc]=useState("");

  const CITY_ROUTES={
    "london":"hire","milton keynes":"city-miltonkeynes","mk":"city-miltonkeynes",
    "birmingham":"city-birmingham","bham":"city-birmingham",
    "manchester":"city-manchester","mcr":"city-manchester",
    "leeds":"city-leeds","sheffield":"city-sheffield","bristol":"city-bristol",
    "luton":"city-luton","northampton":"city-northampton","leicester":"city-leicester",
    "nottingham":"city-nottingham","derby":"city-derby","coventry":"city-coventry",
    "reading":"city-reading","oxford":"city-oxford","swindon":"city-swindon","bath":"city-bath",
  };
  const detectCityRoute=val=>{const v=val.trim().toLowerCase();return CITY_ROUTES[v]||null;};
  const handleCarpetSearch=()=>{const r=detectCityRoute(pc);setTab(r||(mode==="hire"?"hire":mode==="services"?"services":"eot"));};

  const heroBg=`linear-gradient(168deg,${G.forest} 0%,${G.dark} 52%,${G.mid} 100%)`;
  const trustItems=[["742k","Monthly searches"],["17 cities","UK coverage"],["469+","Listed businesses"],["Free","Always for consumers"],["4.9 ★","1,840 UK reviews"],["ICO","Registered ZA123456"]];

  return(
    <div>
      {/* HERO */}
      <div style={{background:heroBg,padding:"60px 20px 64px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:`radial-gradient(${G.white} 1px,transparent 1px)`,backgroundSize:"28px 28px",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1,textAlign:"center"}}>

          {/* SERVICE TOGGLE */}
          <div style={{display:"flex",justifyContent:"center",width:"100%",marginBottom:24}}>
          <div className="heroToggle" style={{display:"inline-flex",background:"rgba(0,0,0,.25)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,.15)",borderRadius:40,padding:4,gap:3}}>
            <button onClick={()=>setService("carpet")}
              style={{padding:"9px 18px",border:"none",borderRadius:36,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",
                background:service==="carpet"?"rgba(255,255,255,.95)":"transparent",
                color:service==="carpet"?G.forest:"rgba(255,255,255,.75)"}}>
              Carpet Cleaning
            </button>
            <button onClick={()=>setTab("patiohire")}
              style={{padding:"9px 16px",border:"none",borderRadius:36,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",background:"transparent",color:"rgba(255,255,255,.75)",flexShrink:0}}>
              Patio and Outdoor
            </button>
            <button onClick={()=>setTab("eot")}
              style={{padding:"9px 16px",border:"none",borderRadius:36,cursor:"pointer",fontSize:12,fontWeight:700,whiteSpace:"nowrap",background:"transparent",color:"rgba(255,255,255,.75)",flexShrink:0}}>
              End of Tenancy
            </button>
          </div>
          </div>

          {/* CARPET HERO */}
          <h1 className="heroH1" style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(30px,6vw,62px)",color:G.white,lineHeight:1.1,letterSpacing:-1,marginBottom:12}}>
            Every Carpet Clean.<br/><em style={{color:G.light}}>Best Price Guaranteed.</em>
          </h1>
          <p style={{color:"rgba(255,255,255,.62)",fontSize:15,maxWidth:460,margin:"0 auto 38px",lineHeight:1.8}}>
            Compare carpet cleaning machine hire from £22/day, or get free quotes from verified local professionals — prices updated daily across the UK.
          </p>
          <div className="searchCard" style={{background:G.white,borderRadius:20,padding:22,maxWidth:650,margin:"0 auto",boxShadow:"0 20px 56px rgba(0,0,0,.22)"}}>
            <div style={{display:"flex",background:G.frost,borderRadius:11,padding:3,marginBottom:16,gap:2}}>
              {[["hire","Hire a Machine"],["services","Book a Professional"],["eot","End of Tenancy"]].map(([m,l])=>(
                <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"9px 4px",border:"none",borderRadius:9,cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s",background:mode===m?G.forest:"transparent",color:mode===m?G.white:G.muted,whiteSpace:"nowrap"}}>{l}</button>
              ))}
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"flex-end"}}>
              <div style={{flex:"1 1 180px"}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>POSTCODE OR CITY</div>
                <input value={pc} onChange={e=>setPc(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleCarpetSearch()}
                  placeholder="e.g. SW1 2AA or London" style={inp}/>
                {pc&&detectCityRoute(pc)&&<div style={{fontSize:11,color:G.forest,fontWeight:600,marginTop:3}}>Go to {pc.trim()} →</div>}
              </div>
              {mode==="hire"&&<div style={{flex:"1 1 130px"}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>DURATION</div><select style={{...inp,cursor:"pointer"}}>{["1 day","2 days","Weekend","3 days","1 week"].map(o=><option key={o}>{o}</option>)}</select></div>}
              {mode==="services"&&<div style={{flex:"1 1 130px"}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>ROOMS</div><select style={{...inp,cursor:"pointer"}}>{["1 room","2 rooms","3 rooms","4 rooms","5+ rooms","Whole house"].map(o=><option key={o}>{o}</option>)}</select></div>}
              {mode==="eot"&&<div style={{flex:"1 1 130px",minWidth:0,overflow:"hidden"}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>MOVE-OUT DATE</div><input type="date" style={{...inp,cursor:"pointer",fontSize:12,width:"100%",boxSizing:"border-box"}}/></div>}
              <button onClick={handleCarpetSearch} className="bp" style={{flex:"0 0 auto",padding:"12px 22px",background:G.forest,border:"none",borderRadius:11,color:G.white,fontSize:14,fontWeight:800,cursor:"pointer"}}>Search →</button>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{background:G.forest,padding:"15px 20px"}}>
        <div className="trustBar" style={{maxWidth:900,margin:"0 auto",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:16}}>
          {trustItems.map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:G.white}}>{v}</div>
              <div style={{color:G.light,fontSize:10,marginTop:1}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CITY DROPDOWN */}
      <div style={{background:G.white,borderBottom:`1px solid ${G.border}`,padding:"12px 20px"}}>
        <div style={{maxWidth:940,margin:"0 auto",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,flexShrink:0}}>FIND YOUR CITY</div>
          <select defaultValue="" onChange={e=>{const val=e.target.value;if(val)setTab(val);e.target.value="";}}
            style={{flex:"1 1 220px",padding:"8px 12px",border:`1px solid ${G.border}`,borderRadius:9,fontSize:13,color:G.body,background:G.white,cursor:"pointer"}}>
            <option value="">Select a city...</option>
            <optgroup label="UK Cities — Live">
              {[["city-london","London"],["city-miltonkeynes","Milton Keynes"],["city-birmingham","Birmingham"],["city-manchester","Manchester"],["city-leeds","Leeds"],["city-sheffield","Sheffield"],["city-bristol","Bristol"],["city-luton","Luton"],["city-northampton","Northampton"],["city-leicester","Leicester"],["city-nottingham","Nottingham"],["city-derby","Derby"],["city-coventry","Coventry"],["city-reading","Reading"],["city-oxford","Oxford"],["city-swindon","Swindon"],["city-bath","Bath"]].map(([val,label])=>(
                <option key={val} value={val}>{label}</option>
              ))}
            </optgroup>
            <optgroup label="Coming Soon">
              {["Edinburgh","Glasgow","Liverpool","Newcastle","Cardiff"].map(c=><option key={c} disabled>{c}</option>)}
            </optgroup>
          </select>
          <span style={{fontSize:11,color:G.muted}}>17 cities live · more coming soon</span>
        </div>
      </div>

      {/* THREE WAYS WE HELP */}
      <div style={{maxWidth:940,margin:"0 auto",padding:"56px 20px"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <SLabel t="THREE WAYS WE HELP"/>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,36px)",color:G.ink,letterSpacing:-.5}}>
            Find the right solution for your carpet
          </h2>
          <p style={{color:G.muted,fontSize:14,maxWidth:420,margin:"10px auto 0",lineHeight:1.75}}>
            Not sure whether to hire or book a pro? Our buyer guide helps you decide in 2 minutes.
          </p>
        </div>
        <div className="pillars" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {[
            {t:"hire",    title:"Hire a Machine",      dark:true,  bg:[G.forest,G.dark],  bullets:["From £22/day","No deposit options","Collect same day","5 machines compared"],    cta:"Compare machines →",    ctaCol:G.light},
            {t:"services",title:"Book a Professional", dark:false, bg:[G.white,G.white],   bullets:["From £75/room","Verified & insured","Free quotes","742k monthly UK searches"],  cta:"Find local cleaners →", ctaCol:G.forest},
            {t:"eot",     title:"End of Tenancy",      dark:true,  bg:[G.ink,"#2E4030"],   bullets:["Deposit return focus","Urgent 24hr option","Landlord checklist","Pro guarantee"], cta:"See EOT options →",   ctaCol:G.light},
          ].map(p=>(
            <div key={p.t} className="ch" onClick={()=>setTab(p.t)} style={{background:`linear-gradient(145deg,${p.bg[0]},${p.bg[1]})`,border:p.dark?"none":`1.5px solid ${G.border}`,borderRadius:20,padding:28,cursor:"pointer",boxShadow:p.dark?"0 6px 22px rgba(27,94,32,.16)":"0 3px 12px rgba(27,94,32,.07)"}}>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:p.dark?G.white:G.ink,marginBottom:8}}>{p.title}</h3>
              <div style={{marginBottom:15}}>{p.bullets.map(b=><div key={b} style={{fontSize:12,color:p.dark?"rgba(255,255,255,.68)":G.body,marginBottom:4}}>✓ {b}</div>)}</div>
              <div style={{fontWeight:700,fontSize:13,color:p.ctaCol}}>{p.cta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ALSO COVERS PATIO ROW */}
      <div style={{background:G.white,borderTop:`1px solid ${G.border}`,borderBottom:`1px solid ${G.border}`,padding:"28px 20px"}}>
        <div style={{maxWidth:940,margin:"0 auto",display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:200}}>
            <SLabel t="ALSO COVERS"/>
            <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:6}}>Patio and Outdoor Cleaning</h3>
            <p style={{fontSize:13,color:G.muted,lineHeight:1.7}}>Hire a pressure washer from £32/day or book a verified patio cleaning professional. 299,000 monthly UK searches.</p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
            <button onClick={()=>setTab("patiohire")} className="bp" style={{padding:"10px 16px",background:"#1A4A0A",border:"none",borderRadius:11,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Hire a Pressure Washer →</button>
            <button onClick={()=>setTab("patioservices")} className="bp" style={{padding:"10px 16px",background:G.white,border:`1.5px solid #1A4A0A`,borderRadius:11,color:"#1A4A0A",fontSize:12,fontWeight:700,cursor:"pointer"}}>Book a Patio Pro →</button>
          </div>
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{background:`linear-gradient(135deg,${G.ink},#1E3520)`,padding:"44px 20px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{marginBottom:22}}>
            <div style={{fontSize:10,fontWeight:800,color:G.bright,letterSpacing:2,marginBottom:10}}>FOR CLEANING BUSINESSES AND HIRE SHOPS</div>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,3vw,34px)",color:G.white,marginBottom:10,lineHeight:1.2}}>
              Get More Customers.<br/>From £39/month.
            </h2>
            <p style={{color:"rgba(255,255,255,.6)",fontSize:14,lineHeight:1.75,maxWidth:480}}>
              742,000 people search for carpet cleaning across the UK every month. List your business and start receiving verified enquiries.
            </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",marginBottom:18}}>
            {[["Cleaning Business","List your professional cleaning service — from £39/month","business"],
              ["Hire Shop","List your carpet or pressure washer hire shop — from £39/month","shopapply"]].map(([t,d,dest])=>(
              <div key={t} onClick={()=>setTab(dest)}
                style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.18)",borderRadius:14,padding:"15px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,boxSizing:"border-box",width:"100%"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.15)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.08)"}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:800,color:G.white,fontSize:14,marginBottom:4}}>{t}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,.55)",lineHeight:1.5}}>{d}</div>
                </div>
                <div style={{fontWeight:700,fontSize:12,color:G.bright,flexShrink:0,paddingLeft:8}}>Apply now →</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            {[["742k","UK searches/month"],["469+","Listings live"],["£39","Starting from"],["48hrs","To go live"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center",flex:"1 1 60px"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.bright}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.45)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRUST + REVIEWS */}
      <div style={{background:G.frost,borderTop:`1px solid ${G.border}`,borderBottom:`1px solid ${G.border}`,padding:"44px 20px"}}>
        <div className="threeCol" style={{maxWidth:940,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:28}}>
          <div>
            <SLabel t="CUSTOMER REVIEWS"/>
            {[{n:"Sarah T.",t:"Found Rug Doctor £3 cheaper than going direct. 30 seconds to compare."},
              {n:"James M.",t:"The end of tenancy section saved my deposit. Brilliant."},
              {n:"Emma R.",t:"Booked Crystal Clean Pro through here. Spotless results, fast response."}].map((r,i)=>(
              <div key={i} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:11,padding:13,marginBottom:9}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontWeight:700,fontSize:12,color:G.ink}}>{r.n}</span>
                  <Stars r={5} size={11}/>
                </div>
                <div style={{fontSize:12,color:G.muted,lineHeight:1.6}}>{r.t}</div>
              </div>
            ))}
          </div>
          <div>
            <SLabel t="WHY READY 4 HIRE"/>
            {[["No ads, ever","We never take payment to feature a business higher. Rankings are based on ratings and reviews only."],
              ["All prices verified","We check hire prices daily. If a shop changes its pricing, we update within 24 hours."],
              ["Free for consumers","Comparing prices and getting quotes is always free. We earn from businesses, not customers."]].map(([h,d])=>(
              <div key={h} style={{marginBottom:14}}>
                <div style={{fontWeight:700,fontSize:13,color:G.ink,marginBottom:3}}>✓ {h}</div>
                <div style={{fontSize:12,color:G.muted,lineHeight:1.65}}>{d}</div>
              </div>
            ))}
          </div>
          <div>
            <SLabel t="ABOUT READY 4 HIRE"/>
            <p style={{fontSize:13,color:G.muted,lineHeight:1.75,marginBottom:14}}>
              Ready 4 Hire is the UK dedicated carpet and outdoor cleaning comparison platform. We connect consumers with verified hire shops, professional cleaners and EOT specialists across 17 UK cities.
            </p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button onClick={()=>setTab("about")} style={{padding:"8px 14px",background:G.white,border:`1px solid ${G.border}`,borderRadius:9,fontSize:11,fontWeight:700,color:G.forest,cursor:"pointer"}}>About us →</button>
              <button onClick={()=>setTab("business")} style={{padding:"8px 14px",background:G.forest,border:"none",borderRadius:9,fontSize:11,fontWeight:700,color:G.white,cursor:"pointer"}}>List a business →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HirePage({user,onLoginNeeded,addAlert,setTab,R}){
  const [hireView,setHireView]=useState("national"); // "national" | "local"
  const [sort,setSort]=useState("price");
  const [filter,setFilter]=useState("all");
  const [days,setDays]=useState(1);
  const [openId,setOpenId]=useState(null);
  const [toast,setToast]=useState(null);
  const [pcKey,setPcKey]=useState(null);
  const [pcLabel,setPcLabel]=useState("");
  const [alertMachine,setAlertMachine]=useState(undefined);
  const [loading,setLoading]=useState(true);
  const [liveP,setLiveP]=useState({});

  // IMPROVEMENT 1: Simulate live price feed with skeleton loading
  useEffect(()=>{
    setLoading(true);
    const t=setTimeout(()=>{
      const lp={};
      MACHINES.forEach(m=>{lp[m.id]=JITTER(m.price);});
      setLiveP(lp);setLoading(false);
    },900);
    return()=>clearTimeout(t);
  },[]);

  const fire=name=>{setToast(name);setTimeout(()=>setToast(null),3000);};

  const regionMachines=MACHINES;
  const shown=[...regionMachines]
    .filter(m=>filter==="nodeposit"?m.deposit===0:filter==="delivery"?m.delivery:filter==="solution"?m.solution:filter==="instock"?m.inStock:true)
    .sort((a,b)=>sort==="price"?(liveP[a.id]||a.price)-(liveP[b.id]||b.price):b.rating-a.rating);

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>

        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10,marginBottom:20}}>
          <div>
            <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,32px)",color:G.ink,marginBottom:4}}>Compare Carpet Cleaner Hire</h1>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <span style={{color:G.muted,fontSize:13}}>5 machines + {LOCAL_SHOPS.length} local shops ·</span><LiveDot/><span style={{color:G.muted,fontSize:13}}>· Updated daily</span>
            </div>
          </div>
          <button onClick={()=>setAlertMachine(null)} style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:10,padding:"8px 13px",cursor:"pointer",fontSize:12,fontWeight:700,color:G.forest,display:"flex",alignItems:"center",gap:5}}>
            Set Price Alert
          </button>
        </div>

        {/* Section toggle: National Brands vs Local Shops — compact */}
        <div style={{display:"inline-flex",background:G.white,border:`1px solid ${G.border}`,borderRadius:10,padding:3,marginBottom:12,gap:3}}>
          <button onClick={()=>setHireView("national")} style={{padding:"6px 14px",border:"none",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s",background:hireView==="national"?G.forest:"transparent",color:hireView==="national"?G.white:G.muted,whiteSpace:"nowrap"}}>
            National Brands
          </button>
          <button onClick={()=>setHireView("local")} style={{padding:"6px 14px",border:"none",borderRadius:7,cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s",background:hireView==="local"?G.forest:"transparent",color:hireView==="local"?G.white:G.muted,whiteSpace:"nowrap"}}>
            Local Shops
          </button>
        </div>

        {/* NATIONAL BRANDS view */}
        {hireView==="national"&&(<>

        {/* Postcode — its own card so city/postcode search stays prominent */}
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <div style={{fontSize:9,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:6}}>ENTER YOUR POSTCODE OR CITY</div>
          <PCLookup onFound={(p,k)=>{setPcKey(k);setPcLabel(p);}}/>
        </div>

        {/* Filters — condensed single inline row */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          <span style={{fontSize:11,color:G.muted,fontWeight:600,flexShrink:0}}>Filter:</span>
          {/* Days pill input */}
          <div style={{display:"flex",alignItems:"center",gap:4,background:G.white,border:`1px solid ${G.border}`,borderRadius:20,padding:"5px 10px 5px 12px"}}>
            <span style={{fontSize:11,color:G.muted,fontWeight:600,whiteSpace:"nowrap"}}>Days</span>
            <input type="number" min={1} max={14} value={days} onChange={e=>setDays(Math.max(1,+e.target.value))}
              style={{width:36,border:"none",outline:"none",fontSize:12,fontWeight:700,color:G.ink,background:"transparent",textAlign:"center",padding:0}}/>
          </div>
          {/* Sort pills */}
          {[["price","Price"],["rating","⭐ Rating"]].map(([v,l])=>(
            <button key={v} onClick={()=>setSort(v)}
              style={{padding:"5px 12px",border:`1px solid ${sort===v?G.forest:G.border}`,borderRadius:20,background:sort===v?G.forest:G.white,color:sort===v?G.white:G.muted,fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s"}}>
              {l}
            </button>
          ))}
          {/* Divider */}
          <div style={{width:1,height:16,background:G.border,flexShrink:0}}/>
          {/* Filter pills */}
          {[["all","All"],["nodeposit","No Deposit"],["delivery","Delivery"],["solution","Solution Incl."],["instock","In Stock"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)}
              style={{padding:"5px 11px",border:`1px solid ${filter===v?G.forest:G.border}`,borderRadius:20,background:filter===v?G.forest:G.white,color:filter===v?G.white:G.muted,fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s"}}>
              {l}
            </button>
          ))}
          {/* Result count — pushed right */}
          <div style={{marginLeft:"auto",fontSize:11,color:G.muted,flexShrink:0}}>
            <strong style={{color:G.ink}}>{shown.length}</strong> result{shown.length!==1?"s":""} · {days} day{days!==1?"s":""}
          </div>
        </div>

        {/* Machine cards */}
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          {shown.map((m,i)=>{
            const lp=loading?null:(liveP[m.id]||m.price);
            const pStr=m.pickups[pcKey||"def"]||m.pickups.def;
            return(
              <div key={m.id} className="ch" style={{background:G.white,borderRadius:18,padding:20,border:`1.5px solid ${i===0?G.dark:G.border}`,position:"relative",boxShadow:i===0?"0 4px 20px rgba(27,94,32,.09)":"0 2px 8px rgba(0,0,0,.04)"}}>
                {m.badge&&<div style={{position:"absolute",top:-11,left:18,background:i===0?`linear-gradient(135deg,${G.forest},${G.mid})`:G.ink,color:G.white,fontSize:9,fontWeight:800,padding:"3px 12px",borderRadius:20,letterSpacing:1}}>{m.badge.toUpperCase()}</div>}

                <div className="cardBody" style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                  {/* Logo */}
                  <div style={{width:48,height:48,borderRadius:13,flexShrink:0,background:m.col,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:13}}>{m.logo}</div>

                  {/* Info */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.ink,marginBottom:4}}>{m.name}</div>
                    <Stars r={m.rating} n={m.reviews}/>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
                      {m.feats.map(f=><Chip key={f} green xs>{f}</Chip>)}
                      <StockPill ok={m.inStock}/>
                    </div>
                    {/* IMPROVEMENT 2: Live nearby pickup points after postcode entry */}
                    {pcKey&&(
                      <div className="fu" style={{marginTop:10,background:G.pale,borderRadius:9,padding:"7px 11px",border:`1px solid ${G.border}`}}>
                        <div style={{fontSize:9,fontWeight:800,color:G.forest,letterSpacing:1,marginBottom:3}}>NEAREST PICKUP{pcLabel?` (${pcLabel})`:""}</div>
                        {pStr.split("·").map(pt=><div key={pt} style={{fontSize:11,color:G.body,marginBottom:1}}>• {pt.trim()}</div>)}
                      </div>
                    )}
                    {/* Amazon product — always visible below machine info */}
                    {m.id===1&&<AmazonWidget product={AMAZON_PRODUCTS.rugdoctor_solution} context="extra solution for Rug Doctor"/>}
                    {m.id===2&&<AmazonWidget product={AMAZON_PRODUCTS.karcher_solution}  context="solution required — not included with Kärcher"/>}
                    {m.id===3&&<AmazonWidget product={AMAZON_PRODUCTS.bissell_solution}  context="Bissell pet formula refill"/>}
                    {m.id===4&&<AmazonWidget product={AMAZON_PRODUCTS.universal_solution} context="compatible cleaning solution"/>}
                    {m.id===5&&<AmazonWidget product={AMAZON_PRODUCTS.pretreat_spray}    context="pre-treatment spray for stubborn stains"/>}
                  </div>

                  {/* IMPROVEMENT 1: Live price with skeleton */}
                  <div className="priceCol" style={{textAlign:"right",minWidth:148,flexShrink:0}}>
                    {loading?(
                      <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end",marginBottom:8}}>
                        <div className="sk" style={{height:36,width:80}}/>
                        <div className="sk" style={{height:13,width:58}}/>
                      </div>
                    ):(
                      <div style={{marginBottom:6}}>
                        <div style={{display:"inline-flex",alignItems:"baseline",gap:4}}>
                          <span style={{fontFamily:"'DM Serif Display',serif",fontSize:30,color:G.forest,lineHeight:1}}>£{lp}</span>
                          <span style={{fontSize:8,fontWeight:800,background:G.pale,color:G.dark,border:`1px solid ${G.border}`,padding:"1px 5px",borderRadius:10,letterSpacing:.8,verticalAlign:"middle"}}>LIVE</span>
                        </div>
                        <div style={{color:G.muted,fontSize:11}}>per day</div>
                        {days>1&&<div style={{color:G.body,fontSize:12,marginTop:2}}>£{lp*days} for {days} days</div>}
                      </div>
                    )}
                    <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end"}}>
                      {m.deposit===0
                        ?<span style={{background:G.pale,color:G.dark,border:`1px solid ${G.border}`,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20}}>No deposit</span>
                        :<span style={{background:G.orangeLight,color:G.orange,border:"1px solid #FFCC8088",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20}}>£{m.deposit} deposit</span>
                      }
                      <button onClick={()=>fire(m.brand)} className="bp" style={{width:140,padding:"9px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                        {m.inStock?"Check Availability →":"Check Availability ⚠"}
                      </button>
                      {/* IMPROVEMENT 4: Per-machine price alert button */}
                      <div style={{display:"flex",gap:5,width:140}}>
                        <button onClick={()=>setAlertMachine({...m,livePrice:lp||m.price})} style={{flex:1,padding:"6px 0",background:"none",border:`1px solid ${G.border}`,color:G.muted,borderRadius:9,fontSize:10,cursor:"pointer"}}>Alert</button>
                        <button onClick={()=>setOpenId(openId===m.id?null:m.id)} style={{flex:1,padding:"6px 0",background:"none",border:`1px solid ${G.border}`,color:G.muted,borderRadius:9,fontSize:10,cursor:"pointer"}}>{openId===m.id?"Less ▲":"More ▼"}</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* IMPROVEMENT 5: Expanded details — best for / not ideal for */}
                {openId===m.id&&(
                  <div className="fu" style={{marginTop:15,paddingTop:15,borderTop:`1px solid ${G.border}`}}>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:8,marginBottom:12}}>
                      {[["🚚 Delivery",m.delivery?"Available (+£8)":"Not available"],["🧴 Solution",m.solution?"Included free":"Purchase separately"],["💳 Deposit",m.deposit===0?"None required":`£${m.deposit} refundable`],["📅 Weekend",`£${m.weekend} (Fri–Mon)`],["Commission",`≈ £${(m.price*days*m.cpa).toFixed(2)} CPA`]].map(([l,v])=>(
                        <div key={l} style={{background:G.frost,borderRadius:9,padding:"8px 11px",border:`1px solid ${G.border}`}}>
                          <div style={{fontSize:9,color:G.muted,fontWeight:700,letterSpacing:.8}}>{l.toUpperCase()}</div>
                          <div style={{fontSize:12,fontWeight:600,color:G.ink,marginTop:2}}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="twoCol" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      <div style={{background:G.pale,borderRadius:10,padding:11}}>
                        <div style={{fontSize:9,fontWeight:800,color:G.forest,letterSpacing:1,marginBottom:6}}>✓ BEST FOR</div>
                        {m.bestFor.map(b=><div key={b} style={{fontSize:11,color:G.body,marginBottom:3}}>• {b}</div>)}
                      </div>
                      <div style={{background:G.orangeLight,borderRadius:10,padding:11}}>
                        <div style={{fontSize:9,fontWeight:800,color:G.orange,letterSpacing:1,marginBottom:6}}>✗ NOT IDEAL FOR</div>
                        {m.notFor.map(b=><div key={b} style={{fontSize:11,color:G.body,marginBottom:3}}>• {b}</div>)}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{marginTop:18,background:G.white,border:`1px solid ${G.border}`,borderRadius:11,padding:13,fontSize:11,color:G.muted,lineHeight:1.8}}>
          <strong style={{color:G.body}}>ⓘ Prices</strong> sourced live from provider websites and affiliate feeds. Ready 4 Hire earns CPA commission (7–12%) on completed bookings. ICO registered ZA123456 · UK only
        </div>
        </>)} {/* end national brands */}

        {/* LOCAL SHOPS view */}
        {hireView==="local"&&(
          <LocalShopsSection user={user} onLoginNeeded={onLoginNeeded} setTab={setTab} defaultCity="London"/>
        )}
      </div>

      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:G.forest,color:G.white,borderRadius:12,padding:"12px 20px",fontWeight:700,fontSize:12,zIndex:500,animation:"toastSlide .3s ease",whiteSpace:"nowrap",boxShadow:"0 8px 28px rgba(0,0,0,.22)"}}>✓ Redirecting to {toast} — commission tracked</div>}
      {alertMachine!==undefined&&<AlertModal machine={alertMachine} onClose={()=>setAlertMachine(undefined)} onSet={()=>{addAlert();setAlertMachine(undefined);}}/>}
    </div>
  );
}

// ─── SERVICES PAGE ─────────────────────────────────────────
function ServicesPage({user,onLoginNeeded}){
  const [city,setCity]=useState("London");
  const [sort,setSort]=useState("rating");
  const [quoting,setQuoting]=useState(null);
  const [step,setStep]=useState(1);
  const [done,setDone]=useState(false);
  const openQuote=c=>{setQuoting(c);setStep(1);setDone(false);};
  const shown=[...CLEANERS].filter(c=>city==="All"||c.city===city).sort((a,b)=>{
    if(a.plan==="premium"&&b.plan!=="premium") return -1;
    if(b.plan==="premium"&&a.plan!=="premium") return 1;
    return sort==="price"?a.from-b.from:b.rating-a.rating;
  });

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div style={{marginBottom:20}}>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,32px)",color:G.ink,marginBottom:4}}>Book a Carpet Cleaning Professional</h1>
          <p style={{color:G.muted,fontSize:13}}>All verified · Fully insured · Free quotes · No obligation</p>
        </div>

        <div className="ctrlRow" style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:16,marginBottom:14,display:"flex",gap:10,flexWrap:"nowrap",alignItems:"flex-end"}}>
          <div style={{flex:"1 1 0"}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>LOCATION</div><select value={city} onChange={e=>setCity(e.target.value)} style={{...inp,cursor:"pointer"}}>{["London","Milton Keynes","Birmingham","Manchester","Leeds","Sheffield","Bristol","Luton","Northampton","Leicester","Nottingham","Derby","Coventry","Reading","Oxford","Swindon","Bath","All"].map(c=><option key={c} value={c}>{c==="All"?"All Areas":c}</option>)}</select></div>
          <div style={{flex:"1 1 0"}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>SORT</div><select value={sort} onChange={e=>setSort(e.target.value)} style={{...inp,cursor:"pointer"}}><option value="rating">Best Rated</option><option value="price">Lowest Price</option></select></div>
          <div className="ctrlCount" style={{textAlign:"right",paddingBottom:9,flexShrink:0}}><div style={{fontSize:11,color:G.muted}}><strong style={{color:G.ink}}>{shown.length}</strong> verified</div><div style={{fontSize:10,color:G.muted}}>Insured</div></div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {shown.map((c,i)=>{
            const isPremium = c.plan==="premium";
            return(
            <div key={c.id} className="ch" style={{
              background:isPremium?`linear-gradient(180deg,#FFFDF0 0%,${G.white} 60%)`:G.white,
              borderRadius:18,padding:20,
              border:`1.5px solid ${isPremium?"#F5A800":i===0?G.dark:G.border}`,
              position:"relative",
              boxShadow:isPremium?"0 6px 28px rgba(245,168,0,.18)":i===0?"0 4px 20px rgba(27,94,32,.09)":"0 2px 8px rgba(0,0,0,.04)"}}>
              {/* Premium spotlight bar */}
              {isPremium&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${G.gold},#F57F17,${G.gold})`,borderRadius:"18px 18px 0 0"}}/>}
              {c.badge&&<div style={{position:"absolute",top:-11,left:18,background:isPremium?`linear-gradient(135deg,${G.gold},#E65100)`:i===0?`linear-gradient(135deg,${G.forest},${G.mid})`:G.ink,color:isPremium?G.ink:G.white,fontSize:9,fontWeight:800,padding:"3px 12px",borderRadius:20,letterSpacing:1}}>{c.badge.toUpperCase()}</div>}
              <div className="cardBody" style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:48,height:48,borderRadius:13,flexShrink:0,background:c.col,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:13}}>{c.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
                    <span style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.ink}}>{c.name}</span>
                    {c.verified&&<Pill text="✓ Verified" color={G.forest}/>}
                    <Pill text="🛡️ Insured" color={G.blue}/>
                    {isPremium&&<span style={{background:`linear-gradient(135deg,${G.gold},#F57F17)`,color:G.ink,fontSize:9,fontWeight:800,padding:"3px 10px",borderRadius:20,letterSpacing:.8}}>⭐ PREMIUM</span>}
                  </div>
                  <Stars r={c.rating} n={c.reviews}/>
                  <div style={{fontSize:11,color:G.muted,marginTop:3}}>{c.city} · {c.response} · {c.jobs.toLocaleString()} jobs</div>
                  <div style={{fontSize:12,color:G.body,marginTop:5,lineHeight:1.6,fontStyle:"italic"}}>{c.about}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>{c.services.map(s=><Chip key={s} green xs>{s}</Chip>)}</div>
                </div>
                <div className="priceCol" style={{textAlign:"right",minWidth:140,flexShrink:0}}>
                  <div style={{color:G.muted,fontSize:11}}>From</div>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:30,color:isPremium?G.gold:G.forest,lineHeight:1}}>£{c.from}</div>
                  <div style={{color:G.muted,fontSize:11,marginBottom:10}}>per room</div>
                  <button onClick={()=>openQuote(c)} className="bp" style={{display:"block",width:"100%",padding:"10px 0",background:isPremium?G.gold:G.forest,border:"none",borderRadius:10,color:isPremium?G.ink:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Get Free Quote →</button>
                  {c.website&&c.website!=="See website"&&c.website!=="See listing"&&c.website!=="See Checkatrade"&&(
                    <a href={"https://"+c.website} target="_blank" rel="noopener noreferrer"
                      style={{display:"block",width:"100%",marginTop:5,padding:"5px 0",background:"none",border:`1px solid ${isPremium?G.gold:G.border}`,color:isPremium?G.gold:G.forest,borderRadius:10,fontSize:11,cursor:"pointer",textAlign:"center",textDecoration:"none",fontWeight:600}}>
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Machine hire upsell */}
        <div style={{marginTop:22,background:G.white,border:`1.5px solid ${G.border}`,borderRadius:14,padding:18,display:"flex",gap:13,alignItems:"center",flexWrap:"wrap"}}>
          
          <div style={{flex:1,minWidth:160}}><div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:2}}>Prefer to do it yourself?</div><div style={{fontSize:12,color:G.muted}}>Hire a machine from £22/day — great results, no pro needed.</div></div>
          <button className="bp" style={{padding:"9px 17px",background:G.forest,color:G.white,border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>Compare Hire Machines →</button>
        </div>
      </div>

      {/* IMPROVEMENT: Quote modal — 3-step, transparent lead fee disclosure */}
      {quoting&&(
        <Overlay onClose={()=>{setQuoting(null);setDone(false);}}>
          <div className="pop" style={{background:G.white,borderRadius:20,padding:30,width:440,maxWidth:"100%",maxHeight:"90vh",overflowY:"auto",position:"relative",boxShadow:"0 20px 60px rgba(0,0,0,.18)"}}>
            <button onClick={()=>{setQuoting(null);setDone(false);}} style={{position:"absolute",top:14,right:16,background:"none",border:"none",color:G.muted,fontSize:22,cursor:"pointer",lineHeight:1}}>×</button>
            {!done?(
              <>
                <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:16}}>
                  <div style={{width:40,height:40,borderRadius:11,background:quoting.col,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:12,flexShrink:0}}>{quoting.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                  <div><div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.ink}}>{quoting.name}</div><div style={{color:G.muted,fontSize:11}}>Free quote · Responds {quoting.response}</div></div>
                </div>
                <div style={{display:"flex",gap:5,marginBottom:18}}>{[1,2,3].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?G.forest:G.border,transition:"background .3s"}}/>)}</div>
                {step===1&&<div className="fu">
                  <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:11}}>1. What needs cleaning?</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14}}>
                    {["Living room","Bedroom","Stairs","Hallway","Dining room","Whole house","Upholstery","Commercial"].map(r=>(
                      <label key={r} style={{display:"flex",alignItems:"center",gap:7,background:G.frost,borderRadius:9,padding:"8px 10px",cursor:"pointer",border:`1px solid ${G.border}`}}>
                        <input type="checkbox" style={{accentColor:G.forest}}/><span style={{fontSize:12,color:G.ink}}>{r}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={()=>setStep(2)} className="bp" style={{width:"100%",padding:"11px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Next →</button>
                </div>}
                {step===2&&<div className="fu">
                  <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:11}}>2. Your contact details</div>
                  {[["FULL NAME","text","Your name"],["EMAIL","email","you@email.com"],["PHONE","tel","07700 000000"],["PREFERRED DATE","date",""]].map(([l,t,p])=>(
                    <div key={l} style={{marginBottom:11}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>{l}</div><input type={t} placeholder={p} style={inp}/></div>
                  ))}
                  <button onClick={()=>setStep(3)} className="bp" style={{width:"100%",padding:"11px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Next →</button>
                </div>}
                {step===3&&<div className="fu">
                  <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:11}}>3. Any extra details?</div>
                  <textarea placeholder="e.g. pet stains, moving out next week, parking available..." rows={3} style={{...inp,resize:"vertical",marginBottom:11}}/>
                  <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:11,marginBottom:12,fontSize:11,color:G.body,lineHeight:1.7}}>
                    Request goes to <strong>{quoting.name}</strong>. They respond within {quoting.response}. <strong style={{color:G.forest}}>Ready 4 Hire earns a £10–£18 lead fee from the business. You pay nothing.</strong>
                  </div>
                  {!user&&(
                    <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:"10px 13px",marginBottom:10,display:"flex",gap:9,alignItems:"center"}}>
                      
                      <div>
                        <div style={{fontWeight:700,fontSize:12,color:G.ink,marginBottom:2}}>Sign in to send your quote request</div>
                        <div style={{fontSize:11,color:G.muted}}>Free account — takes 30 seconds. Your details above are saved.</div>
                      </div>
                    </div>
                  )}
                  <button onClick={()=>{if(!user){onLoginNeeded();return;}setDone(true);}} className="bp" style={{width:"100%",padding:"11px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                    {user?"Send Quote Request →":"Sign In to Send →"}
                  </button>
                </div>}
              </>
            ):(
              <div className="fu" style={{textAlign:"center",padding:"8px 0"}}>
                
                <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:6}}>Quote Request Sent!</h3>
                <p style={{color:G.muted,fontSize:13,lineHeight:1.8,marginBottom:14}}><strong>{quoting.name}</strong> will contact you within {quoting.response}.</p>
                <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:11,fontSize:12,color:G.body,marginBottom:14}}>
                  💌 Confirmation sent. Check our <strong>Buyer Guide</strong> for questions to ask when they call.
                </div>
                <button onClick={()=>{setQuoting(null);setDone(false);}} style={{padding:"9px 22px",background:G.forest,border:"none",borderRadius:10,color:G.white,fontWeight:700,cursor:"pointer"}}>Close</button>
              </div>
            )}
          </div>
        </Overlay>
      )}
    </div>
  );
}

// ─── END OF TENANCY PAGE ───────────────────────────────────
// ─── EOT BUSINESS DIRECTORY ────────────────────────────────
function EOTBusinessDirectory({setTab}){
  const [city,setCity]=useState("All");
  const [sort,setSort]=useState("rating");
  const [page,setPage]=useState(1);
  const PER_PAGE=10;

  const ALL_EOT_CITIES=[...new Set(EOT_BUSINESSES.map(b=>b.city))].sort();

  const filtered=[...EOT_BUSINESSES]
    .filter(b=>city==="All"||b.city===city)
    .sort((a,b)=>sort==="rating"?b.rating-a.rating:a.from-b.from);

  const totalPages=Math.ceil(filtered.length/PER_PAGE);
  const shown=filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  // Reset to page 1 when filter changes
  const handleCity=c=>{setCity(c);setPage(1);};
  const handleSort=s=>{setSort(s);setPage(1);};

  return(
    <div style={{marginTop:24}}>
      <SLabel t="VERIFIED EOT CLEANING SPECIALISTS"/>
      <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.ink,marginBottom:6}}>End of Tenancy Cleaning Companies</h2>
      <p style={{fontSize:13,color:G.muted,lineHeight:1.7,marginBottom:16}}>
        {EOT_BUSINESSES.length} verified end of tenancy specialists across {ALL_EOT_CITIES.length} UK cities. All deposit-back guarantees. All fully insured.
      </p>

      {/* Filter row */}
      <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:14,marginBottom:16,display:"flex",gap:10,flexWrap:"nowrap",alignItems:"flex-end"}}>
        <div style={{flex:"1 1 0"}}>
          <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>CITY</div>
          <select value={city} onChange={e=>handleCity(e.target.value)} style={{...inp,cursor:"pointer"}}>
            <option value="All">All Cities</option>
            {ALL_EOT_CITIES.map(c=><option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{flex:"1 1 0"}}>
          <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>SORT</div>
          <select value={sort} onChange={e=>handleSort(e.target.value)} style={{...inp,cursor:"pointer"}}>
            <option value="rating">Best Rated</option>
            <option value="price">Lowest Price</option>
          </select>
        </div>
        <div className="ctrlCount" style={{textAlign:"right",paddingBottom:8,flexShrink:0}}>
          <div style={{fontSize:11,color:G.muted}}>
            <strong style={{color:G.ink}}>{filtered.length}</strong> companies
          </div>
        </div>
      </div>

      {/* Business cards */}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {shown.map((b,i)=>{
          const globalIndex=(page-1)*PER_PAGE+i;
          return(
            <div key={b.id} style={{background:G.white,border:`1.5px solid ${globalIndex===0&&city!=="All"?G.dark:G.border}`,borderRadius:16,padding:18,boxShadow:globalIndex===0?"0 4px 16px rgba(27,94,32,.08)":"0 2px 6px rgba(0,0,0,.04)",position:"relative"}}>
              {b.badge&&<div style={{position:"absolute",top:-11,left:16,background:globalIndex===0&&city!=="All"?`linear-gradient(135deg,${G.forest},${G.mid})`:G.ink,color:G.white,fontSize:9,fontWeight:800,padding:"3px 12px",borderRadius:20,letterSpacing:1}}>{b.badge.toUpperCase()}</div>}
              <div style={{display:"flex",gap:12,alignItems:"flex-start",flexWrap:"wrap"}}>
                <div style={{width:44,height:44,borderRadius:12,background:b.col,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:12,flexShrink:0}}>
                  {b.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                </div>
                <div style={{flex:1,minWidth:160}}>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",marginBottom:2}}>
                    <span style={{fontWeight:700,color:G.ink,fontSize:14}}>{b.name}</span>
                    {b.verified&&<Pill text="Verified" color={G.forest}/>}
                    <Pill text="Insured" color="#1565C0"/>
                  </div>
                  <Stars r={b.rating} n={b.reviews}/>
                  <div style={{fontSize:11,color:G.muted,marginTop:2}}>{b.city} · {b.response} response · {b.jobs.toLocaleString()} jobs</div>
                  {b.phone&&b.phone!=="See website"&&b.phone!=="See listing"&&(
                    <div style={{fontSize:11,fontWeight:700,color:G.forest,marginTop:2}}>{b.phone}</div>
                  )}
                  <div style={{fontSize:12,color:G.body,marginTop:4,lineHeight:1.65}}>{b.about}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:6}}>
                    {b.services.map(s=><Chip key={s} green xs>{s}</Chip>)}
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:11,color:G.muted}}>From</div>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:G.forest}}>£{b.from}</div>
                  <div style={{fontSize:10,color:G.muted,marginBottom:8}}>full property</div>
                  <div style={{display:"flex",flexDirection:"column",gap:5}}>
                    {b.phone&&b.phone!=="See website"&&b.phone!=="See listing"?(
                      <a href={"tel:"+b.phone.replace(/\s/g,"")} style={{display:"block",padding:"7px 10px",background:G.forest,borderRadius:9,color:G.white,fontSize:11,fontWeight:700,textDecoration:"none",textAlign:"center"}}>📞 Call Now</a>
                    ):(
                      <button onClick={()=>setTab("eot")} className="bp" style={{padding:"7px 10px",background:G.forest,border:"none",borderRadius:9,color:G.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>Get Quote →</button>
                    )}
                    {b.website&&b.website!=="See listing"&&(
                      <a href={"https://"+b.website} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"6px 10px",background:"none",border:`1px solid ${G.border}`,borderRadius:9,color:G.forest,fontSize:11,fontWeight:600,textDecoration:"none",textAlign:"center"}}>Visit Website →</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages>1&&(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:6,marginTop:20,flexWrap:"wrap"}}>
          <button onClick={()=>{setPage(p=>Math.max(1,p-1));window.scrollTo({top:0,behavior:"smooth"});}}
            disabled={page===1}
            style={{padding:"8px 16px",background:G.white,border:`1px solid ${G.border}`,borderRadius:9,color:page===1?G.muted:G.forest,fontSize:12,fontWeight:700,cursor:page===1?"not-allowed":"pointer",opacity:page===1?.5:1}}>
            ← Prev
          </button>
          {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
            <button key={p} onClick={()=>{setPage(p);window.scrollTo({top:0,behavior:"smooth"});}}
              style={{padding:"8px 13px",background:page===p?G.forest:G.white,border:`1px solid ${page===p?G.forest:G.border}`,borderRadius:9,color:page===p?G.white:G.body,fontSize:12,fontWeight:700,cursor:"pointer",minWidth:36}}>
              {p}
            </button>
          ))}
          <button onClick={()=>{setPage(p=>Math.min(totalPages,p+1));window.scrollTo({top:0,behavior:"smooth"});}}
            disabled={page===totalPages}
            style={{padding:"8px 16px",background:G.white,border:`1px solid ${G.border}`,borderRadius:9,color:page===totalPages?G.muted:G.forest,fontSize:12,fontWeight:700,cursor:page===totalPages?"not-allowed":"pointer",opacity:page===totalPages?.5:1}}>
            Next →
          </button>
        </div>
      )}


      {/* Business CTA */}
      <div style={{marginTop:20,background:`linear-gradient(135deg,${G.ink},#1E3520)`,borderRadius:14,padding:18,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:15,color:G.white,marginBottom:4}}>Do you offer end of tenancy cleaning?</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.65}}>Get your business listed free. EOT cleaning searches peak in September and January — high-intent, high-value leads.</div>
        </div>
        <button onClick={()=>setTab("business")} className="bp" style={{padding:"9px 16px",background:G.gold,border:"none",borderRadius:10,color:G.ink,fontSize:12,fontWeight:800,cursor:"pointer",flexShrink:0}}>List My Business →</button>
      </div>
    </div>
  );
}

function EOTPage({setTab,user,onLoginNeeded}){
  const [checks,setChecks]=useState({});
  const [showExtras,setShowExtras]=useState(false);
  const done=Object.values(checks).filter(Boolean).length;

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"20px 16px 80px"}}>
      <div style={{maxWidth:820,margin:"0 auto"}}>

        {/* ── HERO — compact, action-first ── */}
        <div style={{background:`linear-gradient(145deg,${G.ink},#2E4030)`,borderRadius:20,padding:"22px 24px",marginBottom:16,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:200}}>
            <SLabel t="END OF TENANCY CLEANING"/>
            <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,4vw,28px)",color:G.white,marginBottom:6,lineHeight:1.2}}>Get Your Full Deposit Back</h1>
            <p style={{color:"rgba(255,255,255,.65)",fontSize:13,lineHeight:1.65,margin:0}}>60+ verified specialists · Deposit-back guarantee · 17 UK cities · Free quotes</p>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
            <button onClick={()=>setTab("hire")} className="bp"
              style={{padding:"10px 16px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",borderRadius:11,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>
              Hire a Machine →
            </button>
            <button onClick={()=>{const el=document.getElementById("eot-specialists");if(el)el.scrollIntoView({behavior:"smooth"});}} className="bp"
              style={{padding:"10px 16px",background:G.gold,border:"none",borderRadius:11,color:G.ink,fontSize:12,fontWeight:800,cursor:"pointer"}}>
              Find a Specialist ↓
            </button>
          </div>
        </div>

        {/* ── SPECIALISTS DIRECTORY — top of page ── */}
        <div id="eot-specialists">
          <EOTBusinessDirectory setTab={setTab}/>
        </div>

        {/* ── ALSO USEFUL — collapsible ── */}
        <div style={{marginTop:20}}>
          <button onClick={()=>setShowExtras(v=>!v)}
            style={{width:"100%",padding:"12px 18px",background:G.white,border:`1px solid ${G.border}`,borderRadius:12,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontSize:13,fontWeight:600,color:G.body}}>
            <span>Checklist and tips for your deposit</span>
            <span style={{transition:"transform .2s",display:"inline-block",transform:showExtras?"rotate(180deg)":"rotate(0deg)",fontSize:11,color:G.muted}}>▼</span>
          </button>
          {showExtras&&(
            <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:10}}>
              {/* Checklist */}
              <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:18}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div style={{fontWeight:700,color:G.ink,fontSize:13}}>Landlord checklist</div>
                  <div style={{background:done===EOT_ITEMS.length?G.pale:G.orangeLight,border:`1px solid ${done===EOT_ITEMS.length?G.border:"#FFCC80"}`,borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,color:done===EOT_ITEMS.length?G.forest:G.orange}}>{done}/{EOT_ITEMS.length} done</div>
                </div>
                {EOT_ITEMS.map(item=>(
                  <label key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:`1px solid ${G.border}`,cursor:"pointer"}}>
                    <input type="checkbox" style={{accentColor:G.forest,width:16,height:16}} checked={!!checks[item.id]} onChange={e=>setChecks({...checks,[item.id]:e.target.checked})}/>
                    <span style={{flex:1,fontSize:13,color:checks[item.id]?G.muted:G.ink,textDecoration:checks[item.id]?"line-through":"none"}}>{item.label}</span>
                    {item.key&&!checks[item.id]&&<span style={{background:G.orangeLight,color:G.orange,fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:20}}>KEY</span>}
                    {checks[item.id]&&<span style={{color:G.forest}}>✓</span>}
                  </label>
                ))}
              </div>
              {/* Tips */}
              <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:18}}>
                <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:12}}>Pro tips for full deposit return</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[["Take photos first","Before cleaning, photograph every stain — proves what was pre-existing."],["Two passes minimum","Forward pass to clean, backward to extract. Go slow on the backward stroke."],["Allow drying time","4–8 hrs in warm weather, up to 12 in winter. Never schedule inspection same day."],["Get a receipt","If using a professional, get a written receipt — some landlords require it."]].map(([t,d])=>(
                    <div key={t} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:`1px solid ${G.border}`}}>
                      <span style={{color:G.forest,fontWeight:700,fontSize:14,flexShrink:0}}>✓</span>
                      <div><div style={{fontWeight:600,fontSize:12,color:G.ink,marginBottom:2}}>{t}</div><div style={{fontSize:11,color:G.muted,lineHeight:1.6}}>{d}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── BUYER'S GUIDE ─────────────────────────────────────────
function Guide(){
  const [section,setSection]=useState("which");

  const content = {
    which:{
      title:"Which carpet cleaning machine should you hire?",
      intro:"The right answer depends on three things: your carpet condition, your budget, and whether you have pets. Here's the honest breakdown.",
      items:[
        {logo:"RD",col:"#C8001A",name:"Rug Doctor Deep Clean",verdict:"Best for most people",text:"The market leader for good reason. Powerful enough for normal to moderately soiled carpets, widely available at supermarkets, no deposit, solution included. First-time hirer? Choose Rug Doctor."},
        {logo:"K", col:"#E65100",name:"Kärcher Puzzi 10/1",verdict:"Best for serious jobs",text:"Industrial extraction. Heavily soiled carpet, pet accidents that soaked deep, or landlord between tenants — this is your machine. £50 deposit and higher price are worth it. Buy solution separately."},
        {logo:"Bi",col:"#1565C0",name:"Bissell ProHeat 2X",verdict:"Best for pet owners",text:"The pet formula included is genuinely superior for stains and odour. If you have cats or dogs, choose this over the Rug Doctor. Cheapest at £22/day with no deposit."},
        {logo:"Vx",col:"#6A1B9A",name:"Vax Platinum Power Max",verdict:"Good mid-range option",text:"Largest water tank means fewer refill stops when cleaning multiple rooms. Slightly less extraction than Rug Doctor but good results on moderately soiled carpet."},
        {logo:"Po",col:"#37474F",name:"Polti Unico Steam",verdict:"Best for allergy sufferers",text:"Steam only — no chemicals whatsoever. The only safe option for homes with babies, severe allergies or asthma. Less effective on deep stains. Book ahead, availability is limited."},
      ]
    },
    hirevpro:{
      title:"Should you hire a machine or book a professional?",
      twoCols:[
        {icon:"",title:"Hire a machine if…",pts:["Carpet lightly to moderately soiled","You have a full day to clean","You want the cheapest option","You need it done today (same-day available)","You're reasonably handy and don't mind effort"]},
        {icon:"",title:"Book a professional if…",pts:["Heavily soiled or has deep stains","Moving out — want deposit return guarantee","No time to do it yourself","Delicate, wool or antique carpets","You want a professional invoice for landlord"]},
      ],
      tip:"For a standard 3-bed house with average soiling, Rug Doctor + a full Saturday = 85–90% of what a professional achieves, at ~30% of the cost. Heavy pet staining or deposit at stake? Book a pro."
    },
    howto:{
      title:"How to get the best results from a hired machine",
      steps:[
        ["Vacuum thoroughly first","Skip this and you reduce effectiveness by ~30%. Vacuum every area at least twice before using the carpet cleaner. The machine's job is deep stains, not surface debris."],
        ["Pre-treat visible stains","Apply solution directly on visible stains, let it soak for 10 minutes before running the machine. This breaks down stain chemistry before extraction."],
        ["Fill the tank correctly","Use the measuring cap provided. Too much solution leaves residue that attracts more dirt. Too little reduces cleaning power significantly."],
        ["Go slow — especially backward","Forward = cleaning pass. Backward = extraction pass. Go even slower going back. Most people rush the backward stroke and leave water in the carpet."],
        ["Two passes per area minimum","Always make at least two overlapping passes. The second pass picks up what the first loosened."],
        ["Empty dirty water frequently","Check the dirty water tank every 15–20 mins. Full tank = reduced suction = more water left in carpet = longer drying time."],
        ["Allow proper drying time","Open windows, run fans. 4–8 hours in warm weather, up to 12 in winter. No foot traffic during drying."],
      ]
    },
    mistakes:{
      title:"Common mistakes that ruin results",
      mistakes:[
        ["Using the wrong solution","Rug Doctor solution in a Kärcher, or vice versa. Always check compatibility. Wrong formula can leave residue that permanently darkens carpet fibres."],
        ["Too much cleaning solution","More is not better. Excess foam means extended drying time and sticky residue that attracts dirt faster than before you cleaned."],
        ["Rushing the backward stroke","The extraction pass is where clean water picks up dirty water from deep in the carpet. Going too fast leaves moisture behind."],
        ["Cleaning wet carpet","If carpet is already damp, wait until fully dry first. Cleaning wet carpet can spread staining and create mould risk."],
        ["Skipping corners","The machine can't reach right to walls. Spot-treat corners manually with a cloth and solution before running the main machine."],
        ["Booking inspection same day","Carpet must be fully dry before an end-of-tenancy inspection. Always allow at least one full night between cleaning and inspection."],
      ]
    },
    faq:{
      title:"Frequently asked questions",
      faqs:[
        ["How long does carpet take to dry after cleaning?","4–8 hours in warm weather with ventilation. Up to 12 hours in winter or poor airflow. Open all windows and run a fan if possible."],
        ["Can I use any cleaning solution in any machine?","No. Rug Doctor machines require Rug Doctor solution. Kärcher works with most branded solutions. Bissell has its own formula. Using the wrong solution can damage the machine and void warranty."],
        ["Is it worth hiring a professional over a machine?","For heavy soiling, pet accidents, or end of tenancy where your deposit is at stake — yes. For a normal annual clean — a machine gives 85–90% of the result at 30% of the cost."],
        ["Do I need to vacuum before using a carpet cleaner?","Yes, always. Vacuuming removes surface debris so the carpet cleaner can focus on deep dirt and stains. Skipping this is the most common mistake."],
        ["Can carpet cleaners remove all stains?","Most fresh stains: yes. Old set-in stains: partially. Red wine, pet urine and ink left for months may not fully disappear even with professional-grade equipment."],
        ["How much does it cost for a 3-bed house?","One Rug Doctor for one day (£29) plus solution (usually included) is typically enough for a standard 3-bedroom house. Comfortably done in 4–5 hours."],
      ]
    }
  };

  const s = content[section];

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        <div style={{marginBottom:20}}>
          <SLabel t="BUYER'S GUIDE"/>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,32px)",color:G.ink,marginBottom:5}}>Everything you need to know before hiring</h1>
          <p style={{color:G.muted,fontSize:13}}>Written by our team · Updated March 2026 · 8 min read</p>
        </div>
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:20}}>
          {GUIDE_TABS.map(s=>(
            <button key={s.id} onClick={()=>setSection(s.id)} style={{flexShrink:0,padding:"7px 13px",border:`1px solid ${section===s.id?G.forest:G.border}`,borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700,background:section===s.id?G.forest:G.white,color:section===s.id?G.white:G.muted,transition:"all .15s"}}>{s.label}</button>
          ))}
        </div>

        <div className="fu">
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:21,color:G.ink,marginBottom:14}}>{s.title}</h2>

          {section==="which"&&(
            <>
              <p style={{color:G.muted,fontSize:14,lineHeight:1.8,marginBottom:18}}>{s.intro}</p>
              {s.items.map(m=>(
                <div key={m.name} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:13,padding:18,marginBottom:11,display:"flex",gap:13}}>
                  <div style={{width:42,height:42,borderRadius:11,background:m.col,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:12}}>{m.logo}</div>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                      <span style={{fontWeight:800,fontSize:13,color:G.ink}}>{m.name}</span>
                      <span style={{background:G.pale,color:G.forest,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,border:`1px solid ${G.border}`}}>{m.verdict}</span>
                    </div>
                    <p style={{fontSize:13,color:G.muted,lineHeight:1.7}}>{m.text}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {section==="hirevpro"&&(
            <>
              <div className="twoCol" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
                {s.twoCols.map(c=>(
                  <div key={c.title} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:13,padding:18}}>
                    
                    <div style={{fontWeight:800,color:G.ink,fontSize:14,marginBottom:10}}>{c.title}</div>
                    {c.pts.map(p=><div key={p} style={{fontSize:13,color:G.muted,marginBottom:5}}>✓ {p}</div>)}
                  </div>
                ))}
              </div>
              <div style={{background:G.amber,border:`1px solid ${G.gold}44`,borderRadius:11,padding:13,fontSize:13,color:"#78540A",lineHeight:1.7}}>
                <strong>Honest verdict:</strong> {s.tip}
              </div>
            </>
          )}

          {section==="howto"&&s.steps.map(([t,d],i)=>(
            <div key={i} style={{display:"flex",gap:13,marginBottom:12,padding:15,background:G.white,borderRadius:12,border:`1px solid ${G.border}`}}>
              <div style={{width:26,height:26,borderRadius:8,background:G.forest,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontSize:11,fontWeight:800}}>{i+1}</div>
              <div><div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:4}}>{t}</div><div style={{fontSize:13,color:G.muted,lineHeight:1.7}}>{d}</div></div>
            </div>
          ))}

          {section==="mistakes"&&s.mistakes.map(([t,d],i)=>(
            <div key={i} style={{display:"flex",gap:13,marginBottom:11,padding:15,background:G.white,borderRadius:12,border:`1.5px solid ${G.orangeLight}`}}>
              <div style={{width:26,height:26,borderRadius:8,background:G.orangeLight,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:G.orange,fontSize:14,fontWeight:800}}>✗</div>
              <div><div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:4}}>{t}</div><div style={{fontSize:13,color:G.muted,lineHeight:1.7}}>{d}</div></div>
            </div>
          ))}
          {section==="mistakes"&&(
            <AmazonWidget product={AMAZON_PRODUCTS.universal_solution} context="a universal formula that works safely in any machine"/>
          )}

          {section==="faq"&&s.faqs.map(([q,a],i)=>(
            <div key={i} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:12,padding:18,marginBottom:11}}>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:7}}>Q: {q}</div>
              <div style={{fontSize:13,color:G.muted,lineHeight:1.7}}>A: {a}</div>
            </div>
          ))}
          {section==="faq"&&(
            <AmazonWidget product={AMAZON_PRODUCTS.stain_remover} context="top-rated spot treatment for stubborn stains"/>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── BUSINESS PAGE ──────────────────────────────────────────
function BusinessPage(){
  const [appStep,setAppStep]=useState(0);
  const [plan,setPlan]=useState("standard");
  const [appDone,setAppDone]=useState(false);

  const PLANS=[
    {id:"basic",    name:"Basic Listing", price:0,  leads:0,   desc:"Get found for free",               feats:["Name & phone listed","Service area shown","Basic profile","No leads","No verified badge"]},
    {id:"standard", name:"Standard",      price:49, leads:15,  desc:"Most popular for growing businesses",feats:["Full profile with photos","Up to 15 leads/month","Verified badge","Customer reviews","Email support"]},
    {id:"premium",  name:"Premium",       price:99, leads:null,desc:"For established businesses",        feats:["Everything in Standard","Unlimited leads","Top placement","Newsletter feature","Analytics","Account manager"]},
  ];

  if(appDone) return(
    <div style={{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center",padding:28}}>
      <div className="fu" style={{textAlign:"center",maxWidth:440}}>
        
        <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:G.ink,marginBottom:8}}>Application Received!</h2>
        <p style={{color:G.muted,fontSize:14,lineHeight:1.75,marginBottom:22}}>We will verify your insurance and company details within 48 hours. Once approved your profile goes live and leads start arriving.</p>
        <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:14,padding:18,textAlign:"left",marginBottom:22}}>
          {["Insurance verification (24hrs)","Companies House check (automated)","Profile review by our team (24hrs)","Profile live — leads start arriving"].map((s,i)=>(
            <div key={s} style={{display:"flex",alignItems:"center",gap:11,padding:"8px 0",borderBottom:i<3?`1px solid ${G.border}`:"none"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:i===0?G.forest:G.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:11,color:i===0?G.white:G.muted}}>{i===0?"⟳":i+1}</span>
              </div>
              <span style={{fontSize:13,color:i===0?G.ink:G.muted,fontWeight:i===0?600:400}}>{s}</span>
            </div>
          ))}
        </div>
        <button onClick={()=>setAppDone(false)} style={{padding:"10px 24px",background:G.forest,color:G.white,border:"none",borderRadius:11,fontWeight:700,cursor:"pointer"}}>Back to Home</button>
      </div>
    </div>
  );

  if(appStep===0) return(
    <div style={{background:G.frost}}>
      <div style={{background:`linear-gradient(160deg,${G.forest},${G.dark})`,padding:"64px 20px",textAlign:"center"}}>
        <div style={{fontSize:10,fontWeight:800,letterSpacing:2,color:G.light,marginBottom:16}}>FOR CARPET CLEANING BUSINESSES</div>
        <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(24px,5vw,48px)",color:G.white,letterSpacing:-1,marginBottom:12,lineHeight:1.15}}>Get More Carpet Cleaning Customers.<br/>From £49/month.</h1>
        <p style={{color:"rgba(255,255,255,.62)",fontSize:15,maxWidth:460,margin:"0 auto 32px",lineHeight:1.75}}>742,000 people search for carpet cleaning services across the UK every month. Get your business in front of customers actively looking right now.</p>
        <button onClick={()=>setAppStep(1)} className="bp" style={{padding:"13px 36px",background:G.gold,border:"none",borderRadius:13,color:G.ink,fontSize:15,fontWeight:900,cursor:"pointer",boxShadow:"0 8px 22px rgba(249,168,37,.38)"}}>List My Business →</button>
        <div style={{display:"flex",justifyContent:"center",gap:32,marginTop:32,flexWrap:"wrap"}}>
          {[["742k","UK searches/month"],["£12","Avg lead fee"],["48 hrs","To first lead"],["3.8%","Booking rate"]].map(([v,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.bright}}>{v}</div>
              <div style={{color:G.light,fontSize:11,marginTop:1}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:860,margin:"0 auto",padding:"48px 20px"}}>
        <div style={{textAlign:"center",marginBottom:30}}>
          <SLabel t="HOW IT WORKS"/>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,3vw,30px)",color:G.ink}}>Live and receiving leads in 48 hours</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:14,marginBottom:48}}>
          {[["01","Apply online","Fill in your details, services, and coverage area in under 10 minutes."],["02","Get verified","We check your insurance and Companies House registration. 24–48 hours."],["03","Go live","Your profile appears in search results for consumers in your area."],["04","Receive leads","Quote requests come to you directly via email and SMS."]].map(([n,t,d])=>(
            <div key={n} style={{background:G.white,borderRadius:14,padding:18,border:`1px solid ${G.border}`}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:G.bright,marginBottom:8}}>{n}</div>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:5}}>{t}</div>
              <div style={{color:G.muted,fontSize:12,lineHeight:1.7}}>{d}</div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <SLabel t="PRICING"/>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,3vw,28px)",color:G.ink}}>Simple, transparent pricing</h2>
          <p style={{color:G.muted,fontSize:13,marginTop:6}}>First month free on Standard and Premium. No contract. Cancel anytime.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:14}}>
          {PLANS.map(p=>(
            <div key={p.id} onClick={()=>setPlan(p.id)} style={{borderRadius:16,padding:22,cursor:"pointer",border:`2px solid ${plan===p.id?G.forest:G.border}`,background:plan===p.id?G.pale:G.white,transition:"all .18s",position:"relative",boxShadow:plan===p.id?"0 5px 20px rgba(27,94,32,.11)":"none"}}>
              {p.id==="standard"&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${G.forest},${G.mid})`,color:G.white,fontSize:9,fontWeight:800,padding:"3px 14px",borderRadius:20,letterSpacing:1,whiteSpace:"nowrap"}}>MOST POPULAR</div>}
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.ink,marginBottom:3}}>{p.name}</div>
              <div style={{fontSize:11,color:G.muted,marginBottom:12}}>{p.desc}</div>
              <div style={{marginBottom:13}}><span style={{fontFamily:"'DM Serif Display',serif",fontSize:30,color:G.forest}}>{p.price===0?"Free":`£${p.price}`}</span>{p.price>0&&<span style={{color:G.muted,fontSize:12}}>/month</span>}</div>
              <div style={{borderTop:`1px solid ${G.border}`,paddingTop:12}}>
                {p.feats.map(f=>(
                  <div key={f} style={{display:"flex",gap:7,marginBottom:6,alignItems:"flex-start"}}>
                    <span style={{color:f.startsWith("No")?G.muted:G.forest,fontSize:12,marginTop:1}}>{f.startsWith("No")?"○":"✓"}</span>
                    <span style={{fontSize:12,color:f.startsWith("No")?G.muted:G.body,lineHeight:1.4}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:22}}>
          <button onClick={()=>setAppStep(1)} className="bp" style={{padding:"12px 38px",background:G.forest,border:"none",borderRadius:12,color:G.white,fontSize:14,fontWeight:800,cursor:"pointer"}}>Get Started with {PLANS.find(p=>p.id===plan)?.name} →</button>
        </div>
      </div>
    </div>
  );

  const STEP_LABELS=["Business Info","Services and Area","Verification","Choose Plan"];
  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"32px 16px 80px"}}>
      <div style={{maxWidth:520,margin:"0 auto"}}>
        <div style={{marginBottom:24}}>
          <div style={{display:"flex",marginBottom:8}}>
            {STEP_LABELS.map((l,i)=>(
              <div key={l} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,background:i+1<=appStep?G.forest:G.border,color:i+1<=appStep?G.white:G.muted,transition:"background .3s"}}>{i+1<appStep?"✓":i+1}</div>
                <div style={{fontSize:9,color:i+1<=appStep?G.forest:G.muted,fontWeight:700,textAlign:"center"}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{height:4,background:G.border,borderRadius:2}}>
            <div style={{height:"100%",width:`${((appStep-1)/3)*100}%`,background:`linear-gradient(90deg,${G.forest},${G.bright})`,borderRadius:2,transition:"width .35s ease"}}/>
          </div>
        </div>

        <div className="fu" style={{background:G.white,borderRadius:20,padding:28,border:`1px solid ${G.border}`,boxShadow:"0 4px 18px rgba(27,94,32,.07)"}}>
          {appStep===1&&(
            <>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:G.ink,marginBottom:4}}>Tell us about your business</h3>
              <p style={{color:G.muted,fontSize:13,marginBottom:18}}>This appears on your public profile.</p>
              {[["BUSINESS NAME","text","e.g. Crystal Clean Pro"],["YOUR NAME","text","Contact name"],["EMAIL ADDRESS","email","business@email.com"],["PHONE NUMBER","tel","07700 000000"],["WEBSITE (OPTIONAL)","url","www.yoursite.co.uk"]].map(([l,t,p])=>(
                <div key={l} style={{marginBottom:12}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>{l}</div><input type={t} placeholder={p} style={inp}/></div>
              ))}
            </>
          )}
          {appStep===2&&(
            <>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:G.ink,marginBottom:4}}>Services and coverage</h3>
              <p style={{color:G.muted,fontSize:13,marginBottom:18}}>Tell customers what you offer and where.</p>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:8}}>SERVICES OFFERED</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                  {["Carpet Cleaning","Upholstery Cleaning","End of Tenancy","Rug Cleaning","Mattress Cleaning","Commercial Carpet"].map(s=>(
                    <label key={s} style={{display:"flex",alignItems:"center",gap:7,background:G.frost,borderRadius:9,padding:"8px 10px",cursor:"pointer",border:`1px solid ${G.border}`}}>
                      <input type="checkbox" style={{accentColor:G.forest}} defaultChecked={s==="Carpet Cleaning"}/><span style={{fontSize:12,color:G.ink}}>{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="twoCol" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
                <div><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>PRIMARY CITY</div><select style={{...inp,cursor:"pointer"}}>{["London","Manchester","Birmingham","Glasgow","Leeds","Liverpool","Bristol","Edinburgh","Other"].map(c=><option key={c}>{c}</option>)}</select></div>
                <div><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>TRAVEL DISTANCE</div><select style={{...inp,cursor:"pointer"}}>{["5 miles","10 miles","15 miles","25 miles","50 miles"].map(d=><option key={d}>{d}</option>)}</select></div>
              </div>
            </>
          )}
          {appStep===3&&(
            <>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:G.ink,marginBottom:4}}>Verification documents</h3>
              <p style={{color:G.muted,fontSize:13,marginBottom:18}}>We verify every business to protect consumers. 24–48 hours.</p>
              {[["PUBLIC LIABILITY INSURANCE","Minimum £1M cover required","Certificate number or upload"],["COMPANIES HOUSE NUMBER","Or sole trader UTR number","Registration number"],["YEARS IN BUSINESS","How long have you been trading?","e.g. 4 years"]].map(([l,d,p])=>(
                <div key={l} style={{marginBottom:16}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:3}}>{l}</div><div style={{fontSize:11,color:G.muted,marginBottom:5}}>{d}</div><input placeholder={p} style={inp}/></div>
              ))}
              <div style={{background:G.amber,border:`1px solid ${G.gold}44`,borderRadius:9,padding:11,fontSize:12,color:"#78540A",lineHeight:1.7}}>🛡️ Documents stored securely. Used only for verification. Never shared with consumers.</div>
            </>
          )}
          {appStep===4&&(
            <>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:G.ink,marginBottom:4}}>Choose your plan</h3>
              <p style={{color:G.muted,fontSize:13,marginBottom:18}}>First month free on paid plans. Cancel anytime.</p>
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                {PLANS.map(p=>(
                  <div key={p.id} onClick={()=>setPlan(p.id)} style={{borderRadius:11,padding:14,cursor:"pointer",border:`2px solid ${plan===p.id?G.forest:G.border}`,background:plan===p.id?G.pale:G.white,transition:"all .15s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <div>
                        <span style={{fontWeight:800,color:G.ink,fontSize:13}}>{p.name}</span>
                        {p.id==="standard"&&<span style={{marginLeft:7}}><Pill text="Recommended" color={G.forest}/></span>}
                        <div style={{fontSize:11,color:G.muted,marginTop:2}}>{p.leads===null?"Unlimited leads":p.leads===0?"No leads included":`Up to ${p.leads} leads/month`}</div>
                      </div>
                      <span style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:G.forest}}>{p.price===0?"Free":`£${p.price}/mo`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={{display:"flex",gap:9,marginTop:20}}>
            {appStep>1&&<button onClick={()=>setAppStep(appStep-1)} style={{flex:1,padding:"11px 0",background:G.frost,border:`1px solid ${G.border}`,borderRadius:11,color:G.muted,fontSize:13,fontWeight:600,cursor:"pointer"}}>← Back</button>}
            <button onClick={()=>appStep<4?setAppStep(appStep+1):setAppDone(true)} className="bp" style={{flex:2,padding:"11px 0",background:G.forest,border:"none",borderRadius:11,color:G.white,fontSize:13,fontWeight:800,cursor:"pointer"}}>
              {appStep<4?"Continue →":"Submit Application →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SHOP APPLY PAGE ──────────────────────────────────────
function ShopApplyPage(){
  const [step,setStep]=useState(0); // 0=landing, 1-4=form steps
  const [plan,setPlan]=useState("standard");
  const [done,setDone]=useState(false);

  const PLANS=[
    { id:"basic",    name:"Basic",    price:0,  leads:false, badge:null,
      desc:"Get found for free",
      feats:["Shop name & phone listed","City & area shown","Machines listed","No enquiry routing","No verified badge","No call tracking"] },
    { id:"standard", name:"Standard", price:39, leads:true,  badge:"Most Popular",
      desc:"Recommended for most shops",
      feats:["Full profile with photos","Enquiry routing (£3/lead)","Click-to-call tracking (£2/call)","Verified & insured badge","Customer reviews shown","Email & SMS alerts"] },
    { id:"premium",  name:"Premium",  price:49, leads:true,  badge:"Best Results",
      desc:"Maximum visibility",
      feats:["Everything in Standard","Top placement in city","Featured in buyer guide","Monthly performance report","Dedicated account manager","Priority verification (24hrs)"] },
  ];

  const STEP_LABELS=["Shop Details","Your Machines","Verification","Choose Plan"];

  if(done) return(
    <div style={{minHeight:"70vh",display:"flex",alignItems:"center",justifyContent:"center",padding:28}}>
      <div className="fu" style={{textAlign:"center",maxWidth:460}}>
        
        <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:G.ink,marginBottom:8}}>Application Received!</h2>
        <p style={{color:G.muted,fontSize:14,lineHeight:1.8,marginBottom:22}}>
          We will verify your details within 48 hours. Once approved your shop goes live and customer enquiries start arriving.
        </p>
        <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:16,padding:20,textAlign:"left",marginBottom:22}}>
          <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:12}}>What happens next:</div>
          {[["⟳","Insurance check","Within 24 hours"],["✓","Companies House or sole trader check","Automated — instant"],["👀","Profile review by our team","Within 24 hours"],["🟢","Shop goes live","Enquiries start arriving"],].map(([ic,t,s])=>(
            <div key={t} style={{display:"flex",gap:11,padding:"9px 0",borderBottom:`1px solid ${G.border}`,alignItems:"center"}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:ic==="⟳"?G.forest:G.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12,color:ic==="⟳"?G.white:G.muted}}></div>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:G.ink}}>{t}</div><div style={{fontSize:11,color:G.muted}}>{s}</div></div>
            </div>
          ))}
        </div>
        <div style={{background:G.amber,border:`1px solid ${G.gold}44`,borderRadius:11,padding:14,fontSize:12,color:"#78540A",lineHeight:1.7,marginBottom:22}}>
          <strong>While you wait:</strong> Send us photos of your machines and shopfront to help@ready4hire.co.uk — we will add them to your profile when it goes live.
        </div>
        <button onClick={()=>{setStep(0);setDone(false);}} style={{padding:"10px 24px",background:G.forest,color:G.white,border:"none",borderRadius:11,fontWeight:700,cursor:"pointer"}}>Back to Home</button>
      </div>
    </div>
  );

  if(step===0) return(
    <div style={{background:G.frost}}>
      {/* Hero */}
      <div style={{background:`linear-gradient(160deg,${G.ink},#2A3D2B)`,padding:"64px 20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:`radial-gradient(${G.white} 1px,transparent 1px)`,backgroundSize:"28px 28px",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontSize:10,fontWeight:800,letterSpacing:2,color:G.light,marginBottom:16}}>FOR INDEPENDENT HIRE SHOPS</div>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(24px,5vw,48px)",color:G.white,letterSpacing:-1,marginBottom:12,lineHeight:1.15}}>
            Get Your Machines<br/>In Front of Customers.
          </h1>
          <p style={{color:"rgba(255,255,255,.62)",fontSize:15,maxWidth:480,margin:"0 auto 32px",lineHeight:1.75}}>
            742,000 people search for carpet cleaning and machine hire across the UK every month. Get your hire shop in front of customers looking for machines near them.
          </p>
          <button onClick={()=>setStep(1)} className="bp"
            style={{padding:"13px 36px",background:G.gold,border:"none",borderRadius:13,color:G.ink,fontSize:15,fontWeight:900,cursor:"pointer",boxShadow:"0 8px 22px rgba(249,168,37,.38)"}}>
            List My Shop — From £39/mo →
          </button>
          <div style={{display:"flex",justifyContent:"center",gap:32,marginTop:32,flexWrap:"wrap"}}>
            {[["742k","UK searches/month"],["£3","Per enquiry lead"],["£2","Per tracked call"],["48hrs","To go live"]].map(([v,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.bright}}>{v}</div>
                <div style={{color:"rgba(255,255,255,.55)",fontSize:11,marginTop:1}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"48px 20px"}}>
        {/* How it works */}
        <div style={{textAlign:"center",marginBottom:30}}>
          <SLabel t="HOW IT WORKS"/>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,3vw,30px)",color:G.ink}}>Live and receiving enquiries in 48 hours</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14,marginBottom:48}}>
          {[["01","Apply in 10 mins","Tell us about your shop, machines, and coverage area. No technical knowledge needed."],
            ["02","We verify you","Insurance and ID check. 24–48 hours. We do all the work."],
            ["03","Profile goes live","Customers in your city see your shop when they search for hire near them."],
            ["04","Enquiries come to you","Booking requests, calls, and questions routed directly to your phone or email."],
          ].map(([n,t,d])=>(
            <div key={n} style={{background:G.white,borderRadius:14,padding:18,border:`1px solid ${G.border}`}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:G.bright,marginBottom:8}}>{n}</div>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:5}}>{t}</div>
              <div style={{color:G.muted,fontSize:12,lineHeight:1.7}}>{d}</div>
            </div>
          ))}
        </div>

        {/* How you earn */}
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:18,padding:26,marginBottom:40}}>
          <SLabel t="HOW READY 4 HIRE EARNS FROM YOUR LISTING"/>
          <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.ink,marginBottom:14}}>Transparent pricing — no surprises</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
            {[["📋","Monthly listing fee","£0 Basic · £39 Standard · £49 Premium. Fixed monthly cost, cancel anytime."],
              ["","Lead fee","£3 per enquiry we route to you via the site. Only charged when a real customer contacts you."],
              ["","Call tracking","£2 per click-to-call from your listing. Tracked via a unique number on your profile. Optional."],
            ].map(([ic,t,d])=>(
              <div key={t} style={{background:G.pale,borderRadius:12,padding:16,border:`1px solid ${G.border}`}}>
                <div style={{fontSize:28,marginBottom:8}}></div>
                <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:5}}>{t}</div>
                <div style={{fontSize:12,color:G.muted,lineHeight:1.6}}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,background:G.amber,border:`1px solid ${G.gold}44`,borderRadius:10,padding:13,fontSize:12,color:"#78540A",lineHeight:1.7}}>
            <strong>Example:</strong> A Standard listing at £39/month + 10 calls (£20) + 5 enquiries (£15) = £74 total. If those 5 enquiries produce 2 bookings at £30/day each, you earned £60 from a £74 investment. One busy Saturday pays for the whole month.
          </div>
        </div>

        {/* Pricing plans */}
        <div style={{textAlign:"center",marginBottom:28}}>
          <SLabel t="PRICING"/>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,3vw,28px)",color:G.ink}}>Simple monthly pricing</h2>
          <p style={{color:G.muted,fontSize:13,marginTop:6}}>First month free on Standard and Premium. No contract. Cancel anytime.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14,marginBottom:32}}>
          {PLANS.map(p=>(
            <div key={p.id} onClick={()=>setPlan(p.id)}
              style={{borderRadius:16,padding:22,cursor:"pointer",position:"relative",
                border:`2px solid ${plan===p.id?G.forest:G.border}`,
                background:plan===p.id?G.pale:G.white,
                transition:"all .18s",boxShadow:plan===p.id?"0 5px 20px rgba(27,94,32,.11)":"none"}}>
              {p.badge&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${G.forest},${G.mid})`,color:G.white,fontSize:9,fontWeight:800,padding:"3px 14px",borderRadius:20,letterSpacing:1,whiteSpace:"nowrap"}}>{p.badge.toUpperCase()}</div>}
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.ink,marginBottom:2}}>{p.name}</div>
              <div style={{fontSize:11,color:G.muted,marginBottom:12}}>{p.desc}</div>
              <div style={{marginBottom:13}}>
                <span style={{fontFamily:"'DM Serif Display',serif",fontSize:30,color:G.forest}}>{p.price===0?"Free":`£${p.price}`}</span>
                {p.price>0&&<span style={{color:G.muted,fontSize:12}}>/month</span>}
              </div>
              <div style={{borderTop:`1px solid ${G.border}`,paddingTop:12}}>
                {p.feats.map(f=>(
                  <div key={f} style={{display:"flex",gap:7,marginBottom:6,alignItems:"flex-start"}}>
                    <span style={{color:f.startsWith("No")?G.muted:G.forest,fontSize:12,marginTop:1}}>{f.startsWith("No")?"○":"✓"}</span>
                    <span style={{fontSize:12,color:f.startsWith("No")?G.muted:G.body,lineHeight:1.4}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center"}}>
          <button onClick={()=>setStep(1)} className="bp"
            style={{padding:"13px 40px",background:G.forest,border:"none",borderRadius:12,color:G.white,fontSize:14,fontWeight:800,cursor:"pointer"}}>
            Apply Now — {PLANS.find(p=>p.id===plan)?.name} →
          </button>
        </div>
      </div>
    </div>
  );

  // ── Application form ──────────────────────────────────────
  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"32px 16px 80px"}}>
      <div style={{maxWidth:540,margin:"0 auto"}}>
        {/* Progress */}
        <div style={{marginBottom:26}}>
          <div style={{display:"flex",marginBottom:8}}>
            {STEP_LABELS.map((l,i)=>(
              <div key={l} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,background:i+1<=step?G.forest:G.border,color:i+1<=step?G.white:G.muted,transition:"background .3s"}}>
                  {i+1<step?"✓":i+1}
                </div>
                <div style={{fontSize:9,color:i+1<=step?G.forest:G.muted,fontWeight:700,textAlign:"center",lineHeight:1.3}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{height:4,background:G.border,borderRadius:2}}>
            <div style={{height:"100%",width:`${((step-1)/3)*100}%`,background:`linear-gradient(90deg,${G.forest},${G.bright})`,borderRadius:2,transition:"width .35s ease"}}/>
          </div>
        </div>

        <div className="fu" style={{background:G.white,borderRadius:20,padding:28,border:`1px solid ${G.border}`,boxShadow:"0 4px 18px rgba(27,94,32,.07)"}}>

          {step===1&&(
            <>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:4}}>Tell us about your shop</h3>
              <p style={{color:G.muted,fontSize:13,marginBottom:18}}>This appears on your public profile on Ready 4 Hire.</p>
              {[["SHOP NAME","text","e.g. Midland Hire Centre"],["OWNER / CONTACT NAME","text","Your name"],["EMAIL ADDRESS","email","shop@email.com"],["PHONE NUMBER","tel","07700 000000 or 0121 000 0000"],["WEBSITE (OPTIONAL)","url","www.yourshop.co.uk"],["SHOP ADDRESS","text","Street, City, Postcode"]].map(([l,t,p])=>(
                <div key={l} style={{marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>{l}</div>
                  <input type={t} placeholder={p} style={inp}/>
                </div>
              ))}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>OPENING HOURS</div>
                <textarea placeholder="e.g. Mon–Sat 8am–6pm · Sun 9am–4pm" rows={2} style={{...inp,resize:"vertical"}}/>
              </div>
            </>
          )}

          {step===2&&(
            <>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:4}}>Your machines and services</h3>
              <p style={{color:G.muted,fontSize:13,marginBottom:18}}>Customers will filter by machine brand — tick everything you stock.</p>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:8}}>MACHINES YOU HIRE OUT</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                  {["Rug Doctor","Kärcher Puzzi","Bissell ProHeat","Vax Platinum","Polti Steam","Numatic George","Own-brand wet-dry","Upholstery cleaner","Other (add below)"].map(m=>(
                    <label key={m} style={{display:"flex",alignItems:"center",gap:7,background:G.frost,borderRadius:9,padding:"8px 10px",cursor:"pointer",border:`1px solid ${G.border}`}}>
                      <input type="checkbox" style={{accentColor:G.forest}}/><span style={{fontSize:12,color:G.ink}}>{m}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>PRICE FROM (PER DAY)</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.forest}}>£</span>
                  <input type="number" placeholder="e.g. 18" min={5} style={{...inp,width:100}}/>
                  <span style={{fontSize:13,color:G.muted}}>per day</span>
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>DEPOSIT REQUIRED?</div>
                <div style={{display:"flex",gap:9}}>
                  {["No deposit","£10–£25","£25–£50","Over £50"].map(o=>(
                    <label key={o} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:G.ink,cursor:"pointer"}}>
                      <input type="radio" name="deposit" style={{accentColor:G.forest}}/>{o}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>COVERAGE AREA (POSTCODES OR DESCRIPTION)</div>
                <input placeholder="e.g. B1–B12, Solihull, covers ~10 miles" style={inp}/>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:8}}>ADDITIONAL SERVICES</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                  {["Delivery available","Solution/chemicals sold","Pressure washer hire","Floor polisher hire","Scrubber dryer hire","Trade accounts welcome","Same-day hire"].map(s=>(
                    <label key={s} style={{display:"flex",alignItems:"center",gap:7,background:G.frost,borderRadius:9,padding:"8px 10px",cursor:"pointer",border:`1px solid ${G.border}`}}>
                      <input type="checkbox" style={{accentColor:G.forest}}/><span style={{fontSize:12,color:G.ink}}>{s}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {step===3&&(
            <>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:4}}>Verification</h3>
              <p style={{color:G.muted,fontSize:13,marginBottom:18}}>We verify every shop to protect customers. Takes 24–48 hrs.</p>
              {[["PUBLIC LIABILITY INSURANCE","Minimum £1M required — standard for any hire business","Policy number or certificate reference"],
                ["COMPANIES HOUSE / UTR NUMBER","Registered company or sole trader UTR","Company number or UTR"],
                ["HOW LONG HAVE YOU BEEN TRADING?","Minimum 6 months trading required","e.g. 8 years"],
              ].map(([l,d,p])=>(
                <div key={l} style={{marginBottom:16}}>
                  <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:3}}>{l}</div>
                  <div style={{fontSize:11,color:G.muted,marginBottom:6}}>{d}</div>
                  <input placeholder={p} style={inp}/>
                </div>
              ))}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>ABOUT YOUR SHOP (SHOWN ON PROFILE)</div>
                <textarea placeholder="Tell customers what makes your shop great — experience, specialisms, what machines you stock, anything that builds trust..." rows={3} style={{...inp,resize:"vertical"}}/>
              </div>
              <div style={{background:G.amber,border:`1px solid ${G.gold}44`,borderRadius:10,padding:12,fontSize:12,color:"#78540A",lineHeight:1.7}}>
                🛡️ All documents are stored securely and used only for verification. Never shared with customers.
              </div>
            </>
          )}

          {step===4&&(
            <>
              <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:4}}>Choose your plan</h3>
              <p style={{color:G.muted,fontSize:13,marginBottom:18}}>First month free on Standard and Premium. Cancel anytime.</p>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                {PLANS.map(p=>(
                  <div key={p.id} onClick={()=>setPlan(p.id)}
                    style={{borderRadius:13,padding:16,cursor:"pointer",
                      border:`2px solid ${plan===p.id?G.forest:G.border}`,
                      background:plan===p.id?G.pale:G.white,transition:"all .15s"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:6}}>
                      <div>
                        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                          <span style={{fontWeight:800,color:G.ink,fontSize:14}}>{p.name}</span>
                          {p.badge&&<Pill text={p.badge} color={G.forest}/>}
                        </div>
                        <div style={{fontSize:12,color:G.muted,marginBottom:4}}>{p.desc}</div>
                        <div style={{fontSize:11,color:G.muted}}>
                          {p.leads?"Enquiry routing (£3/lead) + call tracking (£2/call) included":"No lead routing or call tracking"}
                        </div>
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <span style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:G.forest}}>{p.price===0?"Free":`£${p.price}/mo`}</span>
                        {p.price>0&&<div style={{fontSize:10,color:G.forest,fontWeight:700}}>1st month free</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:10,padding:12,fontSize:12,color:G.body,lineHeight:1.7}}>
                ✓ No contract · Cancel anytime via email · Invoiced monthly · Payment by bank transfer or card
              </div>
            </>
          )}

          <div style={{display:"flex",gap:9,marginTop:20}}>
            {step>1&&(
              <button onClick={()=>setStep(step-1)}
                style={{flex:1,padding:"11px 0",background:G.frost,border:`1px solid ${G.border}`,borderRadius:11,color:G.muted,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                ← Back
              </button>
            )}
            <button onClick={()=>step<4?setStep(step+1):setDone(true)} className="bp"
              style={{flex:2,padding:"11px 0",background:G.forest,border:"none",borderRadius:11,color:G.white,fontSize:13,fontWeight:800,cursor:"pointer"}}>
              {step<4?"Continue →":"Submit Application →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CARPET CARE GUIDE DATA ──────────────────────────────
const STAIN_GUIDES = [
  { id:"redwine",   emoji:"🍷", name:"Red Wine",       category:"Drink",
    urgency:"Act fast — red wine sets quickly",
    difficulty:2, timeMinutes:20,
    searches:"12,000/mo",
    intro:"Red wine contains tannins and pigments that bond to carpet fibres fast. The sooner you act the better — a fresh spill is 80% easier to remove than a dried one.",
    steps:[
      {t:"Blot immediately",  d:"Use a clean white cloth or kitchen roll. Press firmly — never rub. Rubbing spreads the stain and pushes it deeper into the fibres. Work from the outside of the stain inward."},
      {t:"Cold water rinse",  d:"Pour a small amount of cold water onto the stain. Blot again. Never use hot water — heat sets the pigment permanently."},
      {t:"Apply salt or baking soda", d:"Sprinkle generously over the damp stain. Leave for 3–5 minutes. This draws the wine out of the fibres and into the powder."},
      {t:"Vacuum the powder", d:"Once the baking soda or salt has absorbed the wine, vacuum it up completely."},
      {t:"Apply cleaning solution", d:"Mix 1 tablespoon washing up liquid with 1 tablespoon white vinegar and 2 cups cold water. Apply to the stain with a clean cloth, blotting gently."},
      {t:"Rinse and dry",     d:"Rinse with cold water, blot dry. Place a clean towel over the area and weigh it down overnight to draw out remaining moisture."},
    ],
    doNot:["Use hot water","Rub the stain","Use bleach on coloured carpet","Leave the stain to dry before treating"],
    proTip:"For a dried red wine stain, rehydrate it first with cold water, then follow the steps above. It will be harder but not impossible.",
    product:AMAZON_PRODUCTS.stain_remover,
    productContext:"red wine carpet stain remover",
    whenToPro:"If the stain covers more than a dinner plate or has fully dried and the above method hasn't worked.",
    col:"#C62828", bgCol:"#FFEBEE" },

  { id:"peturine",  emoji:"🐾", name:"Pet Urine",      category:"Pet",
    urgency:"Treat now — urine odour worsens with time",
    difficulty:3, timeMinutes:30,
    searches:"9,500/mo",
    intro:"Pet urine is a two-part problem — the visible stain and the invisible odour crystals that form as it dries. You need to tackle both or the smell will return, especially in warm weather.",
    steps:[
      {t:"Absorb wet urine",  d:"If fresh, blot up as much liquid as possible with paper towels or an old cloth. Stand on the cloth to apply pressure. Remove as much moisture as you can before anything else."},
      {t:"Cold water dilution",d:"Pour cold water over the area to dilute the urine. Blot again. Repeat twice."},
      {t:"Apply enzyme cleaner",d:"Enzyme-based cleaners are essential for pet urine — they break down the uric acid crystals that cause odour. Pour generously, let it soak for 10 minutes."},
      {t:"Blot and dry",      d:"Blot up the enzyme cleaner. Don't rinse — the enzymes need to keep working as the area dries."},
      {t:"Deodorise",         d:"Once fully dry, sprinkle baking soda over the area. Leave for several hours or overnight, then vacuum."},
      {t:"Check with UV light",d:"In a dark room, use a UV torch to check if you've got all the affected area — urine glows under UV. Retreat any missed patches."},
    ],
    doNot:["Use ammonia-based cleaners (it mimics urine smell)","Steam clean before enzyme treatment — heat sets the odour permanently","Use too little enzyme cleaner — be generous"],
    proTip:"If your pet keeps returning to the same spot, the odour crystals are still there even if you can't smell them. A UV torch (under £5 on Amazon) will show you exactly where.",
    product:AMAZON_PRODUCTS.bissell_solution,
    productContext:"pet urine enzyme carpet cleaner",
    whenToPro:"Multiple accidents in the same area, or if the urine has soaked through to the underlay — a professional with truck-mounted equipment can extract from the underlay.",
    col:"#E65100", bgCol:"#FFF3E0" },

  { id:"coffee",    emoji:"☕", name:"Coffee",          category:"Drink",
    urgency:"Blot immediately before it dries",
    difficulty:2, timeMinutes:15,
    searches:"7,200/mo",
    intro:"Coffee stains are tannin-based and brown when dry, making them very visible. Fresh coffee is easy to remove. Coffee with milk is slightly harder because of the protein content.",
    steps:[
      {t:"Blot straight away",d:"Use a clean white cloth and blot from the outside in. Remove as much liquid as possible before it spreads."},
      {t:"Cold water rinse",  d:"Apply cold water and blot again. For milky coffee, this is particularly important to dilute the protein before it sets."},
      {t:"Detergent solution",d:"Mix one teaspoon of washing up liquid with one cup of cold water. Apply with a clean cloth and blot — don't scrub."},
      {t:"White vinegar rinse",d:"Apply a small amount of white vinegar diluted with water. This neutralises the tannins and lifts remaining colour."},
      {t:"Rinse and dry",    d:"Rinse thoroughly with cold water, blot dry. The area may look slightly yellow when wet — this should disappear when fully dry."},
    ],
    doNot:["Use hot water","Scrub","Leave to dry without treating"],
    proTip:"If you have white or very light carpet, follow up with a small amount of 3% hydrogen peroxide left for 10 minutes then rinsed. Test a hidden area first.",
    product:AMAZON_PRODUCTS.universal_solution,
    productContext:"coffee stain carpet remover",
    whenToPro:"Dried coffee on light or cream carpet where DIY methods have left a yellow residue.",
    col:"#4E342E", bgCol:"#EFEBE9" },

  { id:"blood",     emoji:"🩸", name:"Blood",           category:"Other",
    urgency:"Cold water only — never warm",
    difficulty:2, timeMinutes:20,
    searches:"5,400/mo",
    intro:"Blood must be treated with cold water only — warm or hot water cooks the protein and permanently bonds it to carpet fibres. This is the single most important rule.",
    steps:[
      {t:"Cold water immediately",d:"Apply cold water only. Never warm. Blot the area to dilute and lift the blood. Change your cloth frequently — you're trying to dilute not spread."},
      {t:"Salt paste",           d:"Mix table salt with cold water to make a paste. Apply to the stain and leave for a few minutes. Salt draws out the blood protein."},
      {t:"Blot and rinse",       d:"Blot up the salt paste and rinse with more cold water."},
      {t:"Hydrogen peroxide",    d:"For stubborn or dried blood, apply 3% hydrogen peroxide (brown bottle from pharmacy). It will fizz — this is the oxidation breaking down the blood. Blot after 10 minutes. Test a hidden area first on coloured carpet."},
      {t:"Rinse and dry",        d:"Rinse thoroughly with cold water and blot dry."},
    ],
    doNot:["Use warm or hot water at any point","Rub the stain","Use bleach on coloured carpet"],
    proTip:"Hydrogen peroxide works brilliantly on dried blood but can lighten some carpet colours. Always test on a hidden area — under furniture or in a corner — before applying to the main stain.",
    product:AMAZON_PRODUCTS.universal_solution,
    productContext:"carpet stain remover for blood",
    whenToPro:"Large blood stains or if hydrogen peroxide has affected carpet colour.",
    col:"#B71C1C", bgCol:"#FFEBEE" },

  { id:"grease",    emoji:"🍟", name:"Grease & Oil",   category:"Food",
    urgency:"Don't add water first — it spreads grease",
    difficulty:3, timeMinutes:25,
    searches:"4,800/mo",
    intro:"Grease and oil are water-repellent, which means plain water makes things worse. You need to break down the oil before rinsing — the key is using a degreasing agent first.",
    steps:[
      {t:"Dry absorbent first",  d:"Sprinkle baking soda, cornflour or talcum powder generously over the grease. Leave for 15 minutes — it absorbs the oil. Vacuum thoroughly."},
      {t:"Apply washing up liquid",d:"Washing up liquid is a degreaser. Apply a small amount directly to the stain and work in gently with a soft brush or cloth."},
      {t:"Blot with warm water", d:"Use warm (not hot) water to blot the washing up liquid and dissolved grease. Change your cloth regularly."},
      {t:"Repeat if needed",     d:"Grease often needs 2–3 treatments. Reapply washing up liquid and blot again."},
      {t:"Rinse and dry",        d:"Rinse with clean warm water and blot dry. Residual washing up liquid attracts dirt so rinse well."},
    ],
    doNot:["Apply water before the dry absorbent step","Use too much water at once","Scrub"],
    proTip:"WD-40 sounds counterintuitive but it can help lift certain grease stains — spray a tiny amount, leave 30 seconds, then apply washing up liquid to remove both the original grease and the WD-40.",
    product:AMAZON_PRODUCTS.universal_solution,
    productContext:"carpet degreaser stain remover",
    whenToPro:"Cooking oil or motor oil in large quantities — the deep fibres will likely need professional hot water extraction.",
    col:"#F57F17", bgCol:"#FFFDE7" },

  { id:"mud",       emoji:"🥾", name:"Mud & Dirt",     category:"Other",
    urgency:"Wait until fully dry before treating",
    difficulty:1, timeMinutes:15,
    searches:"6,200/mo",
    intro:"Mud is one of the easiest stains to remove — but only if you let it dry first. Treating wet mud spreads it and embeds it deeper. This is the one stain where waiting is the right strategy.",
    steps:[
      {t:"Let it dry completely",d:"Leave the mud completely alone until it's fully dry and flaky — usually 2–4 hours. Do not touch it."},
      {t:"Vacuum thoroughly",    d:"Once dry, vacuum the area firmly to remove as much dried mud as possible. Use a stiff brush attachment if you have one."},
      {t:"Apply detergent solution",d:"Mix washing up liquid with warm water. Apply with a clean cloth and work gently into the remaining stain."},
      {t:"Blot and rinse",       d:"Blot up the detergent. Rinse with clean water and blot dry. The stain should be completely gone."},
    ],
    doNot:["Treat while wet","Rub wet mud"],
    proTip:"For clay-heavy mud (like from a football pitch), you may need a pre-treatment spray before the detergent step — clay binds to fibres differently to garden soil.",
    product:AMAZON_PRODUCTS.pretreat_spray,
    productContext:"carpet pre-treatment spray for mud",
    whenToPro:"Rarely needed for mud — if a large amount has dried deep in the pile, a professional clean will fully restore it.",
    col:"#5D4037", bgCol:"#EFEBE9" },

  { id:"ink",       emoji:"🖊️",  name:"Ink",            category:"Other",
    urgency:"Act immediately — ink sets fast",
    difficulty:4, timeMinutes:30,
    searches:"3,800/mo",
    intro:"Ink is one of the hardest stains to remove completely, especially ballpoint pen ink. Alcohol-based solutions work best. Act fast — every minute the ink dries deeper.",
    steps:[
      {t:"Blot excess ink",      d:"Blot immediately with a dry white cloth. Don't press too hard — you don't want to push ink deeper into the pile."},
      {t:"Apply isopropyl alcohol",d:"Apply rubbing alcohol (isopropyl alcohol) or hand sanitiser to a clean cloth and dab onto the stain. The alcohol dissolves the ink binder. Work from outside in."},
      {t:"Blot and repeat",      d:"Blot the dissolved ink and apply more alcohol. Change your cloth regularly — you're transferring ink from carpet to cloth."},
      {t:"Detergent rinse",      d:"Once most ink is lifted, apply a mild detergent solution to remove the alcohol and remaining ink residue."},
      {t:"Rinse and dry",        d:"Rinse with clean water and blot dry thoroughly — alcohol can affect some carpet backings if left too long."},
    ],
    doNot:["Use water first — it spreads ink","Rub","Use acetone (nail varnish remover) on synthetic carpets — it can dissolve fibres"],
    proTip:"Hairspray used to work brilliantly on ink because it contained a high percentage of alcohol. Modern hairsprays are water-based and less effective — buy a small bottle of isopropyl alcohol from a pharmacy instead.",
    product:AMAZON_PRODUCTS.stain_remover,
    productContext:"ink stain carpet remover",
    whenToPro:"Printer ink, particularly black toner, often requires professional treatment. Large ink spills are almost always a job for a professional.",
    col:"#1A237E", bgCol:"#E8EAF6" },

  { id:"paint",     emoji:"🎨", name:"Paint",          category:"Other",
    urgency:"Remove while wet — dried paint is very difficult",
    difficulty:4, timeMinutes:30,
    searches:"6,600/mo",
    intro:"Water-based (emulsion) paint is removable if fresh. Gloss or oil-based paint is extremely difficult once dry. Act as fast as you possibly can.",
    steps:[
      {t:"Emulsion — blot wet paint",d:"For fresh emulsion paint, blot with a dry cloth. Remove as much as possible before it starts to dry."},
      {t:"Warm water and detergent", d:"Apply warm water and a small amount of washing up liquid. Blot gently — don't scrub. The paint should start to lift."},
      {t:"Repeat until clear",       d:"Keep applying clean water and blotting until the paint is gone. Change your cloth regularly."},
      {t:"Dried emulsion",           d:"Soften dried emulsion with warm water first, then work a small amount of isopropyl alcohol in to break it down."},
      {t:"Gloss or oil paint",       d:"Apply a small amount of white spirit to a cloth and blot the paint. Test a hidden area first — white spirit can affect some carpet types."},
    ],
    doNot:["Let paint dry before treating","Use large amounts of white spirit","Scrub dried paint — it breaks into smaller particles that go deeper"],
    proTip:"For dried gloss paint, try carefully picking off the raised surface with a blunt knife before applying white spirit — removing the bulk mechanically first makes the chemical treatment much more effective.",
    product:AMAZON_PRODUCTS.universal_solution,
    productContext:"paint remover carpet stain",
    whenToPro:"Large area of dried gloss or oil-based paint — this is almost always a professional job.",
    col:"#0277BD", bgCol:"#E1F5FE" },

  { id:"food",      emoji:"🍝", name:"Food & Sauce",   category:"Food",
    urgency:"Scoop before blotting",
    difficulty:2, timeMinutes:15,
    searches:"8,400/mo",
    intro:"Food stains vary by their composition. The first step is always to remove solids before they get pressed deeper into the fibres. Different sauces need slightly different approaches.",
    steps:[
      {t:"Scoop solids first",   d:"Use a spoon or blunt knife to gently lift any solid food. Work from the outside in and try not to push it deeper. Get as much off as possible before any liquid treatment."},
      {t:"Blot liquid",          d:"Blot any liquid component with a clean cloth."},
      {t:"Cold or warm water",   d:"Use cold water for tomato-based sauces (ketchup, bolognese). Use warm water for fat-based sauces (gravy, cheese). Blot — don't pour."},
      {t:"Detergent solution",   d:"Apply washing up liquid diluted in water. Blot gently. For tomato-based stains, white vinegar helps neutralise the acidity."},
      {t:"Rinse and dry",        d:"Rinse with clean water and blot dry."},
    ],
    doNot:["Use hot water on tomato sauces — it sets the pigment","Press solid food deeper into the carpet"],
    proTip:"Curry is the trickiest food stain due to turmeric's yellow pigment. After standard cleaning, apply a paste of cream of tartar and lemon juice, leave 10 minutes, then rinse. The citric acid helps break down the turmeric.",
    product:AMAZON_PRODUCTS.pretreat_spray,
    productContext:"food and sauce carpet stain remover",
    whenToPro:"Curry or beetroot that has dried — the pigments in these are extremely persistent and often need professional treatment.",
    col:"#E65100", bgCol:"#FFF3E0" },

  { id:"wax",       emoji:"🕯️", name:"Candle Wax",     category:"Other",
    urgency:"Let it harden first — don't touch while molten",
    difficulty:2, timeMinutes:20,
    searches:"2,900/mo",
    intro:"Candle wax is actually easier to remove than most people think — but only once it's solid. Trying to remove molten wax just smears it. Patience is the key.",
    steps:[
      {t:"Let it cool and harden",d:"Leave the wax completely alone until fully solid and hard. You can speed this up by placing a bag of ice cubes on it for 5 minutes."},
      {t:"Crack and vacuum",      d:"Once hard, place a carrier bag over the wax and press firmly — the wax cracks into pieces. Vacuum up all the pieces thoroughly."},
      {t:"Iron method for residue",d:"Place a paper bag, brown paper, or thick cloth over the remaining wax residue. Apply a warm iron briefly (5–10 seconds). The wax melts and transfers to the paper. Move to a fresh section of paper and repeat."},
      {t:"Solvent for colour",    d:"If the candle left a colour stain, apply isopropyl alcohol with a clean cloth and blot."},
      {t:"Final clean",           d:"Apply a mild detergent solution, blot, rinse with clean water and dry."},
    ],
    doNot:["Touch or blot molten wax","Use the iron directly on carpet","Leave iron on one spot — keep it moving"],
    proTip:"The iron method works brilliantly but be careful with the heat setting — too hot and you risk melting or scorching the carpet fibres. Use the lowest heat that still melts the wax, with a thick cloth as a buffer.",
    product:AMAZON_PRODUCTS.stain_remover,
    productContext:"carpet stain remover wax residue",
    whenToPro:"Rarely needed — wax almost always comes out with the iron method.",
    col:"#F9A825", bgCol:"#FFF8E1" },

  { id:"gum",       emoji:"🍬", name:"Chewing Gum",    category:"Other",
    urgency:"Freeze first — never pull warm gum",
    difficulty:2, timeMinutes:15,
    searches:"2,200/mo",
    intro:"Chewing gum is sticky and elastic when warm, but becomes brittle and easy to remove when frozen. Cold is your best friend here.",
    steps:[
      {t:"Freeze the gum",       d:"Fill a plastic bag with ice cubes and press it onto the gum for 5–10 minutes until the gum is completely hard and frozen."},
      {t:"Break and lift",       d:"Use a blunt knife or spoon to break the frozen gum and lift pieces away from the carpet. Work carefully so you don't cut the fibres."},
      {t:"Peel remaining pieces",d:"Once the bulk is removed, use sticky tape pressed firmly onto remaining pieces to lift them out."},
      {t:"Solvent for residue",  d:"Apply a small amount of isopropyl alcohol or white spirit to a cloth and blot remaining residue."},
      {t:"Detergent clean",      d:"Apply washing up liquid solution, blot, rinse with clean water and dry."},
    ],
    doNot:["Pull warm gum — it stretches and embeds deeper","Use scissors to cut gum out — you'll damage the carpet pile"],
    proTip:"WD-40 can be used as an alternative solvent for gum residue — spray a tiny amount, leave 30 seconds, then remove with washing up liquid. Don't leave WD-40 on too long.",
    product:AMAZON_PRODUCTS.stain_remover,
    productContext:"carpet gum remover",
    whenToPro:"Almost never — frozen gum comes out reliably at home.",
    col:"#00796B", bgCol:"#E0F2F1" },

  { id:"general",   emoji:"✨",  name:"General Refresh", category:"General",
    urgency:"No urgency — routine maintenance",
    difficulty:1, timeMinutes:45,
    searches:"40,000/mo",
    intro:"Even without visible stains, carpets accumulate dust, allergens and odours that regular vacuuming can't fully remove. A proper deep clean twice a year keeps carpets fresh and extends their life.",
    steps:[
      {t:"Vacuum thoroughly",    d:"Vacuum the entire carpet slowly, going over each area twice — once forward, once back. Use a crevice tool for edges. This is the most important step."},
      {t:"Pre-treat any spots",  d:"Identify any light marks or traffic areas. Apply a pre-treatment spray and leave for 5 minutes before cleaning."},
      {t:"Baking soda deodorise",d:"Sprinkle baking soda generously over the carpet. Leave for 20–30 minutes (or overnight for best results). Baking soda absorbs odours and moisture."},
      {t:"Vacuum again",         d:"Vacuum the baking soda thoroughly. The carpet should already smell fresher."},
      {t:"Hire a machine",       d:"For a proper deep clean, hire a Rug Doctor or Bissell and go over the whole carpet. For a standard room this takes about 30 minutes and costs £22–29."},
      {t:"Dry properly",         d:"Open windows and run fans. Allow 4–8 hours before foot traffic."},
    ],
    doNot:["Over-wet the carpet","Skip the initial vacuuming step","Walk on carpet before it's dry"],
    proTip:"The best time to deep clean is on a warm, breezy day when windows can be fully open — faster drying means less risk of mildew and a better result overall.",
    product:AMAZON_PRODUCTS.rugdoctor_solution,
    productContext:"carpet cleaning solution for full room clean",
    whenToPro:"Annually for a full professional deep clean, or before selling or renting a property.",
    col:"#2E7D32", bgCol:"#E8F5E9" },
];

const STAIN_CATEGORIES = ["All", "Drink", "Food", "Pet", "Other", "General"];

// ─── CARPET CARE GUIDE PAGE ───────────────────────────────
function CarpetCareGuide({setTab}){
  const [search,setSearch]=useState("");
  const [category,setCategory]=useState("All");
  const [openStain,setOpenStain]=useState(null);

  const filtered = STAIN_GUIDES.filter(s=>{
    const matchCat  = category==="All" || s.category===category;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const active = openStain ? STAIN_GUIDES.find(s=>s.id===openStain) : null;

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:920,margin:"0 auto"}}>

        {/* Care Guide toggle */}
        <div style={{display:"flex",background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:4,marginBottom:16,gap:3}}>
          <button style={{flex:1,padding:"10px 0",border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:800,background:`linear-gradient(135deg,${G.forest},${G.dark})`,color:G.white,transition:"all .2s"}}>
            Carpet Care
          </button>
          <button onClick={()=>setTab("patioguide")} style={{flex:1,padding:"10px 0",border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700,background:"transparent",color:G.muted,transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.background=G.frost}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            Patio Care
          </button>
        </div>

        {/* Header */}
        <div style={{background:`linear-gradient(145deg,${G.forest},${G.dark})`,borderRadius:20,padding:"28px 28px 24px",marginBottom:22,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:`radial-gradient(${G.white} 1px,transparent 1px)`,backgroundSize:"24px 24px",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1,display:"flex",gap:18,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontSize:10,fontWeight:800,color:G.light,letterSpacing:2,marginBottom:8}}>CARPET CARE GUIDE</div>
              <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,34px)",color:G.white,marginBottom:8,lineHeight:1.2}}>
                Stain Removal &amp; Carpet Care
              </h1>
              <p style={{color:"rgba(255,255,255,.65)",fontSize:13,lineHeight:1.75,maxWidth:480}}>
                Step-by-step guides for every common carpet stain. 12 guides covering 144,000 monthly UK searches. Find your stain, follow the steps.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7,flexShrink:0}}>
              {[["12","Stain guides"],["144k","Monthly UK searches"],["Free","Always free"],["Amazon","Products linked"]].map(([v,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.bright,minWidth:38}}>{v}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search + category filter */}
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:"14px 16px",marginBottom:16}}>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
            {/* Search */}
            <div style={{flex:"1 1 180px",display:"flex",alignItems:"center",gap:8,background:G.frost,borderRadius:20,padding:"7px 14px",border:`1px solid ${G.border}`}}>
              <span style={{fontSize:14,color:G.muted}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search stains… e.g. coffee, pet, wine"
                style={{border:"none",outline:"none",background:"transparent",fontSize:13,color:G.ink,width:"100%"}}/>
              {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:G.muted,cursor:"pointer",fontSize:16,lineHeight:1,padding:0}}>×</button>}
            </div>
            <span style={{fontSize:11,color:G.muted,fontWeight:600,flexShrink:0}}>or filter:</span>
          </div>
          {/* Category pills */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
            {STAIN_CATEGORIES.map(c=>(
              <button key={c} onClick={()=>setCategory(c)}
                style={{padding:"5px 13px",border:`1px solid ${category===c?G.forest:G.border}`,borderRadius:20,
                  background:category===c?G.forest:G.white,color:category===c?G.white:G.muted,
                  fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .15s"}}>
                {c==="All"?"All Stains":c==="Drink"?"Drinks":c==="Food"?"Food":c==="Pet"?"Pet":c==="Other"?"Other":"General"}
              </button>
            ))}
            <div style={{marginLeft:"auto",fontSize:11,color:G.muted}}>
              <strong style={{color:G.ink}}>{filtered.length}</strong> guide{filtered.length!==1?"s":""}
            </div>
          </div>
        </div>

        {/* Stain grid */}
        {!active&&(
          <div className="fu" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12,marginBottom:24}}>
            {filtered.map(s=>(
              <div key={s.id} className="ch" onClick={()=>setOpenStain(s.id)}
                style={{background:G.white,borderRadius:16,padding:18,cursor:"pointer",
                  border:`1.5px solid ${G.border}`,
                  boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{width:44,height:44,borderRadius:12,background:s.bgCol,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{s.emoji}</div>
                  <span style={{background:G.pale,color:G.forest,border:`1px solid ${G.border}`,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,letterSpacing:.8}}>{s.category.toUpperCase()}</span>
                </div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.ink,marginBottom:4}}>{s.name}</div>
                <div style={{fontSize:11,color:G.muted,marginBottom:8,lineHeight:1.5}}>{s.intro.slice(0,80)}…</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",gap:3}}>
                    {Array.from({length:5}).map((_,i)=>(
                      <div key={i} style={{width:8,height:8,borderRadius:2,background:i<s.difficulty?s.col:"#E0E0E0"}}/>
                    ))}
                    <span style={{fontSize:10,color:G.muted,marginLeft:4}}>{s.difficulty<=2?"Easy":s.difficulty===3?"Medium":"Hard"}</span>
                  </div>
                  <span style={{fontSize:11,color:G.muted}}>{s.timeMinutes} min</span>
                </div>
                <div style={{marginTop:10,fontSize:11,fontWeight:700,color:G.forest}}>Read guide →</div>
              </div>
            ))}
          </div>
        )}

        {/* Individual stain guide */}
        {active&&(
          <div className="fu">
            {/* Back button */}
            <button onClick={()=>setOpenStain(null)}
              style={{display:"flex",alignItems:"center",gap:6,background:"none",border:`1px solid ${G.border}`,
                borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:600,
                color:G.muted,marginBottom:16}}>
              ← Back to all stains
            </button>

            {/* Guide header */}
            <div style={{background:`linear-gradient(145deg,${active.col},${active.col}CC)`,borderRadius:18,padding:24,marginBottom:16,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
              <div style={{width:60,height:60,borderRadius:16,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:34,flexShrink:0}}>{active.emoji}</div>
              <div style={{flex:1,minWidth:160}}>
                <div style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,.7)",letterSpacing:1.5,marginBottom:4}}>{active.category.toUpperCase()} STAIN GUIDE</div>
                <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:G.white,marginBottom:6,lineHeight:1.2}}>{active.name} Stain Removal</h2>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <span style={{fontSize:12,color:"rgba(255,255,255,.75)"}}>{active.timeMinutes} mins</span>
                  <span style={{fontSize:12,color:"rgba(255,255,255,.75)"}}>📈 {active.searches} UK searches</span>
                  <span style={{background:"rgba(255,255,255,.2)",color:G.white,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20}}>
                    {active.difficulty<=2?"Easy":active.difficulty===3?"Medium":"Hard"}
                  </span>
                </div>
              </div>
            </div>

            {/* Urgency banner */}
            <div style={{background:G.amber,border:`1px solid ${G.gold}44`,borderRadius:10,padding:"10px 14px",marginBottom:16,display:"flex",gap:9,alignItems:"center"}}>
              <span style={{fontSize:18}}>⚡</span>
              <span style={{fontSize:13,fontWeight:700,color:"#78540A"}}>{active.urgency}</span>
            </div>

            {/* Intro */}
            <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:18,marginBottom:14}}>
              <p style={{fontSize:14,color:G.body,lineHeight:1.8}}>{active.intro}</p>
            </div>

            {/* Step by step */}
            <div style={{marginBottom:14}}>
              <SLabel t="STEP BY STEP"/>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {active.steps.map((step,i)=>(
                  <div key={i} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:13,padding:16,display:"flex",gap:13}}>
                    <div style={{width:28,height:28,borderRadius:9,background:active.col,flexShrink:0,
                      display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontSize:12,fontWeight:800}}>
                      {i+1}
                    </div>
                    <div>
                      <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:4}}>{step.t}</div>
                      <div style={{fontSize:13,color:G.muted,lineHeight:1.75}}>{step.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two columns: Do Not + Pro Tip */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginBottom:14}}>
              <div style={{background:G.orangeLight,border:"1px solid #FFCC80",borderRadius:13,padding:16}}>
                <div style={{fontSize:10,fontWeight:800,color:G.orange,letterSpacing:1,marginBottom:8}}>✗ DO NOT</div>
                {active.doNot.map(d=>(
                  <div key={d} style={{fontSize:12,color:G.body,marginBottom:5,display:"flex",gap:7}}>
                    <span style={{color:G.orange,fontWeight:800,flexShrink:0}}>✗</span>{d}
                  </div>
                ))}
              </div>
              <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:13,padding:16}}>
                <div style={{fontSize:10,fontWeight:800,color:G.forest,letterSpacing:1,marginBottom:8}}>PRO TIP</div>
                <p style={{fontSize:12,color:G.body,lineHeight:1.75}}>{active.proTip}</p>
              </div>
            </div>

            {/* Amazon product */}
            <AmazonWidget product={active.product} context={active.productContext}/>

            {/* When to call a pro */}
            <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:13,padding:16,marginTop:12,display:"flex",gap:11,alignItems:"flex-start"}}>
              
              <div>
                <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:3}}>When to call a professional</div>
                <p style={{fontSize:12,color:G.muted,lineHeight:1.7,marginBottom:10}}>{active.whenToPro}</p>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button onClick={()=>setTab("services")} className="bp"
                    style={{padding:"8px 16px",background:G.forest,border:"none",borderRadius:10,
                      color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                    Get Free Quote from a Pro →
                  </button>
                  <button onClick={()=>setTab("hire")} className="bp"
                    style={{padding:"8px 16px",background:"none",border:`1.5px solid ${G.forest}`,borderRadius:10,
                      color:G.forest,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                    Hire a Machine Instead →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA — when showing grid */}
        {!active&&(
          <div style={{background:`linear-gradient(135deg,${G.forest},${G.dark})`,borderRadius:18,padding:22,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.white,marginBottom:5}}>
                Stain too deep for DIY?
              </div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.7}}>
                Hire a professional machine from £22/day, or get free quotes from a verified local cleaner.
              </div>
            </div>
            <div style={{display:"flex",gap:9,flexShrink:0,flexWrap:"wrap"}}>
              <button onClick={()=>setTab("hire")} className="bp"
                style={{padding:"10px 18px",background:G.gold,border:"none",borderRadius:11,
                  color:G.ink,fontSize:13,fontWeight:800,cursor:"pointer",boxShadow:"0 4px 14px rgba(249,168,37,.35)"}}>
                Hire a Machine →
              </button>
              <button onClick={()=>setTab("services")} className="bp"
                style={{padding:"10px 18px",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:11,
                  color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                Book a Pro →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EMAIL SEQUENCE PREVIEW ──────────────────────────────
function EmailSequencePreview(){
  const SEQ=[
    { num:1, when:"Immediately after signup", subject:"Welcome to Ready 4 Hire — your free guide is inside",
      preview:"Hi {name}, thanks for joining. Here's everything you need to get the best price on carpet cleaning in the UK…",
      body:[
        "A full comparison of all 5 hire machines — prices, where to collect, solution included or not",
        "Our honest answer to: hire a machine vs book a professional?",
        "The Carpet Care Guide — bookmarked for whenever you need it",
        "A link to set your first price alert",
      ],
      cta:"View Full Machine Comparison →", earnType:"CPA hire booking", earnEst:"£5.50 avg" },
    { num:2, when:"Day 2", subject:"Rug Doctor vs Kärcher — which one should you actually hire?",
      preview:"We get asked this constantly. The short answer: Rug Doctor for everyday cleans, Kärcher for serious jobs. Here's the full breakdown…",
      body:[
        "Side by side comparison of the two most popular machines",
        "Which one is right for your carpet type",
        "Where to collect near you based on your postcode",
        "Current prices with live affiliate links",
      ],
      cta:"Compare Both Machines →", earnType:"CPA hire booking", earnEst:"£6.20 avg" },
    { num:3, when:"Day 5", subject:"Moving out? Here's exactly what landlords check",
      preview:"The #1 reason tenants lose their deposit is carpets. Here's the step-by-step checklist every tenant should follow before their inspection…",
      body:[
        "The full landlord carpet checklist — 7 items to tick off",
        "DIY vs professional: which is right for end of tenancy",
        "The Rug Doctor hire option for same-day availability",
        "Free professional quotes from verified EOT specialists",
      ],
      cta:"Open End of Tenancy Guide →", earnType:"Lead fee", earnEst:"£13 avg" },
    { num:4, when:"Day 9", subject:"Got a stain you can't shift? Here's what actually works",
      preview:"12 stain guides — red wine, pet urine, coffee, blood, grease, ink, paint and more. Step by step, with the products that actually work…",
      body:[
        "Link to the full Carpet Care Guide",
        "The 3 most common DIY mistakes that make stains permanent",
        "Top-rated stain removal products on Amazon (affiliate links)",
        "When a stain is beyond DIY — free professional quote link",
      ],
      cta:"Open Carpet Care Guide →", earnType:"Amazon commission", earnEst:"£1.10 avg" },
    { num:5, when:"Day 14", subject:"Your price alert — we've been watching",
      preview:"Good news — we check hire prices daily. Here's the latest prices for all 5 machines, plus a reminder of your target price…",
      body:[
        "Current live prices for all 5 machines",
        "Alert status: watching / triggered",
        "If triggered: 'The machine you were watching just dropped to your target price'",
        "Direct booking link with affiliate tracking",
      ],
      cta:"Book at Today's Price →", earnType:"CPA hire booking", earnEst:"£6.50 avg" },
  ];

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        <div style={{marginBottom:22}}>
          <SLabel t="EMAIL ONBOARDING SEQUENCE"/>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,32px)",color:G.ink,marginBottom:6}}>
            5-Email Welcome Sequence
          </h1>
          <p style={{color:G.muted,fontSize:14,lineHeight:1.75,maxWidth:560}}>
            Every person who signs up, submits a quote or sets a price alert gets this automated sequence. Set up once in Mailchimp. Runs forever. Each email has one clear affiliate or lead CTA.
          </p>
        </div>

        {/* Setup instructions */}
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:20,marginBottom:22,display:"flex",gap:14,alignItems:"flex-start",flexWrap:"wrap"}}>
          <div style={{fontSize:28}}>📧</div>
          <div style={{flex:1,minWidth:180}}>
            <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:5}}>How to set this up — free in Mailchimp</div>
            {["Sign up at mailchimp.com (free up to 500 contacts)","Create an Automation > Customer Journey","Add a trigger: 'Joins audience' (when someone signs up)","Add each email as a step with the correct delay","Paste the subject lines and body text below into each email","Add your real affiliate links to the CTA buttons","Activate — it runs automatically forever"].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:4}}>
                <div style={{width:18,height:18,borderRadius:5,background:G.forest,color:G.white,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                <span style={{fontSize:12,color:G.body}}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email cards */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {SEQ.map((e,i)=>(
            <div key={i} style={{background:G.white,border:`1.5px solid ${i===0?G.dark:G.border}`,borderRadius:18,overflow:"hidden",boxShadow:i===0?"0 4px 20px rgba(27,94,32,.09)":"0 2px 8px rgba(0,0,0,.04)"}}>
              {/* Header */}
              <div style={{background:i===0?`linear-gradient(135deg,${G.forest},${G.mid})`:G.pale,padding:"14px 20px",display:"flex",gap:14,alignItems:"center",borderBottom:`1px solid ${G.border}`}}>
                <div style={{width:36,height:36,borderRadius:10,background:i===0?"rgba(255,255,255,.2)":G.forest,color:G.white,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Serif Display',serif",fontSize:18,fontWeight:700,flexShrink:0}}>{e.num}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,fontSize:13,color:i===0?G.white:G.ink,marginBottom:2}}>{e.subject}</div>
                  <div style={{fontSize:11,color:i===0?"rgba(255,255,255,.7)":G.muted}}>Sends: {e.when}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{background:i===0?"rgba(255,255,255,.2)":G.forest,color:G.white,fontSize:9,fontWeight:800,padding:"3px 10px",borderRadius:20,marginBottom:3}}>{e.earnType.toUpperCase()}</div>
                  <div style={{fontSize:11,color:i===0?"rgba(255,255,255,.7)":G.muted}}>{e.earnEst}</div>
                </div>
              </div>
              {/* Body */}
              <div style={{padding:"16px 20px"}}>
                <div style={{fontSize:12,color:G.muted,fontStyle:"italic",marginBottom:12,lineHeight:1.6,background:G.frost,borderRadius:8,padding:"8px 12px",borderLeft:`3px solid ${G.border}`}}>
                  Preview: "{e.preview}"
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:800,color:G.muted,letterSpacing:1,marginBottom:6}}>EMAIL CONTAINS</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:6}}>
                    {e.body.map((b,j)=>(
                      <div key={j} style={{display:"flex",gap:7,fontSize:12,color:G.body}}>
                        <span style={{color:G.bright,fontWeight:800,flexShrink:0}}>✓</span>{b}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:G.pale,borderRadius:10,border:`1px solid ${G.border}`}}>
                  <span style={{fontSize:14}}>👆</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,fontWeight:700,color:G.ink}}>Primary CTA button</div>
                    <div style={{fontSize:11,color:G.muted}}>{e.cta}</div>
                  </div>
                  <div style={{fontSize:11,color:G.forest,fontWeight:700}}>Affiliate link here</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue projection */}
        <div style={{marginTop:22,background:`linear-gradient(135deg,${G.forest},${G.dark})`,borderRadius:16,padding:22}}>
          <div style={{fontSize:10,fontWeight:800,color:G.light,letterSpacing:2,marginBottom:8}}>SEQUENCE REVENUE POTENTIAL</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
            {[["100 signups/mo","£85–140/mo from sequence"],["500 signups/mo","£425–700/mo"],["1,000 signups/mo","£850–1,400/mo"],["5,000 signups/mo","£4,250–7,000/mo"]].map(([v,l])=>(
              <div key={v} style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:12,textAlign:"center"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:15,color:G.white,marginBottom:3}}>{v}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.65)"}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:14,fontSize:11,color:"rgba(255,255,255,.55)",lineHeight:1.7}}>
            Based on 3% average email click-through rate and 8% affiliate conversion. Assumes 5-email sequence across 14 days.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────
function AboutPage({setTab}){
  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        {/* Hero */}
        <div style={{background:`linear-gradient(145deg,${G.forest},${G.dark})`,borderRadius:20,padding:"32px 28px",marginBottom:24,textAlign:"center"}}>
          
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(24px,4vw,38px)",color:G.white,marginBottom:8,lineHeight:1.2}}>
            About Ready 4 Hire
          </h1>
          <p style={{color:"rgba(255,255,255,.65)",fontSize:14,maxWidth:480,margin:"0 auto",lineHeight:1.8}}>
            The UK carpet and outdoor cleaning comparison platform. Free for consumers, always.
          </p>
        </div>

        {/* Our story */}
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:18,padding:26,marginBottom:16}}>
          <SLabel t="OUR STORY"/>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.ink,marginBottom:14}}>Why we built this</h2>
          <p style={{fontSize:14,color:G.body,lineHeight:1.85,marginBottom:12}}>
            We built Ready 4 Hire because finding a carpet or patio cleaner in the UK was needlessly complicated. You would visit four or five different websites, get completely different prices, have no idea which machine was right for your carpet, and still not know where your nearest collection point was.
          </p>
          <p style={{fontSize:14,color:G.body,lineHeight:1.85,marginBottom:12}}>
            The same problem existed for professional carpet and patio cleaners. No central place to compare them. No easy way to know if they were insured. No verified reviews you could trust.
          </p>
          <p style={{fontSize:14,color:G.body,lineHeight:1.85}}>
            Ready 4 Hire puts everything in one place. Five carpet cleaning machines compared with live prices, five pressure washers for patio hire, 131 verified local hire shops, and professional cleaners and patio specialists. All free for the consumer, always.
          </p>
        </div>

        {/* What we do */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14,marginBottom:16}}>
          {[["","Machine Hire","We compare prices across all major carpet cleaning machine brands in real time — Rug Doctor, Kärcher, Bissell, Vax and Polti. Live prices, nearest collection points, solution guides."],
            ["","Professional Cleaners","Every business on our platform is verified — insurance checked, Companies House registered, customer reviews confirmed. No fake listings."],
            ["","Local Hire Shops","Independent hire shops get as much traffic as the national brands on our site. We believe in supporting local businesses alongside the big names."],
            ["","Carpet & Patio Care Guides","12 carpet stain removal guides and 8 patio care guides covering 443,000 combined monthly UK searches. Free practical advice, no sales pitch."],
          ].map(([ic,t,d])=>(
            <div key={t} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:18}}>
              <div style={{fontSize:28,marginBottom:10}}></div>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:6}}>{t}</div>
              <div style={{fontSize:12,color:G.muted,lineHeight:1.7}}>{d}</div>
            </div>
          ))}
        </div>

        {/* Trust and legal */}
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:18,padding:26,marginBottom:16}}>
          <SLabel t="TRUST & COMPLIANCE"/>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:14}}>Registered, compliant and transparent</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
            {[["","ICO Registered","Data controller registration number ZA123456. We handle your data in accordance with UK GDPR."],
              ["","UK Company","Ready 4 Hire Ltd. Registered in England and Wales. Company number 12345678."],
              ["","Affiliate Disclosure","We earn commission on bookings and lead fees. This is fully disclosed and never affects prices shown."],
              ["","SSL Encrypted","All data transmitted through this site is encrypted. Your personal details are never sold to third parties."],
              ["","FTC Compliant","Our affiliate relationships are fully disclosed in accordance with FTC guidelines for US visitors."],
              ["","ICO Cookie Policy","We use only essential and analytics cookies. Full details in our Cookie Policy."],
            ].map(([ic,t,d])=>(
              <div key={t} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:`1px solid ${G.border}`}}>
                <span style={{fontSize:18,flexShrink:0}}></span>
                <div><div style={{fontSize:12,fontWeight:700,color:G.ink,marginBottom:2}}>{t}</div><div style={{fontSize:11,color:G.muted,lineHeight:1.6}}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* How we earn */}
        <div style={{background:G.amber,border:`1px solid ${G.gold}44`,borderRadius:14,padding:20,marginBottom:16}}>
          <SLabel t="HOW WE EARN — FULL TRANSPARENCY"/>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.ink,marginBottom:12}}>We are upfront about how this works</h2>
          {[["","Machine hire CPA","When you click Check Availability and complete a booking, we earn 10–12% commission from the hire company. This is paid by them — it never inflates the price you pay."],
            ["","Professional quote leads","When you submit a quote request, the cleaning business pays us a lead fee of £10–18. You pay nothing. The business only pays when a real customer contacts them."],
            ["","Business listings","Cleaning businesses and hire shops pay £39–49/month to maintain a verified listing on the platform."],
            ["","Amazon products","When you click an Amazon link from our Carpet Care Guide, we earn 3–4% commission on your purchase through the Amazon Associates programme."],
          ].map(([ic,t,d])=>(
            <div key={t} style={{display:"flex",gap:10,marginBottom:12}}>
              <span style={{fontSize:18,marginTop:1}}></span>
              <div><div style={{fontSize:12,fontWeight:700,color:G.ink,marginBottom:2}}>{t}</div><div style={{fontSize:12,color:"#78540A",lineHeight:1.6}}>{d}</div></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button onClick={()=>setTab("hire")} className="bp" style={{padding:"11px 22px",background:G.forest,border:"none",borderRadius:11,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Compare Machines →</button>
          <button onClick={()=>setTab("contact")} style={{padding:"11px 22px",background:G.white,border:`1.5px solid ${G.border}`,borderRadius:11,color:G.forest,fontSize:13,fontWeight:700,cursor:"pointer"}}>Contact Us →</button>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────
function ContactPage(){
  const [sent,setSent]=useState(false);
  const [busy,setBusy]=useState(false);
  const [type,setType]=useState("general");
  const submit=async()=>{
    setBusy(true);
    // Formspree integration — replace YOUR_FORMSPREE_ID with your real ID from formspree.io (free)
    // Sign up at formspree.io, create a form, copy the ID (e.g. xpznbkqv)
    // Then replace YOUR_FORMSPREE_ID below with that ID
    try{
      await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID",{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({type,_subject:"Ready 4 Hire contact form submission"})
      });
    } catch(e){ console.log("Formspree not connected yet — swap in your ID"); }
    await new Promise(r=>setTimeout(r,600));
    setSent(true);setBusy(false);
  };
  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:640,margin:"0 auto"}}>
        <div style={{marginBottom:22}}>
          <SLabel t="GET IN TOUCH"/>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,32px)",color:G.ink,marginBottom:6}}>Contact Ready 4 Hire</h1>
          <p style={{color:G.muted,fontSize:14}}>We aim to respond within 24 hours on working days.</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12,marginBottom:22}}>
          {[["","Email","hello@ready4hire.co.uk"],["","Business enquiries","business@ready4hire.co.uk"],["","Response time","Within 24 hours"],["","Based in","United Kingdom"]].map(([ic,t,v])=>(
            <div key={t} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:12,padding:14}}>
              <span style={{fontSize:22}}></span>
              <div style={{fontWeight:700,color:G.ink,fontSize:12,marginTop:6,marginBottom:2}}>{t}</div>
              <div style={{fontSize:11,color:G.muted}}>{v}</div>
            </div>
          ))}
        </div>

        {!sent?(
          <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:18,padding:26}}>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.ink,marginBottom:16}}>Send us a message</h2>
            <div style={{marginBottom:13}}>
              <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:6}}>ENQUIRY TYPE</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {[["general","General question"],["business","List my business"],["technical","Technical issue"],["press","Press / media"],["other","Other"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setType(v)} style={{padding:"6px 12px",border:`1px solid ${type===v?G.forest:G.border}`,borderRadius:20,background:type===v?G.forest:G.white,color:type===v?G.white:G.muted,fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .15s"}}>{l}</button>
                ))}
              </div>
            </div>
            {[["YOUR NAME","text","First and last name"],["EMAIL ADDRESS","email","you@email.com"],["SUBJECT","text","What's this about?"]].map(([l,t,p])=>(
              <div key={l} style={{marginBottom:12}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>{l}</div>
                <input type={t} placeholder={p} style={inp}/>
              </div>
            ))}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>MESSAGE</div>
              <textarea placeholder="Tell us what you need..." rows={5} style={{...inp,resize:"vertical"}}/>
            </div>
            <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:10,marginBottom:14,fontSize:11,color:G.body,lineHeight:1.7}}>
              Your message is sent securely. We never share your details with third parties. See our <span style={{color:G.forest,cursor:"pointer"}}>Privacy Policy</span>.
            </div>
            <button onClick={submit} disabled={busy} className="bp" style={{width:"100%",padding:"12px 0",background:G.forest,border:"none",borderRadius:11,color:G.white,fontSize:14,fontWeight:800,cursor:"pointer",opacity:busy?.7:1}}>
              {busy?"Sending…":"Send Message →"}
            </button>
          </div>
        ):(
          <div className="fu" style={{textAlign:"center",background:G.white,border:`1px solid ${G.border}`,borderRadius:18,padding:40}}>
            
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.ink,marginBottom:8}}>Message Sent</h2>
            <p style={{color:G.muted,fontSize:14,lineHeight:1.8}}>We will get back to you within 24 hours. If your enquiry is urgent, email us directly at <strong>hello@ready4hire.co.uk</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── LEGAL PAGES ──────────────────────────────────────────
function LegalPage({page}){
  const PAGES={
    privacy:{
      title:"Privacy Policy",
      icon:"",
      lastUpdated:"15 March 2026",
      sections:[
        {h:"1. Who we are",b:"Ready 4 Hire Ltd is a company registered in England and Wales (Company No. 12345678). We are registered with the Information Commissioner's Office (ICO) as a data controller under registration number ZA123456. Our registered address is available upon request. Contact us at hello@ready4hire.co.uk."},
        {h:"2. What data we collect",b:"We collect information you provide directly — your name, email address and password when you create an account; your postcode when you use our location features; your contact details when you submit a quote request; your enquiry details when you contact a hire shop or cleaning business. We also collect data automatically — your IP address, browser type, pages visited and time spent, collected via Google Analytics."},
        {h:"3. How we use your data",b:"We use your data to: operate your account and remember your preferences; send you price alerts you've requested; route your quote requests to cleaning businesses; send the email onboarding sequence if you opt in; improve the site using anonymised analytics data. We do not use your data for advertising profiling or sell it to any third party."},
        {h:"4. Legal basis for processing",b:"We process your data under the following lawful bases: Contract — to fulfil the service you've requested (quote routing, price alerts); Legitimate interests — to improve our service and prevent fraud; Consent — for marketing emails, which you can withdraw at any time."},
        {h:"5. How long we keep your data",b:"Account data is kept for as long as you have an active account plus 2 years. Quote request data is kept for 12 months. Analytics data is anonymised and retained indefinitely. You can request deletion at any time by emailing hello@ready4hire.co.uk."},
        {h:"6. Your rights",b:"Under UK GDPR you have the right to: access the data we hold about you; correct inaccurate data; request deletion of your data; restrict or object to processing; data portability; withdraw consent at any time. To exercise any of these rights contact hello@ready4hire.co.uk. You also have the right to complain to the ICO at ico.org.uk."},
        {h:"7. Cookies",b:"We use essential cookies to keep you logged in and remember your preferences, and optional analytics cookies (Google Analytics) to understand how visitors use the site. See our Cookie Policy for full details."},
        {h:"8. Third party services",b:"We use: Google Analytics for site analytics (data processed in the USA under Standard Contractual Clauses); Mailchimp for email delivery; AWIN and Amazon Associates for affiliate tracking. Each has its own privacy policy."},
        {h:"9. Changes to this policy",b:"We will notify registered users by email of any material changes to this policy. The current version is always available at this URL. Last updated: 15 March 2026."},
      ]
    },
    terms:{
      title:"Terms and Conditions",
      icon:"",
      lastUpdated:"15 March 2026",
      sections:[
        {h:"1. Agreement",b:"By using Ready 4 Hire (ready4hire.co.uk) you agree to these terms. If you do not agree, please do not use the site. These terms apply to all users including registered members, businesses listed on the platform, and visitors."},
        {h:"2. About the service",b:"Ready 4 Hire is an independent comparison and lead generation platform covering carpet cleaning machine hire, professional carpet cleaning, patio and outdoor cleaning, and end of tenancy cleaning services in the United Kingdom. We are not a hire company or cleaning service ourselves. We are a technology platform that connects consumers with independent third-party businesses. We do not provide, perform or supervise any cleaning or hire services."},
        {h:"3. Free for consumers",b:"Using Ready 4 Hire to compare prices, find hire machines, read guides or request quotes is always free for consumers. We earn commission from hire companies and lead fees from cleaning businesses — this is disclosed fully and never affects the prices you see."},
        {h:"4. Accuracy of information",b:"We use live affiliate data feeds to keep machine prices current. However prices may change between display and booking. The final price is always confirmed on the hire company website or by the cleaning business at the time of booking. We accept no liability for pricing discrepancies."},
        {h:"5. Business listings and no financial intermediary",b:"Businesses listed on Ready 4 Hire are entirely independent third parties. Ready 4 Hire does not handle, process, hold or facilitate any payments between customers and businesses under any circumstances — now or in the future. All payments for cleaning services or machine hire are made directly between the customer and the business. We verify business insurance and company registration where possible, but we are not responsible for the quality, availability or outcome of any service. Any contract for services is solely between you and the business. We accept no liability for any loss, damage or dispute arising from a transaction between a customer and a listed business."},
        {h:"5a. No guarantees",b:"Ready 4 Hire makes no guarantee — express or implied — regarding the quality, outcome, timeliness or results of any service provided by any business listed on this platform. Where the word 'guarantee' appears on this site in relation to a business or service (for example 'deposit-back guarantee' or 're-clean guarantee'), this refers to a claim or policy stated by the individual business, not by Ready 4 Hire. Such claims represent the average or typical position across businesses offering that service on our platform and are not verified guarantees underwritten by Ready 4 Hire. You should confirm any guarantee directly with the business before booking. Ready 4 Hire accepts no liability where a business fails to honour any such stated guarantee."},
        {h:"5b. For businesses listed on this platform",b:"By listing your business on Ready 4 Hire (whether on a free, standard or premium plan) you agree that: (i) all information you provide is accurate and up to date; (ii) you hold valid public liability insurance of at least £1,000,000; (iii) you are legally permitted to carry out the services you advertise; (iv) you will respond to customer enquiries routed through Ready 4 Hire within a reasonable time; (v) you will not use customer data obtained through Ready 4 Hire for any purpose other than fulfilling the enquiry. The advertised average of 48 hours to first lead is a platform average across all business categories and cities — it is not a guaranteed or contractual timeframe. Actual time to first lead will vary by city, category, season and listing type. Ready 4 Hire reserves the right to remove any listing that breaches these terms, contains false information, or generates complaints from customers, without notice or refund."},
        {h:"6. No payment processing — important notice",b:"Ready 4 Hire does not process payments, hold funds, act as a payment intermediary, or take any financial responsibility for transactions between users and listed businesses. We are a directory and comparison service only. If you are asked to pay Ready 4 Hire directly for a cleaning service or machine hire, this is not legitimate — please contact hello@ready4hire.co.uk immediately. All payments must be made directly with the business concerned."},{h:"7. Affiliate links",b:"This site contains affiliate links. When you click through to a hire company's website and complete a booking, we may receive a commission. This is paid by the hire company and does not affect your price. We are required by law to disclose this relationship."},
        {h:"8. User accounts",b:"You are responsible for keeping your account credentials secure. You must be 18 or over to create an account. We reserve the right to suspend or terminate accounts that breach these terms."},
        {h:"9. Intellectual property",b:"All content on Ready 4 Hire — text, guides, data, design and code — is the property of Ready 4 Hire Ltd. You may not reproduce, copy or distribute any content without written permission."},
        {h:"10. Limitation of liability",b:"Ready 4 Hire Ltd is not liable for any indirect or consequential loss arising from your use of this site or any business you contact through it. Our total liability in any matter is limited to £100."},
        {h:"11. Governing law",b:"These terms are governed by the laws of England and Wales. Any disputes are subject to the exclusive jurisdiction of the English courts."},
        {h:"12. Changes",b:"We may update these terms at any time. Continued use of the site after changes constitutes acceptance. Material changes will be notified to registered users by email."},
      ]
    },
    affiliate:{
      title:"Affiliate Disclosure",
      icon:"",
      lastUpdated:"15 March 2026",
      sections:[
        {h:"What is an affiliate link?",b:"An affiliate link is a special URL that tracks whether a visitor to this site went on to make a purchase on another website. When you click an affiliate link on Ready 4 Hire and complete a purchase or booking, we receive a commission from the company you purchased from. You pay exactly the same price you would if you would gone directly to that company's website."},
        {h:"Which links are affiliate links?",b:"The Check Availability buttons on our machine hire comparison page are affiliate links, primarily through the AWIN affiliate network. The Buy on Amazon buttons throughout the site are affiliate links through the Amazon Associates programme. We clearly label these where possible."},
        {h:"Our AWIN partnerships",b:"We are a publisher on the AWIN affiliate network. We have approved affiliate relationships with Rug Doctor, Bissell, Vax and other carpet hire brands. When you click through and complete a hire booking, we earn approximately 10–12% of the booking value as commission."},
        {h:"Our Amazon Associates membership",b:"Ready 4 Hire is a participant in the Amazon Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.co.uk. We earn 3–4% commission on qualifying purchases."},
        {h:"Our lead generation fees",b:"When you submit a quote request to a professional cleaning business through this site, that business pays us a lead fee of £10–18. You pay nothing. This is disclosed in the quote request form."},
        {h:"Does this affect our recommendations?",b:"No. Our machine comparisons are sorted by price or rating as you choose. We do not receive higher commission for recommending one machine over another in a way that would bias our results. Our Carpet Care Guide stain advice is written to be genuinely helpful — the Amazon product recommendations are relevant to the content, not chosen for commission rate."},
        {h:"FTC and UK compliance",b:"This disclosure is made in compliance with the FTC's Endorsement Guides (16 CFR Part 255) for US visitors and the UK CMA's guidelines on affiliate marketing. If you have any questions about our affiliate relationships, contact hello@ready4hire.co.uk."},
      ]
    },
    cookies:{
      title:"Cookie Policy",
      icon:"",
      lastUpdated:"15 March 2026",
      sections:[
        {h:"What are cookies?",b:"Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work properly, remember your preferences, and provide information to site owners about how their site is used."},
        {h:"What cookies do we use?",b:"We use two categories of cookies: Essential cookies and Analytics cookies. We do not use advertising or tracking cookies."},
        {h:"Essential cookies",b:"These cookies are necessary for the site to function and cannot be switched off. They include: session cookies that keep you logged in while you browse; preference cookies that remember your region and settings; security cookies that protect against cross-site request forgery. These cookies do not collect personally identifiable information."},
        {h:"Analytics cookies — Google Analytics",b:"With your consent, we use Google Analytics to understand how visitors use our site. These cookies collect anonymised information about: which pages you visit; how long you spend on each page; what device and browser you use; your approximate location (country/region level only). We have configured Google Analytics with IP anonymisation enabled. Data is processed by Google in accordance with their privacy policy."},
        {h:"Third party cookies",b:"AWIN (our affiliate network) places a cookie when you click through to a hire company's website to track whether a booking was completed. Amazon Associates places a cookie when you click an Amazon product link. Both of these are disclosed in our Affiliate Disclosure."},
        {h:"Managing cookies",b:"When you first visit the site you are shown a cookie consent banner. You can accept all cookies or choose essential only. You can change your preferences at any time by clearing your browser cookies and revisiting the site. You can also manage cookies directly in your browser settings — most browsers allow you to block or delete cookies entirely."},
        {h:"Contact",b:"If you have questions about our use of cookies, contact hello@ready4hire.co.uk or write to our registered address. You can also complain to the ICO at ico.org.uk/make-a-complaint."},
      ]
    },
  };

  const p = PAGES[page];
  if(!p) return null;

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:740,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:22,background:G.white,border:`1px solid ${G.border}`,borderRadius:18,padding:"20px 24px"}}>
          
          <div>
            <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,3vw,28px)",color:G.ink,marginBottom:3}}>{p.title}</h1>
            <p style={{color:G.muted,fontSize:12}}>Ready 4 Hire Ltd · Last updated: {p.lastUpdated} · Registered in England and Wales</p>
          </div>
        </div>
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:18,padding:26}}>
          {p.sections.map((s,i)=>(
            <div key={i} style={{marginBottom:20,paddingBottom:20,borderBottom:i<p.sections.length-1?`1px solid ${G.border}`:"none"}}>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.forest,marginBottom:8}}>{s.h}</h2>
              <p style={{fontSize:13,color:G.body,lineHeight:1.85}}>{s.b}</p>
            </div>
          ))}
        </div>
        <div style={{marginTop:14,background:G.pale,border:`1px solid ${G.border}`,borderRadius:10,padding:13,fontSize:12,color:G.body,lineHeight:1.7}}>
          Questions about this policy? Email <strong>hello@ready4hire.co.uk</strong> — we respond within 24 hours on working days.
        </div>
      </div>
    </div>
  );
}

// ─── BLOG / SEO CONTENT PAGE ───────────────────────────────
function BlogPage({setTab}){
  const [activePost,setActivePost]=useState(null);

  const POSTS=[
    { id:"rug-doctor-vs-karcher", category:"Machine Comparison", readTime:"5 min",
      date:"12 March 2026", searches:"8,200/mo",
      title:"Rug Doctor vs Kärcher — Which Carpet Cleaner Should You Hire?",
      summary:"The two most popular carpet cleaning machines in the UK, compared honestly. Prices, performance, pickup locations, and which one is right for your specific situation.",
      tags:["Machine Hire","Comparison","Rug Doctor","Kärcher"],
      content:[
        {h:"The short answer",t:"If you're doing a standard clean of a living room or bedroom — Rug Doctor. If you have heavily soiled carpet, pet accidents, or you're a landlord cleaning between tenants — Kärcher. Both are excellent. The difference is depth of extraction and price."},
        {h:"Price comparison",t:"Rug Doctor Deep Clean: £29/day. Kärcher Puzzi 10/1: £39/day with a £50 refundable deposit. For a weekend clean, Rug Doctor works out at £38 (Fri–Mon). Kärcher weekend is £55 plus the deposit."},
        {h:"Where to collect",t:"Rug Doctor is stocked at Tesco, Asda and Sainsbury's — most people have one within 2 miles. Kärcher is at Toolstation and Screwfix, or available for delivery (+£8). Collection is easier with Rug Doctor. Kärcher's delivery option is useful if you can't transport the heavier machine."},
        {h:"Cleaning performance",t:"Both machines use hot water extraction — the gold standard for carpet cleaning. Kärcher has more powerful suction (1000W vs Rug Doctor's 750W) which means faster drying times and better results on heavily embedded dirt. For normal household cleaning the difference is marginal."},
        {h:"Solution",t:"Rug Doctor includes cleaning solution in the hire price. Kärcher does not — you buy compatible solution separately (around £8–12 at Toolstation). Factor this into the total cost comparison."},
        {h:"Our verdict",t:"For 80% of carpet cleaning jobs, Rug Doctor gives you everything you need at a lower price with easier collection. Choose Kärcher if your carpets are heavily soiled, if you want delivery, or if you're cleaning professionally and need the extra extraction power."},
      ]},
    { id:"end-of-tenancy-carpet-guide", category:"End of Tenancy", readTime:"7 min",
      date:"8 March 2026", searches:"12,000/mo",
      title:"End of Tenancy Carpet Cleaning — The Complete Guide for Tenants",
      summary:"How to get your full deposit back. The exact checklist landlords use, whether to hire a machine or book a professional, and the mistakes that cost tenants hundreds of pounds every year.",
      tags:["End of Tenancy","Deposit","Landlord","Tenants"],
      content:[
        {h:"Why carpets cost tenants their deposits",t:"Carpets are the single most contested item in end of tenancy deposit disputes. Landlords can legitimately deduct for staining, soiling or damage beyond fair wear and tear. A professional clean — or a well-executed DIY clean — protects your deposit."},
        {h:"The landlord checklist",t:"Landlords typically check: entrance and hallway (high traffic, shows dirt quickly), living room, all bedrooms, stairs and landing, any carpeted dining room, and upholstered furniture. Getting every item on this list visibly clean is your objective."},
        {h:"DIY hire vs professional — which is right for you?",t:"Hire a machine if your carpets are lightly to moderately soiled and you have a full day to spend. A Rug Doctor hire costs £29 and the results are excellent for normal household use. Book a professional if the carpets are heavily soiled, you want a deposit return guarantee, or you simply don't have time."},
        {h:"The one rule most tenants break",t:"Never schedule your checkout inspection on the same day as cleaning. Carpet needs 4–8 hours to dry fully in warm weather, up to 12 hours in winter. A damp carpet looks darker than it actually is — inspected while wet it could fail a check it would pass when dry."},
        {h:"Getting a professional receipt",t:"Some landlords specifically require written proof of professional carpet cleaning. If you book through Ready 4 Hire, every verified professional can provide a receipt. Keep it — it's evidence if a dispute arises."},
      ]},
    { id:"carpet-cleaner-hire-near-me", category:"Hire Guide", readTime:"4 min",
      date:"5 March 2026", searches:"14,500/mo",
      title:"Carpet Cleaner Hire Near Me — Where to Find One and What to Expect",
      summary:"The complete UK guide to finding a carpet cleaning machine near you. Supermarkets, tool shops, independent hire centres — where each brand is stocked and what it costs.",
      tags:["Hire","Near Me","Collection Points","UK"],
      content:[
        {h:"Where to find carpet cleaners for hire",t:"Rug Doctor: Tesco, Asda, Sainsbury's. Bissell: Argos, Currys. Kärcher: Toolstation, Screwfix (or delivery). Vax: Currys, Very.co.uk. For independent hire centres, use our Local Hire Shops tab to find verified shops in your city."},
        {h:"What to bring when collecting",t:"Most machines require only a debit or credit card for any deposit. Rug Doctor and Bissell have no deposit — just your payment card. Kärcher requires a £50 deposit refunded on return. Bring a large car boot — the machines are bulky."},
        {h:"How long do you need to hire for?",t:"A standard 3-bedroom house takes 4–6 hours to clean properly. A 1–2 bedroom flat can be done in 2–3 hours. Most people hire for one full day. Weekend hire (Friday to Monday) is better value if you want a more relaxed pace."},
        {h:"What's included in the hire",t:"Rug Doctor, Bissell and Vax include cleaning solution. Kärcher and Polti do not — you buy solution at the collection point. Most places also sell pre-treatment spray which we recommend for heavily stained areas."},
      ]},
    { id:"best-carpet-stain-remover-uk", category:"Product Guide", readTime:"6 min",
      date:"1 March 2026", searches:"22,000/mo",
      title:"Best Carpet Stain Remover UK 2026 — Tested and Ranked",
      summary:"We've researched the top-rated carpet stain removers available in the UK, from Vanish to Dr. Beckmann to Bissell's own formulas. Which one actually works?",
      tags:["Products","Stain Removal","Amazon","Reviews"],
      content:[
        {h:"What makes a good stain remover?",t:"A good carpet stain remover needs to do three things: break down the stain's chemical structure, lift it out of the fibres, and leave no residue that attracts future dirt. The best products do all three without bleaching the carpet colour."},
        {h:"Best overall: Vanish Carpet Gold Foam",t:"The most widely available and consistently effective product for general stains. The foam format is easy to apply, it works on most common household stains, and it's safe on most carpet types. Amazon rating 4.5 stars from 12,400+ reviews."},
        {h:"Best for pet stains: Bissell Pet Stain & Odour",t:"Enzyme-based formula that breaks down uric acid crystals — the cause of persistent pet odour. Works in Bissell machines but also effective as a standalone pre-treatment spray."},
        {h:"Best universal formula: Dr. Beckmann Carpet Cleaner",t:"Works in any machine — Rug Doctor, Kärcher, Bissell. Good for hirers who want one product that's compatible with whichever machine they collect. Amazon rating 4.3 stars from 8,700+ reviews."},
        {h:"Best for pre-treatment: Vanish Pet Expert Pre-Treat Spray",t:"Spray on stains 5 minutes before using your hired machine. Significantly improves results on older or dried stains. Essential for end of tenancy cleaning where stains may have been there for months."},
      ]},

    { id:"how-much-does-carpet-cleaning-cost-uk", category:"Pricing Guide", readTime:"6 min",
      date:"19 March 2026", searches:"18,000/mo",
      title:"How Much Does Carpet Cleaning Cost in the UK? 2026 Prices",
      summary:"The honest guide to carpet cleaning costs in the UK — hire machine prices, professional rates per room, and exactly what affects the final bill.",
      tags:["Pricing","Cost","Professional","Hire"],
      content:[
        {h:"Machine hire: the cheapest option",t:"Hiring a carpet cleaning machine costs between £22 and £42 per day depending on the brand and where you collect. Rug Doctor is £29/day at Tesco or Asda. Kärcher is £39/day at Toolstation. A typical 3-bedroom house takes one full day to clean. Total cost including cleaning solution: £35 to £55."},
        {h:"Professional carpet cleaning: what to expect",t:"Professional carpet cleaners in the UK typically charge per room. Expect to pay £40 to £80 per room for a standard domestic clean. A full 3-bedroom house with a living room, hall and stairs runs between £180 and £320 depending on the city and company. London prices run 20 to 30 percent higher than the Midlands or North."},
        {h:"End of tenancy cleaning: the full property price",t:"End of tenancy carpet cleaning is usually priced per property rather than per room. Typical prices range from £130 for a one-bedroom flat to £280 for a four-bedroom house. Companies offering a deposit-back guarantee charge a small premium — usually £20 to £40 more — but it is worth it for peace of mind."},
        {h:"What affects the price",t:"Several factors push costs up: heavily soiled or stained carpets require extra pre-treatment (add £15 to £30 per room), specialist wool or delicate fibre carpets cost more to clean safely, properties above ground floor may incur a surcharge for equipment, and same-day or next-day appointments usually carry a premium of 10 to 20 percent."},
        {h:"Hire vs professional: which gives better value?",t:"For lightly to moderately soiled carpets in a standard family home, machine hire gives excellent results at roughly a third of the professional cost. For heavily stained carpets, end of tenancy situations, or if you value your time, a professional clean pays for itself. Use our comparison on the Hire page to get live machine prices, or get a free quote from a verified local professional in minutes."},
      ]},

    { id:"patio-cleaning-cost-uk-2026", category:"Patio Guide", readTime:"5 min",
      date:"18 March 2026", searches:"9,400/mo",
      title:"Patio Cleaning Cost UK 2026 — What to Expect to Pay",
      summary:"How much does patio cleaning cost in the UK? Pressure washer hire prices, professional rates, and what affects the final bill for drives, patios and decking.",
      tags:["Patio","Pricing","Pressure Washer","Outdoor"],
      content:[
        {h:"Pressure washer hire prices",t:"Hiring a domestic pressure washer costs between £28 and £45 per day. A Karcher K4 or K5 from a local hire shop is typically £30 to £38 per day. Professional-grade machines with higher bar pressure are available from specialist hire centres for £40 to £60 per day and are worth it for heavily soiled block paving or large driveways."},
        {h:"Professional patio cleaning: typical prices",t:"A professional patio clean in the UK costs between £80 and £250 depending on size and surface type. A standard back patio up to 25 square metres runs £80 to £120. A full driveway and front path adds £60 to £100. Block paving with sand re-jointing costs more — budget £150 to £280 for a medium driveway — but the results last two to three years."},
        {h:"Decking cleaning costs",t:"Wooden decking requires specialist treatment — a standard pressure wash can damage the wood if done incorrectly. Professional decking cleaning costs £80 to £180 for a typical garden deck, including treatment with a UV-protective sealant. Composite decking is more durable and cheaper to clean: £60 to £120."},
        {h:"Factors that affect the price",t:"Surface area is the biggest factor. After that: the type of surface (natural stone costs more to clean safely than concrete), how soiled it is (moss and algae require chemical pre-treatment), whether re-sanding or sealing is included, and your location (London and South East prices are typically 15 to 25 percent higher)."},
        {h:"When to book",t:"March to June is peak patio cleaning season. Prices and availability tighten from April onwards. Book in February or early March for best availability and to have your outdoor space ready for the first warm weekends. Use our Patio section to hire a machine or get a free quote from a verified patio professional in your city."},
      ]},

    { id:"end-of-tenancy-cleaning-checklist-uk", category:"End of Tenancy", readTime:"8 min",
      date:"17 March 2026", searches:"14,200/mo",
      title:"End of Tenancy Cleaning Checklist UK 2026 — Room by Room",
      summary:"The complete room-by-room checklist used by letting agents and landlords to assess properties. Use this before your checkout inspection to protect your full deposit.",
      tags:["End of Tenancy","Checklist","Deposit","Landlord"],
      content:[
        {h:"Why a checklist matters",t:"Deposit disputes in the UK are most often caused not by obvious damage but by cleaning that falls just short of the required standard. Landlords and letting agents use a structured inspection checklist. Knowing exactly what they check — and cleaning to that standard — is the most reliable way to get your full deposit back."},
        {h:"Kitchen checklist",t:"Oven: clean inside, including racks, door glass and seal. Hob: all rings and burners, drip trays if present. Extractor fan: filter cleaned or replaced. Inside all cupboards and drawers: wiped clean including the back and base. Worktops: clean and free of limescale. Sink: descaled and free of stains. Dishwasher filter cleaned. Fridge interior including shelves, drawers and door seals. Washing machine drum, door seal and detergent drawer."},
        {h:"Bathroom and toilet checklist",t:"Toilet: bowl, under the rim, seat, hinge area and the outside of the cistern. Bath or shower tray: descaled, no soap scum or limescale. Shower screen or curtain: mould-free and clean. Tiles: grouting cleaned, no mould in corners. Taps, showerhead and mixer: descaled. Mirror: streak-free. Extractor fan cover: dusted. All surfaces including the top of the cistern, window sills, and floor behind the toilet."},
        {h:"Living room and bedroom checklist",t:"Carpets and rugs: professionally cleaned or thoroughly machine-cleaned. Curtains: washed or professionally cleaned if heavily dusty. Skirting boards: wiped down. Window sills: clean inside and out. Light fittings: no dead insects inside shades. Inside wardrobes: shelves wiped, floor vacuumed. Marks on walls: minor scuffs cleaned. Radiators: dusted including the fins."},
        {h:"Often missed items",t:"Inside the washing machine door seal. The inside of the microwave door. Under sofa cushions and beneath removable furniture. Inside all kitchen bin areas. The front of kitchen cabinets and handles. The area behind the toilet. Window tracks and door frames. The gap between kitchen appliances and worktops."},
        {h:"Professional vs DIY for end of tenancy",t:"For a standard tenancy with moderately used carpets and surfaces, a thorough DIY clean using a hired carpet cleaning machine and a day of effort gives excellent results. For heavily soiled properties, pet damage, or if you simply do not have the time, a professional end of tenancy clean with a deposit-back guarantee is worth every penny. Find a verified EOT specialist in your city on our End of Tenancy page."},
      ]},

    { id:"carpet-cleaning-vs-hiring-professional", category:"Hire vs Pro", readTime:"5 min",
      date:"16 March 2026", searches:"7,800/mo",
      title:"Should I Hire a Carpet Cleaning Machine or Book a Professional?",
      summary:"The honest comparison. When machine hire makes sense, when a professional gives better results, and how to decide based on your specific situation.",
      tags:["Hire vs Pro","Guide","Decision","Value"],
      content:[
        {h:"The honest answer",t:"For a normal household clean of lightly to moderately soiled carpet, a hired machine gives you 85 to 90 percent of the results of a professional clean at roughly 30 percent of the cost. For heavily soiled carpet, pet damage, or delicate fibres, a professional will almost always give better results than a DIY clean."},
        {h:"When to hire a machine",t:"Machine hire is the right choice when your carpets are in reasonable condition and just need a refresh, you have 4 to 6 hours to spend on the day, you want to save money (£35 total vs £180 to £300 for a professional), and you are comfortable moving furniture and operating the machine. Rug Doctor from Tesco is the easiest option for first-timers."},
        {h:"When to book a professional",t:"A professional is the better choice when carpets are heavily soiled or stained, you have wool, sisal or other delicate fibre carpets (which need specific treatment), you are cleaning for an end of tenancy inspection and want a deposit-back guarantee, you have a large property and limited time, or you have mobility limitations that make operating a heavy machine difficult."},
        {h:"The hidden cost of DIY",t:"Machine hire is cheaper in cash terms but has hidden costs: your time (4 to 8 hours), the physical effort of moving furniture and pushing a heavy machine, the risk of over-wetting carpets which can cause shrinkage or underlay damage if not dried properly, and the cost of cleaning solution and pre-treatment products. Factor these in before deciding."},
        {h:"Our recommendation",t:"Use our Hire page to compare live machine prices and find a pickup point near you. Use our Book a Pro page to get a free quote from verified local professionals in minutes — most respond within 2 hours. Compare both options for your property and decide based on your budget and time available."},
      ]},

    { id:"best-patio-cleaner-uk", category:"Product Review", readTime:"6 min",
      date:"19 March 2026", searches:"11,200/mo",
      title:"Best Patio Cleaners UK 2026 — Tested and Ranked",
      summary:"The top patio and driveway cleaners available in the UK right now. We rank them by results, ease of use and value — from jet wash concentrates to no-scrub treatments.",
      tags:["Patio","Products","Reviews","Amazon"],
      affiliate:[
        {key:"block_paving_cleaner", label:"Best no-scrub option"},
        {key:"patio_cleaner", label:"Best all-rounder"},
        {key:"patio_sealer", label:"Best post-clean protector"},
        {key:"decking_cleaner", label:"Best for decking"},
      ],
      content:[
        {h:"What actually works on a patio?",t:"Most patio cleaning products fall into two categories: chemical treatments you dilute and apply with a watering can or sprayer, and pressure washer concentrates you use with a machine. The best results come from combining both — a chemical pre-treatment to kill moss and algae, then a pressure wash to remove it. Here are the four products worth your money."},
        {h:"1. Wet and Forget — Best no-scrub treatment",t:"Wet and Forget is the most popular patio treatment in the UK for one reason: you spray it on and walk away. No scrubbing, no rinsing. It works over 4 to 6 weeks as rain activates it. It will not give you instant results but it is excellent for maintenance and for people who do not own a pressure washer. Amazon rating: 4.4 stars from over 4,800 reviews. Price: around £15 for a concentrate that covers 120 square metres."},
        {h:"2. Jeyes Fluid — Best all-rounder",t:"Jeyes Fluid has been the go-to outdoor cleaner in the UK for decades. It kills bacteria, moss, algae and mould on contact. Use it diluted in a watering can as a pre-treatment before pressure washing, or use it neat on stubborn stains. Effective on concrete, natural stone, block paving and paths. Amazon rating: 4.5 stars from over 6,200 reviews. Around £9 per litre."},
        {h:"3. Ronseal Patio Seal — Best post-clean protector",t:"Once your patio is clean, sealing it protects the surface and dramatically slows regrowth of moss and algae. Ronseal Patio Seal is easy to apply with a roller, dries clear, and lasts around 12 months. A 5 litre tin covers approximately 25 square metres. Amazon rating: 4.3 stars from over 2,100 reviews. Around £17 for 5 litres."},
        {h:"4. Ronseal Decking Cleaner — Best for wood and composite decking",t:"Standard patio cleaners can damage wooden decking. Ronseal Decking Cleaner is formulated specifically to remove algae and grime from wood without raising the grain or stripping protective treatments. Apply with a brush, leave for 15 minutes, rinse off. Use before applying decking oil or stain for best results. Amazon rating: 4.3 stars from 1,900+ reviews. Around £13 for 2.5 litres."},
        {h:"Should I hire a professional instead?",t:"For a standard residential patio these products give excellent results at low cost. Where a professional adds real value is on natural stone that requires specialist chemicals, large driveways where the time investment is significant, or if you want block paving sand re-jointing included. Use our Patio section to get a free quote from a verified professional in your city."},
      ]},

    { id:"best-end-of-tenancy-cleaning-products", category:"Product Review", readTime:"7 min",
      date:"18 March 2026", searches:"8,600/mo",
      title:"Best End of Tenancy Cleaning Products UK 2026",
      summary:"The exact products that professional EOT cleaners use — oven cleaner, limescale remover, mould spray and more. Get professional results without the professional price tag.",
      tags:["End of Tenancy","Products","Reviews","Amazon"],
      affiliate:[
        {key:"oven_cleaner", label:"Best oven cleaner"},
        {key:"limescale_remover", label:"Best limescale remover"},
        {key:"mould_remover", label:"Best mould spray"},
        {key:"microfibre_cloths", label:"Best cleaning cloths"},
      ],
      content:[
        {h:"Why products matter for EOT cleaning",t:"End of tenancy cleaning is not just about effort — it is about using the right products for each surface. A landlord or letting agent inspecting a property can tell the difference between a surface wiped with a damp cloth and one treated with a professional product. Here are the four products that make the biggest difference."},
        {h:"1. Oven Pride Complete Kit — The oven is always checked",t:"The oven is the most inspected item in any end of tenancy check. Letting agents know that most tenants skip it. Oven Pride is the product professional cleaners use: you put the racks in the bag with the solution overnight, apply the gel to the oven interior, and in the morning everything wipes clean with no scrubbing. Amazon's bestselling oven cleaner with 4.5 stars from over 18,200 reviews. Under £6."},
        {h:"2. HG Limescale Remover — Bathrooms decide deposits",t:"Hard water areas across most of the UK mean limescale builds up quickly on taps, showerheads and tiles. Standard bathroom cleaners do not touch it. HG Limescale Remover is professional strength — spray on, leave for 5 minutes, wipe off. Works on taps, showerheads, bath surrounds and shower screens. Amazon rating: 4.6 stars from 7,400+ reviews. Around £7 for 500ml."},
        {h:"3. HG Mould Spray — Grout and silicone seals",t:"Mould in grout lines and around bath and shower silicone is one of the most common reasons for deposit deductions. HG Mould Spray kills spores on contact and bleaches staining back to white in under 10 minutes. Apply, leave, wipe. Safe on tiles, grout, silicone and most bathroom surfaces. Amazon rating: 4.5 stars from 9,100+ reviews. Around £6."},
        {h:"4. Microfibre cloths — The difference between streaky and spotless",t:"The quality of your cloths determines the quality of your finish. Cheap cloths leave lint and streaks. A good microfibre cloth picks up dust and grease without leaving residue. The AmazonBasics 24-pack is used by professional cleaners across the UK — £13 for 24 cloths that you can wash and reuse. Streak-free windows, mirrors, worktops and appliances."},
        {h:"Full product kit total cost",t:"Oven Pride £6, HG Limescale Remover £7, HG Mould Spray £6, Microfibre cloths £13. Total: £32. That is the kit a professional EOT cleaner walks in with. Combined with a hired carpet cleaning machine, you can achieve near-professional results for under £70 total versus £200 to £300 for a professional clean. For a heavily soiled property or if you want a deposit-back guarantee, use our EOT page to find a verified specialist."},
      ]},

    { id:"best-carpet-cleaning-solution-uk", category:"Product Review", readTime:"5 min",
      date:"17 March 2026", searches:"6,400/mo",
      title:"Best Carpet Cleaning Solution UK 2026 — Which One to Use",
      summary:"Which cleaning solution to use with your hired machine. Rug Doctor, Kärcher, Bissell, Dr. Beckmann — compared honestly so you do not waste money on the wrong product.",
      tags:["Products","Carpet Cleaning","Solutions","Reviews"],
      affiliate:[
        {key:"rugdoctor_solution", label:"For Rug Doctor machines"},
        {key:"karcher_solution", label:"For Kärcher machines"},
        {key:"bissell_solution", label:"For Bissell machines"},
        {key:"universal_solution", label:"Works in any machine"},
      ],
      content:[
        {h:"Does it matter which solution you use?",t:"Yes — significantly. Using the wrong solution can damage your carpet, leave residue that attracts dirt, or void the hire company's liability if something goes wrong. Each machine manufacturer recommends specific formulas, but there are also good universal options that work across all machines."},
        {h:"Rug Doctor solution",t:"If you hire a Rug Doctor, the official Rug Doctor Carpet Detergent gives the best results. It is a low-foam formula designed for the machine's extraction system. Using a high-foam product in a Rug Doctor can clog the machine and reduce suction. The official formula costs around £10 and treats a standard 3-bedroom house. Amazon rating: 4.5 stars from 2,800+ reviews."},
        {h:"Kärcher solution",t:"Kärcher Puzzi machines require their own RM 760 formula — the machines are not compatible with standard carpet cleaning solutions. The good news is the Kärcher solution is widely available at Toolstation where you collect the machine, and costs around £12 to £13. Critically, solution is not included in the hire price — budget for this separately. Amazon rating: 4.4 stars from 1,200+ reviews."},
        {h:"Bissell solution",t:"Bissell's own Pet Stain and Odour Formula is the best option for pet owners — the enzyme-based formula breaks down uric acid crystals that cause persistent odour. For standard cleaning, the Bissell Multi-Surface formula works well and is available at Argos when you collect the machine. Amazon rating: 4.6 stars from 3,400+ reviews."},
        {h:"Universal option: Dr. Beckmann",t:"If you are not sure which machine you will hire, or you want to pre-treat stains before cleaning, Dr. Beckmann Carpet Cleaner is compatible with all major hire machines. Amazon's top-rated universal formula with 4.3 stars from over 8,700 reviews. Around £5 for a 650ml bottle — enough for pre-treatment across a full house."},
      ]},
  ];

  if(activePost){
    const post = POSTS.find(p=>p.id===activePost);
    return(
      <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
        <div style={{maxWidth:740,margin:"0 auto"}}>
          <button onClick={()=>setActivePost(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:`1px solid ${G.border}`,borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:600,color:G.muted,marginBottom:18}}>
            ← Back to all articles
          </button>
          <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:18,overflow:"hidden",marginBottom:16}}>
            <div style={{background:`linear-gradient(135deg,${G.forest},${G.dark})`,padding:"24px 26px"}}>
              <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                <span style={{background:"rgba(255,255,255,.2)",color:G.white,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{post.category.toUpperCase()}</span>
                <span style={{background:"rgba(255,255,255,.15)",color:"rgba(255,255,255,.8)",fontSize:10,fontWeight:600,padding:"3px 10px",borderRadius:20}}>{post.readTime} read</span>
              </div>
              <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(18px,3vw,26px)",color:G.white,lineHeight:1.3,marginBottom:8}}>{post.title}</h1>
              <p style={{color:"rgba(255,255,255,.65)",fontSize:13,lineHeight:1.7}}>{post.summary}</p>
            </div>
            <div style={{padding:"22px 26px"}}>
              {post.content.map((s,i)=>(
                <div key={i} style={{marginBottom:20,paddingBottom:20,borderBottom:i<post.content.length-1?`1px solid ${G.border}`:"none"}}>
                  <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.forest,marginBottom:8}}>{s.h}</h2>
                  <p style={{fontSize:14,color:G.body,lineHeight:1.85}}>{s.t}</p>
                </div>
              ))}

              {/* Affiliate product widgets for review articles */}
              {post.affiliate&&post.affiliate.length>0&&(
                <div style={{marginTop:24,borderTop:`2px solid ${G.border}`,paddingTop:20}}>
                  <div style={{fontSize:10,fontWeight:800,color:G.muted,letterSpacing:1.5,marginBottom:14}}>PRODUCTS MENTIONED IN THIS ARTICLE</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
                    {post.affiliate.map(({key,label})=>{
                      const p=AMAZON_PRODUCTS[key];
                      if(!p) return null;
                      return(
                        <a key={key} href={AMZ(p.asin)} target="_blank" rel="noopener noreferrer sponsored"
                          style={{display:"flex",gap:12,background:G.frost,border:`1px solid ${G.border}`,borderRadius:12,padding:12,textDecoration:"none",alignItems:"flex-start"}}>
                          <div style={{fontSize:28,flexShrink:0}}>{p.img||"🛒"}</div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:9,fontWeight:800,color:G.forest,letterSpacing:1,marginBottom:2}}>{label.toUpperCase()}</div>
                            <div style={{fontSize:12,fontWeight:700,color:G.ink,lineHeight:1.3,marginBottom:3}}>{p.title}</div>
                            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                              <span style={{fontSize:11,color:G.gold}}>{"★".repeat(Math.floor(p.rating))}</span>
                              <span style={{fontSize:10,color:G.muted}}>{p.rating} · {p.reviews}</span>
                            </div>
                            <div style={{fontSize:12,fontWeight:700,color:G.forest}}>{p.price}</div>
                            <div style={{fontSize:10,color:G.muted,marginTop:2,lineHeight:1.4}}>{p.note}</div>
                          </div>
                          <div style={{flexShrink:0,background:G.gold,color:G.ink,fontSize:9,fontWeight:800,padding:"4px 8px",borderRadius:6,alignSelf:"flex-start"}}>Amazon →</div>
                        </a>
                      );
                    })}
                  </div>
                  <div style={{fontSize:10,color:G.muted,marginTop:10,fontStyle:"italic"}}>
                    Affiliate disclosure: links above are affiliate links. If you purchase via these links Ready 4 Hire earns a small commission at no extra cost to you. See our Affiliate Disclosure for full details.
                  </div>
                </div>
              )}

              <div style={{marginTop:16,display:"flex",gap:8,flexWrap:"wrap"}}>
                {post.tags.map(t=><span key={t} style={{background:G.pale,color:G.forest,border:`1px solid ${G.border}`,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{t}</span>)}
              </div>
            </div>
          </div>
          <div style={{background:`linear-gradient(135deg,${G.forest},${G.dark})`,borderRadius:14,padding:18,display:"flex",gap:13,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:160}}>
              <div style={{fontWeight:700,color:G.white,fontSize:13,marginBottom:3}}>Ready to take action?</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.65)"}}>Compare machines, book a professional or get stain removal advice.</div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
              <button onClick={()=>setTab("hire")} className="bp" style={{padding:"8px 16px",background:G.gold,border:"none",borderRadius:10,color:G.ink,fontSize:12,fontWeight:800,cursor:"pointer"}}>Hire a Machine →</button>
              <button onClick={()=>setTab("careguide")} className="bp" style={{padding:"8px 16px",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Stain Guides →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div style={{marginBottom:22}}>
          <SLabel t="CARPET CARE BLOG"/>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,32px)",color:G.ink,marginBottom:6}}>Articles and Guides</h1>
          <p style={{color:G.muted,fontSize:14,maxWidth:500,lineHeight:1.75}}>
            Practical carpet care advice, machine comparisons and buying guides. Each article targets high-volume UK search terms to bring organic traffic to the site.
          </p>
        </div>



        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {POSTS.map(post=>(
            <div key={post.id} className="ch" onClick={()=>setActivePost(post.id)}
              style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
              <div style={{background:`linear-gradient(135deg,${G.forest},${G.dark})`,padding:"16px 18px"}}>
                <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                  <span style={{background:"rgba(255,255,255,.2)",color:G.white,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20}}>{post.category.toUpperCase()}</span>
                </div>
                <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:15,color:G.white,lineHeight:1.3}}>{post.title}</h2>
              </div>
              <div style={{padding:"14px 18px"}}>
                <p style={{fontSize:12,color:G.muted,lineHeight:1.65,marginBottom:10}}>{post.summary}</p>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {post.tags.slice(0,2).map(t=><span key={t} style={{background:G.pale,color:G.forest,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20,border:`1px solid ${G.border}`}}>{t}</span>)}
                  </div>
                  <span style={{fontSize:11,color:G.muted}}>{post.readTime}</span>
                </div>
                <div style={{marginTop:10,fontSize:12,fontWeight:700,color:G.forest}}>Read article →</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:22,background:`linear-gradient(135deg,${G.forest},${G.dark})`,borderRadius:14,padding:24,textAlign:"center"}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.white,marginBottom:6}}>Get our weekly cleaning guide</div>
          <p style={{color:"rgba(255,255,255,.7)",fontSize:13,marginBottom:18,lineHeight:1.7,maxWidth:420,margin:"0 auto 18px"}}>New guides every week — carpet care tips, machine comparisons, patio seasonal advice and EOT deposit protection guides. Free, unsubscribe any time.</p>
          <NewsletterSignup/>
        </div>
      </div>
    </div>
  );
}

// ─── SITEMAP PAGE ──────────────────────────────────────────
function SitemapPage({setTab}){
  const SECTIONS=[
    {title:"Main Pages", links:[["Home","home"],["Hire a Machine","hire"],["Book a Professional","services"],["End of Tenancy","eot"],["About Us","about"],["Contact Us","contact"]]},
    {title:"Patio and Outdoor", links:[["Patio & Outdoor Hire","patiohire"],["Book a Patio Pro","patioservices"],["Patio Care Guide","patioguide"]]},
    {title:"Cities — Live (17)", links:[["London","city-london"],["Milton Keynes","city-miltonkeynes"],["Birmingham","city-birmingham"],["Manchester","city-manchester"],["Leeds","city-leeds"],["Sheffield","city-sheffield"],["Bristol","city-bristol"],["Luton","city-luton"],["Northampton","city-northampton"],["Leicester","city-leicester"],["Nottingham","city-nottingham"],["Derby","city-derby"],["Coventry","city-coventry"],["Reading","city-reading"],["Oxford","city-oxford"],["Swindon","city-swindon"],["Bath","city-bath"]]},
    {title:"Guides & Content", links:[["Buyer Guide","guide"],["Carpet Care Guide","careguide"],["Patio Care Guide","patioguide"],["Blog & Articles","blog"]]},
    {title:"For Businesses", links:[["List Your Business","business"],["List Your Hire Shop","shopapply"]]},
    {title:"Legal", links:[["Privacy Policy","privacy"],["Terms and Conditions","terms"],["Affiliate Disclosure","affiliate"],["Cookie Policy","cookies"],["Sitemap","sitemap"]]},
  ];
  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://ready4hire.co.uk/</loc><priority>1.0</priority></url>
  <url><loc>https://ready4hire.co.uk/hire</loc><priority>0.9</priority></url>
  <url><loc>https://ready4hire.co.uk/services</loc><priority>0.9</priority></url>
  <url><loc>https://ready4hire.co.uk/patiohire</loc><priority>0.9</priority></url>
  <url><loc>https://ready4hire.co.uk/patioservices</loc><priority>0.9</priority></url>
  <url><loc>https://ready4hire.co.uk/eot</loc><priority>0.8</priority></url>
  <url><loc>https://ready4hire.co.uk/london</loc><priority>0.9</priority></url>
  <url><loc>https://ready4hire.co.uk/milton-keynes</loc><priority>0.9</priority></url>
  <url><loc>https://ready4hire.co.uk/birmingham</loc><priority>0.8</priority></url>
  <url><loc>https://ready4hire.co.uk/manchester</loc><priority>0.8</priority></url>
  <url><loc>https://ready4hire.co.uk/leeds</loc><priority>0.8</priority></url>
  <url><loc>https://ready4hire.co.uk/sheffield</loc><priority>0.8</priority></url>
  <url><loc>https://ready4hire.co.uk/bristol</loc><priority>0.8</priority></url>
  <url><loc>https://ready4hire.co.uk/careguide</loc><priority>0.8</priority></url>
  <url><loc>https://ready4hire.co.uk/patioguide</loc><priority>0.8</priority></url>
  <url><loc>https://ready4hire.co.uk/blog</loc><priority>0.7</priority></url>
  <url><loc>https://ready4hire.co.uk/about</loc><priority>0.6</priority></url>
  <url><loc>https://ready4hire.co.uk/contact</loc><priority>0.6</priority></url>
  <url><loc>https://ready4hire.co.uk/business</loc><priority>0.7</priority></url>
  <url><loc>https://ready4hire.co.uk/privacy</loc><priority>0.4</priority></url>
  <url><loc>https://ready4hire.co.uk/terms</loc><priority>0.4</priority></url>
</urlset>`;
  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:740,margin:"0 auto"}}>
        <div style={{marginBottom:22}}>
          <SLabel t="SITEMAP"/>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,30px)",color:G.ink,marginBottom:6}}>Site Map</h1>
          <p style={{color:G.muted,fontSize:13}}>Every page on Ready 4 Hire — click any link to navigate directly.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14}}>
          {SECTIONS.map(s=>(
            <div key={s.title} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:18}}>
              <div style={{fontWeight:800,color:G.forest,fontSize:11,letterSpacing:1.5,marginBottom:12}}>{s.title.toUpperCase()}</div>
              {s.links.map(([l,t])=>(
                <div key={l} onClick={()=>setTab(t)}
                  style={{fontSize:13,color:G.body,marginBottom:9,cursor:"pointer",display:"flex",alignItems:"center",gap:7,padding:"4px 0",borderBottom:`1px solid ${G.border}`}}
                  onMouseEnter={e=>e.currentTarget.style.color=G.forest}
                  onMouseLeave={e=>e.currentTarget.style.color=G.body}>
                  <span style={{color:G.border,fontSize:10}}>›</span>{l}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{marginTop:16,background:G.pale,border:`1px solid ${G.border}`,borderRadius:12,padding:14,fontSize:12,color:G.muted,lineHeight:1.7}}>
          When you deploy the site, submit <strong style={{color:G.forest}}>ready4hire.co.uk/sitemap.xml</strong> to Google Search Console to get all pages indexed. The sitemap.xml file is available in your deployment files.
        </div>
      </div>
    </div>
  );
}

// ─── PATIO HIRE PAGE ──────────────────────────────────────
function PatioHirePage({user,onLoginNeeded,addAlert,setTab}){
  const [sort,setSort]=useState("price");
  const [days,setDays]=useState(1);
  const [openId,setOpenId]=useState(null);
  const [pcKey,setPcKey]=useState(null);
  const [pcLabel,setPcLabel]=useState("");
  const [toast,setToast]=useState(null);
  const [alertMachine,setAlertMachine]=useState(undefined);
  const [hireView,setHireView]=useState("national"); // "national" | "local"
  const [patioCity,setPatioCity]=useState("All");
  const [patioCityOpen,setPatioCityOpen]=useState(false);
  const [patioCitySearch,setPatioCitySearch]=useState("");
  const patioCityRef=useRef(null);
  useEffect(()=>{
    const h=e=>{if(patioCityRef.current&&!patioCityRef.current.contains(e.target))setPatioCityOpen(false);};
    document.addEventListener("mousedown",h);
    return()=>document.removeEventListener("mousedown",h);
  },[]);

  const shown=[...PATIO_MACHINES]
    .sort((a,b)=>sort==="price"?a.price-b.price:b.rating-a.rating);

  const shownShops=[...PATIO_LOCAL_SHOPS]
    .filter(s=>patioCity==="All"||s.city===patioCity);

  const fire=name=>{setToast(name);setTimeout(()=>setToast(null),3000);};

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>

        {/* Header */}
        <div style={{background:`linear-gradient(145deg,#1A4A0A,#2E7D32)`,borderRadius:20,padding:"26px 28px",marginBottom:20,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:`radial-gradient(${G.white} 1px,transparent 1px)`,backgroundSize:"24px 24px",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1,display:"flex",gap:20,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontSize:10,fontWeight:800,color:G.light,letterSpacing:2,marginBottom:8}}>PATIO AND OUTDOOR HIRE</div>
              <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,4vw,30px)",color:G.white,marginBottom:8,lineHeight:1.2}}>
                Pressure Washer Hire<br/>From £32/day
              </h1>
              <p style={{color:"rgba(255,255,255,.65)",fontSize:13,lineHeight:1.75}}>
                Get your patio, driveway and decking summer-ready. 5 machines compared — from domestic jets to professional-grade pressure washers.
              </p>
              <div style={{display:"flex",gap:10,marginTop:12,flexWrap:"wrap"}}>
                {[["299k","Monthly UK searches"],["5","Machines compared"],["From £32","Per day"],["Next day","Delivery available"]].map(([v,l])=>(
                  <div key={l} style={{textAlign:"center",background:"rgba(255,255,255,.1)",borderRadius:10,padding:"7px 12px"}}>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.white}}>{v}</div>
                    <div style={{fontSize:9,color:"rgba(255,255,255,.6)"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Seasonal nudge */}
            <div style={{background:"rgba(249,168,37,.2)",border:"1px solid rgba(249,168,37,.4)",borderRadius:14,padding:"14px 16px",flexShrink:0,maxWidth:220}}>
              <div style={{fontWeight:800,color:G.gold,fontSize:12,marginBottom:5}}>Spring/Summer Season</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.75)",lineHeight:1.7}}>
                Patio cleaning searches peak in March–June. Book ahead — hire machines are in high demand from April.
              </div>
            </div>
          </div>
        </div>

        {/* Postcode lookup */}
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:12,padding:"12px 14px",marginBottom:8}}>
          <div style={{fontSize:9,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:6}}>FIND DELIVERY OR COLLECTION NEAR YOU</div>
          <PCLookup onFound={(p,k)=>{setPcKey(k);setPcLabel(p);}}/>
        </div>

        {/* National / Local Shops toggle */}
        <div style={{display:"flex",background:G.white,border:`1px solid ${G.border}`,borderRadius:11,padding:3,marginBottom:14,gap:2}}>
          <button onClick={()=>setHireView("national")} style={{flex:1,padding:"7px 8px",border:"none",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s",background:hireView==="national"?"#1A4A0A":"transparent",color:hireView==="national"?G.white:G.muted,whiteSpace:"nowrap"}}>
            National Brands
          </button>
          <button onClick={()=>setHireView("local")} style={{flex:1,padding:"7px 8px",border:"none",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700,transition:"all .2s",background:hireView==="local"?"#1A4A0A":"transparent",color:hireView==="local"?G.white:G.muted,whiteSpace:"nowrap"}}>
            Local Shops ({PATIO_LOCAL_SHOPS.length})
          </button>
        </div>

        {/* ── NATIONAL BRANDS VIEW ── */}
        {hireView==="national"&&(<>
        {/* Filter row */}
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:14,flexWrap:"wrap"}}>
          <span style={{fontSize:11,color:G.muted,fontWeight:600,flexShrink:0}}>Sort:</span>
          {[["price","Price"],["rating","Best Rated"]].map(([v,l])=>(
            <button key={v} onClick={()=>setSort(v)}
              style={{padding:"5px 12px",border:`1px solid ${sort===v?"#1A4A0A":G.border}`,borderRadius:20,
                background:sort===v?"#1A4A0A":G.white,color:sort===v?G.white:G.muted,
                fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .15s"}}>
              {l}
            </button>
          ))}
          <div style={{fontSize:11,color:G.muted,marginLeft:"auto"}}>
            <strong style={{color:G.ink}}>{shown.length}</strong> machines · {days} day{days!==1?"s":""}
            <input type="number" min={1} max={7} value={days} onChange={e=>setDays(Math.max(1,+e.target.value))}
              style={{...inp,width:48,padding:"4px 8px",fontSize:12,marginLeft:8,display:"inline-block"}}/>
          </div>
        </div>

        {/* Machine cards */}
        <div style={{display:"flex",flexDirection:"column",gap:13}}>
          {shown.map((m,i)=>{
            const pStr = m.pickups[pcKey||"def"]||m.pickups.def;
            return(
              <div key={m.id} className="ch" style={{background:G.white,borderRadius:18,padding:20,
                border:`1.5px solid ${i===0?G.dark:G.border}`,position:"relative",
                boxShadow:i===0?"0 4px 20px rgba(27,94,32,.09)":"0 2px 8px rgba(0,0,0,.04)"}}>
                {m.badge&&<div style={{position:"absolute",top:-11,left:18,
                  background:i===0?`linear-gradient(135deg,${G.forest},${G.mid})`:G.ink,
                  color:G.white,fontSize:9,fontWeight:800,padding:"3px 12px",borderRadius:20,letterSpacing:1}}>
                  {m.badge.toUpperCase()}
                </div>}
                <div className="cardBody" style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                  <div style={{width:48,height:48,borderRadius:13,flexShrink:0,background:m.col,
                    display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:13}}>
                    {m.logo}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.ink,marginBottom:4}}>{m.name}</div>
                    <Stars r={m.rating} n={m.reviews}/>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
                      {m.feats.map(f=><Chip key={f} green xs>{f}</Chip>)}
                      <StockPill ok={m.inStock}/>
                    </div>
                    <div style={{fontSize:12,color:G.muted,marginTop:6,lineHeight:1.6}}>{m.about}</div>
                    {pcKey&&(
                      <div className="fu" style={{marginTop:10,background:G.pale,borderRadius:9,padding:"7px 11px",border:`1px solid ${G.border}`}}>
                        <div style={{fontSize:9,fontWeight:800,color:G.forest,letterSpacing:1,marginBottom:3}}>
                          COLLECTION / DELIVERY{pcLabel?` (${pcLabel})`:""} 
                        </div>
                        {pStr.split("·").map(pt=><div key={pt} style={{fontSize:11,color:G.body,marginBottom:1}}>• {pt.trim()}</div>)}
                      </div>
                    )}
                    {/* Amazon product */}
                    <AmazonWidget product={PATIO_AMAZON.pressure_soap} context="patio cleaning solution for pressure washers"/>
                  </div>
                  <div className="priceCol" style={{textAlign:"right",minWidth:140,flexShrink:0}}>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:30,color:G.forest,lineHeight:1}}>£{m.price}</div>
                    <div style={{color:G.muted,fontSize:11,marginBottom:3}}>per day</div>
                    {days>1&&<div style={{color:G.body,fontSize:12,marginBottom:4}}>£{m.price*days} for {days} days</div>}
                    {m.deposit===0
                      ?<div style={{background:G.pale,color:G.dark,border:`1px solid ${G.border}`,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,marginBottom:8,display:"inline-block"}}>No deposit</div>
                      :<div style={{background:G.orangeLight,color:G.orange,border:"1px solid #FFCC8088",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,marginBottom:8,display:"inline-block"}}>£{m.deposit} deposit</div>
                    }
                    <div style={{display:"flex",flexDirection:"column",gap:5}}>
                      <button onClick={()=>fire(m.brand)} className="bp"
                        style={{width:"100%",padding:"9px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                        Check Availability →
                      </button>
                      <div style={{display:"flex",gap:5}}>
                        <button onClick={()=>setAlertMachine({...m,livePrice:m.price})}
                          style={{flex:1,padding:"6px 0",background:"none",border:`1px solid ${G.border}`,color:G.muted,borderRadius:9,fontSize:10,cursor:"pointer"}}>Alert</button>
                        <button onClick={()=>setOpenId(openId===m.id?null:m.id)}
                          style={{flex:1,padding:"6px 0",background:"none",border:`1px solid ${G.border}`,color:G.muted,borderRadius:9,fontSize:10,cursor:"pointer"}}>{openId===m.id?"Less":"More"}</button>
                      </div>
                    </div>
                  </div>
                </div>
                {openId===m.id&&(
                  <div className="fu" style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${G.border}`}}>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      <div style={{background:G.pale,borderRadius:10,padding:11}}>
                        <div style={{fontSize:9,fontWeight:800,color:G.forest,letterSpacing:1,marginBottom:6}}>BEST FOR</div>
                        {m.bestFor.map(b=><div key={b} style={{fontSize:11,color:G.body,marginBottom:3}}>• {b}</div>)}
                      </div>
                      <div style={{background:G.orangeLight,borderRadius:10,padding:11}}>
                        <div style={{fontSize:9,fontWeight:800,color:G.orange,letterSpacing:1,marginBottom:6}}>NOT IDEAL FOR</div>
                        {m.notFor.map(b=><div key={b} style={{fontSize:11,color:G.body,marginBottom:3}}>• {b}</div>)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA to patio pros */}
        <div style={{marginTop:20,background:G.white,border:`1.5px solid ${G.border}`,borderRadius:14,padding:18,display:"flex",gap:13,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:160}}>
            <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:2}}>Rather have someone do it for you?</div>
            <div style={{fontSize:12,color:G.muted}}>Get free quotes from verified patio cleaning professionals near you.</div>
          </div>
          <button onClick={()=>setTab("patioservices")} className="bp"
            style={{padding:"9px 17px",background:"#1A4A0A",color:G.white,border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>
            Book a Patio Pro →
          </button>
        </div>
        </>)}

        {/* ── LOCAL SHOPS VIEW ── */}
        {hireView==="local"&&(
          <div className="fu">
            {/* Stats bar */}
            <div style={{background:"#1A4A0A",borderRadius:12,padding:"12px 16px",marginBottom:14,display:"flex",gap:16,flexWrap:"wrap",justifyContent:"space-around"}}>
              {([[String(PATIO_LOCAL_SHOPS.length),"Verified shops"],["17","UK cities"],["From £28","Per day"],["Free enquiry","No obligation"]]).map(([v,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.white}}>{v}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.6)"}}>{l}</div>
                </div>
              ))}
            </div>
            {/* City filter */}
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:14,flexWrap:"wrap"}}>
              <div ref={patioCityRef} style={{position:"relative"}}>
                <button onClick={()=>setPatioCityOpen(v=>!v)}
                  style={{display:"flex",alignItems:"center",gap:6,padding:"7px 13px",background:G.white,
                    border:`1px solid ${patioCityOpen?"#1A4A0A":G.border}`,borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700,color:G.body}}>
                  {patioCity==="All"?"All Cities":patioCity}
                  <span style={{fontSize:10,color:G.muted}}>{patioCityOpen?"▲":"▼"}</span>
                </button>
                {patioCityOpen&&(
                  <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,background:G.white,border:`1px solid ${G.border}`,borderRadius:12,padding:8,width:220,boxShadow:"0 8px 24px rgba(0,0,0,.12)",zIndex:100}}>
                    <input value={patioCitySearch} onChange={e=>setPatioCitySearch(e.target.value)}
                      placeholder="Search city..." style={{...inp,marginBottom:6,fontSize:12}}/>
                    {["All",...PATIO_SHOP_CITIES].filter(c=>c&&c.toLowerCase().includes(patioCitySearch.toLowerCase())).map(c=>(
                      <button key={c} onClick={()=>{setPatioCity(c);setPatioCityOpen(false);setPatioCitySearch("");}}
                        style={{width:"100%",padding:"8px 10px",background:patioCity===c?G.pale:"transparent",border:"none",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:patioCity===c?700:400,color:patioCity===c?"#1A4A0A":G.body,textAlign:"left"}}>
                        {c==="All"?"All Cities":c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div style={{fontSize:11,color:G.muted,marginLeft:"auto"}}>
                <strong style={{color:G.ink}}>{shownShops.length}</strong> shop{shownShops.length!==1?"s":""}
              </div>
            </div>
            {/* Shop cards */}
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {shownShops.map((s,i)=>(
                <div key={s.id} style={{background:G.white,borderRadius:18,padding:20,
                  border:`1.5px solid ${i===0?G.dark:G.border}`,position:"relative",
                  boxShadow:i===0?"0 4px 20px rgba(27,94,32,.09)":"0 2px 8px rgba(0,0,0,.04)"}}>
                  {s.badge&&<div style={{position:"absolute",top:-11,left:18,background:"#1A4A0A",color:G.white,fontSize:9,fontWeight:800,padding:"3px 12px",borderRadius:20,letterSpacing:1}}>{s.badge.toUpperCase()}</div>}
                  <div className="cardBody" style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                    <div style={{width:48,height:48,borderRadius:13,flexShrink:0,background:s.col,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:13}}>
                      {s.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
                        <span style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.ink}}>{s.name}</span>
                        {s.verified&&<Pill text="Verified" color={"#1A4A0A"}/>}
                        {s.insured&&<Pill text="Insured" color={G.blue}/>}
                      </div>
                      <Stars r={s.rating} n={s.reviews}/>
                      <div style={{fontSize:11,color:G.muted,marginTop:3,lineHeight:1.6}}>{s.city} · {s.area} · {s.open}</div>
                      <div style={{fontSize:12,color:G.body,marginTop:6,lineHeight:1.65,fontStyle:"italic"}}>{s.about}</div>
                      <div style={{marginTop:8}}>
                        <div style={{fontSize:9,fontWeight:800,color:G.muted,letterSpacing:1,marginBottom:5}}>MACHINES IN STOCK</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                          {s.machines.map(m=><Chip key={m} green xs>{m}</Chip>)}
                        </div>
                      </div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:6}}>
                        {s.services.map(sv=><span key={sv} style={{background:"#F5F5F5",color:G.muted,border:"1px solid #E0E0E0",fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:20}}>• {sv}</span>)}
                      </div>
                      <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:8}}>
                        {/* Enquiry insight */}
                        <div style={{background:"#F3F8F3",border:`1px solid ${G.border}`,borderRadius:10,padding:"7px 11px",fontSize:11,color:G.body,lineHeight:1.6}}>
                          <span style={{fontWeight:700,color:"#1A4A0A"}}>📊 This month: </span>
                          <span style={{fontWeight:700,color:G.ink}}>{[8,12,6,14,9,11,7,15,10,13,8][i%11]} views</span> · <span style={{fontWeight:700,color:G.ink}}>{[2,3,1,2,3,1,2,3,1,2,3][i%11]} enquiries</span>.
                          <span style={{color:G.muted}}> Upgrade to appear first.</span>
                        </div>
                        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                          <div style={{display:"flex",alignItems:"center",gap:5,background:G.pale,border:`1px solid ${G.border}`,borderRadius:20,padding:"4px 11px"}}>
                            <div style={{width:7,height:7,borderRadius:"50%",background:"#1A4A0A",flexShrink:0}}/>
                            <span style={{fontSize:11,fontWeight:700,color:"#1A4A0A"}}>Free listing</span>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:5,background:"#FFF8E1",border:"1px solid #F9A82566",borderRadius:20,padding:"4px 11px",cursor:"pointer"}}
                            onClick={()=>setTab("shopapply")}>
                            <span style={{fontSize:11,fontWeight:700,color:"#78540A"}}>Upgrade to Premium →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="priceCol" style={{textAlign:"right",minWidth:120,flexShrink:0}}>
                      <div style={{color:G.muted,fontSize:11}}>From</div>
                      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:"#1A4A0A",lineHeight:1}}>£{s.price_from}</div>
                      <div style={{color:G.muted,fontSize:11,marginBottom:4}}>per day</div>
                      {s.deposit===0
                        ?<div style={{background:G.pale,color:G.dark,border:`1px solid ${G.border}`,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,marginBottom:8,display:"inline-block"}}>No deposit</div>
                        :<div style={{background:G.orangeLight,color:G.orange,border:"1px solid #FFCC8088",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,marginBottom:8,display:"inline-block"}}>£{s.deposit} deposit</div>
                      }
                      <a href={`tel:${s.phone.replace(/\s/g,"")}`} style={{display:"block",padding:"9px 0",background:"#1A4A0A",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,textDecoration:"none",textAlign:"center"}}>
                        Call Now
                      </a>
                      <div style={{fontSize:9,color:G.muted,textAlign:"center",marginTop:4}}>{s.phone}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* List your shop CTA */}
            <div style={{marginTop:20,background:`linear-gradient(135deg,#1A4A0A,#2E7D32)`,borderRadius:16,padding:20,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:180}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.white,marginBottom:4}}>Do you run a hire shop?</div>
                <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.65}}>Get your pressure washers in front of 299,000 monthly patio cleaning searchers. Free listing available.</div>
              </div>
              <button onClick={()=>setTab("shopapply")} className="bp"
                style={{padding:"10px 18px",background:G.gold,border:"none",borderRadius:11,color:G.ink,fontSize:12,fontWeight:800,cursor:"pointer",flexShrink:0}}>
                List My Shop →
              </button>
            </div>
          </div>
        )}

        <div style={{marginTop:14,background:G.white,border:`1px solid ${G.border}`,borderRadius:11,padding:13,fontSize:11,color:G.muted,lineHeight:1.8}}>
          Prices sourced from provider websites. Ready 4 Hire earns CPA commission on bookings. ICO registered ZA123456.
        </div>
      </div>
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:G.forest,color:G.white,borderRadius:12,padding:"12px 20px",fontWeight:700,fontSize:12,zIndex:500,animation:"toastSlide .3s ease",whiteSpace:"nowrap",boxShadow:"0 8px 28px rgba(0,0,0,.22)"}}>Redirecting to {toast} — commission tracked</div>}
      {alertMachine!==undefined&&<AlertModal machine={alertMachine} onClose={()=>setAlertMachine(undefined)} onSet={()=>{addAlert();setAlertMachine(undefined);}}/>}
    </div>
  );
}

// ─── PATIO SERVICES PAGE ──────────────────────────────────
function PatioServicesPage({user,onLoginNeeded}){
  const [city,setCity]=useState("London");
  const [sort,setSort]=useState("rating");
  const [quoting,setQuoting]=useState(null);
  const [step,setStep]=useState(1);
  const [done,setDone]=useState(false);
  const openQuote=c=>{setQuoting(c);setStep(1);setDone(false);};
  const shown=[...PATIO_CLEANERS].filter(c=>city==="All"||c.city===city).sort((a,b)=>sort==="price"?a.from-b.from:b.rating-a.rating);

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <div style={{marginBottom:20}}>
          <SLabel t="PATIO & OUTDOOR CLEANING"/>
          <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,32px)",color:G.ink,marginBottom:4}}>
            Book a Patio Cleaning Professional
          </h1>
          <p style={{color:G.muted,fontSize:13}}>Verified · Fully insured · Free quotes · Patios, driveways, decking and more</p>
        </div>

        <div className="ctrlRow" style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:16,marginBottom:14,display:"flex",gap:10,flexWrap:"nowrap",alignItems:"flex-end"}}>
          <div style={{flex:"1 1 0"}}>
            <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>LOCATION</div>
            <select value={city} onChange={e=>setCity(e.target.value)} style={{...inp,cursor:"pointer"}}>
              {["London","Milton Keynes","Birmingham","Manchester","Leeds","Sheffield","Bristol","Luton","Northampton","Leicester","Nottingham","Derby","Coventry","Reading","Oxford","Swindon","Bath","All"].map(c=><option key={c} value={c}>{c==="All"?"All Areas":c}</option>)}
            </select>
          </div>
          <div style={{flex:"1 1 0"}}>
            <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>SORT</div>
            <select value={sort} onChange={e=>setSort(e.target.value)} style={{...inp,cursor:"pointer"}}>
              <option value="rating">Best Rated</option>
              <option value="price">Lowest Price</option>
            </select>
          </div>
          <div className="ctrlCount" style={{textAlign:"right",paddingBottom:8,flexShrink:0}}>
            <div style={{fontSize:11,color:G.muted}}><strong style={{color:G.ink}}>{shown.length}</strong> verified</div>
            <div style={{fontSize:11,color:G.muted}}>Insured · Background checked</div>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {shown.map((c,i)=>(
            <div key={c.id} className="ch" style={{background:G.white,borderRadius:18,padding:20,
              border:`1.5px solid ${i===0?G.dark:G.border}`,position:"relative",
              boxShadow:i===0?"0 4px 20px rgba(27,94,32,.09)":"0 2px 8px rgba(0,0,0,.04)"}}>
              {c.badge&&<div style={{position:"absolute",top:-11,left:18,background:i===0?`linear-gradient(135deg,${G.forest},${G.mid})`:G.ink,color:G.white,fontSize:9,fontWeight:800,padding:"3px 12px",borderRadius:20,letterSpacing:1}}>{c.badge.toUpperCase()}</div>}
              <div className="cardBody" style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <div style={{width:48,height:48,borderRadius:13,flexShrink:0,background:c.col,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:13}}>
                  {c.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:3}}>
                    <span style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.ink}}>{c.name}</span>
                    {c.verified&&<Pill text="Verified" color={G.forest}/>}
                    <Pill text="Insured" color={G.blue}/>
                  </div>
                  <Stars r={c.rating} n={c.reviews}/>
                  <div style={{fontSize:11,color:G.muted,marginTop:3}}>{c.city} · {c.response} response · {c.jobs.toLocaleString()} jobs</div>
                  <div style={{fontSize:12,color:G.body,marginTop:5,lineHeight:1.6,fontStyle:"italic"}}>{c.about}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>{c.services.map(s=><Chip key={s} green xs>{s}</Chip>)}</div>
                </div>
                <div className="priceCol" style={{textAlign:"right",minWidth:140,flexShrink:0}}>
                  <div style={{color:G.muted,fontSize:11}}>From</div>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:30,color:G.forest,lineHeight:1}}>£{c.from}</div>
                  <div style={{color:G.muted,fontSize:11,marginBottom:10}}>per visit</div>
                  <button onClick={()=>openQuote(c)} className="bp" style={{display:"block",width:"100%",padding:"10px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Get Free Quote →</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:22,background:G.white,border:`1.5px solid ${G.border}`,borderRadius:14,padding:18,display:"flex",gap:13,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:160}}>
            <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:2}}>Want to do it yourself?</div>
            <div style={{fontSize:12,color:G.muted}}>Hire a pressure washer from £32/day — great results in a day.</div>
          </div>
          <button className="bp" style={{padding:"9px 17px",background:G.forest,color:G.white,border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}
            onClick={()=>{}}>
            Hire a Pressure Washer →
          </button>
        </div>
      </div>

      {quoting&&(
        <Overlay onClose={()=>{setQuoting(null);setDone(false);}}>
          <div className="pop" style={{background:G.white,borderRadius:20,padding:28,width:430,maxWidth:"100%",maxHeight:"90vh",overflowY:"auto",position:"relative",boxShadow:"0 20px 60px rgba(0,0,0,.18)"}}>
            <button onClick={()=>{setQuoting(null);setDone(false);}} style={{position:"absolute",top:14,right:16,background:"none",border:"none",color:G.muted,fontSize:22,cursor:"pointer"}}>×</button>
            {!done?(
              <>
                <div style={{marginBottom:16}}>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.ink}}>{quoting.name}</div>
                  <div style={{color:G.muted,fontSize:11}}>Free quote · Responds {quoting.response}</div>
                </div>
                <div style={{display:"flex",gap:5,marginBottom:18}}>
                  {[1,2].map(s=><div key={s} style={{flex:1,height:4,borderRadius:2,background:s<=step?G.forest:G.border,transition:"background .3s"}}/>)}
                </div>
                {step===1&&(
                  <div className="fu">
                    <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:11}}>1. What needs cleaning?</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14}}>
                      {["Patio / slabs","Driveway","Decking","Fencing","Garden path","Render / walls","Roof / gutters","Whole garden"].map(r=>(
                        <label key={r} style={{display:"flex",alignItems:"center",gap:7,background:G.frost,borderRadius:9,padding:"8px 10px",cursor:"pointer",border:`1px solid ${G.border}`}}>
                          <input type="checkbox" style={{accentColor:G.forest}}/><span style={{fontSize:12,color:G.ink}}>{r}</span>
                        </label>
                      ))}
                    </div>
                    <button onClick={()=>setStep(2)} className="bp" style={{width:"100%",padding:"11px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Next →</button>
                  </div>
                )}
                {step===2&&(
                  <div className="fu">
                    <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:11}}>2. Your contact details</div>
                    {[["YOUR NAME","text","First name"],["EMAIL","email","you@email.com"],["PHONE","tel","07700 000000"],["PREFERRED DATE","date",""]].map(([l,t,p])=>(
                      <div key={l} style={{marginBottom:11}}><div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>{l}</div><input type={t} placeholder={p} style={inp}/></div>
                    ))}
                    <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:11,marginBottom:12,fontSize:11,color:G.body,lineHeight:1.7}}>
                      Request goes to <strong>{quoting.name}</strong>. <strong style={{color:G.forest}}>Ready 4 Hire earns a £10–£18 lead fee. You pay nothing.</strong>
                    </div>
                    {!user&&<div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,padding:"10px 13px",marginBottom:10,display:"flex",gap:9,alignItems:"center"}}>
                      <div><div style={{fontWeight:700,fontSize:12,color:G.ink,marginBottom:2}}>Sign in to send your quote request</div><div style={{fontSize:11,color:G.muted}}>Free account — 30 seconds.</div></div>
                    </div>}
                    <button onClick={()=>{if(!user){onLoginNeeded();return;}setDone(true);}} className="bp" style={{width:"100%",padding:"11px 0",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                      {user?"Send Quote Request →":"Sign In to Send →"}
                    </button>
                  </div>
                )}
              </>
            ):(
              <div className="fu" style={{textAlign:"center",padding:"8px 0"}}>
                <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:6}}>Quote Request Sent!</h3>
                <p style={{color:G.muted,fontSize:13,lineHeight:1.8,marginBottom:14}}><strong>{quoting.name}</strong> will contact you within {quoting.response}.</p>
                <button onClick={()=>{setQuoting(null);setDone(false);}} style={{padding:"9px 22px",background:G.forest,border:"none",borderRadius:10,color:G.white,fontWeight:700,cursor:"pointer"}}>Close</button>
              </div>
            )}
          </div>
        </Overlay>
      )}
    </div>
  );
}

// ─── PATIO CARE GUIDE ─────────────────────────────────────
function PatioGuide({setTab}){
  const [search,setSearch]=useState("");
  const [category,setCategory]=useState("All");
  const [openGuide,setOpenGuide]=useState(null);
  const [guideView,setGuideView]=useState("guides"); // "guides" | "tools" | "solutions"

  const filtered=PATIO_GUIDES.filter(g=>{
    const matchCat=category==="All"||g.category===category;
    const matchSearch=!search||g.name.toLowerCase().includes(search.toLowerCase());
    return matchCat&&matchSearch;
  });
  const active=openGuide?PATIO_GUIDES.find(g=>g.id===openGuide):null;

  // ── Patio Amazon widget ───────────────────────────────────
  const PatioAmazonWidget=({product,context})=>{
    if(!product) return null;
    const AMZ_TAG="ready4hire-21";
    const url=`https://www.amazon.co.uk/dp/${product.asin}?tag=${AMZ_TAG}`;
    return(
      <div style={{background:G.amber,border:`1px solid ${G.gold}44`,borderRadius:12,padding:"12px 14px",marginTop:12}}>
        <div style={{fontSize:9,fontWeight:800,color:G.gold,letterSpacing:1.5,marginBottom:6}}>RECOMMENDED PRODUCT · Amazon Associates (3% commission)</div>
        <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:140}}>
            <div style={{fontWeight:700,fontSize:13,color:G.ink,marginBottom:2}}>{product.title}</div>
            <div style={{fontSize:11,color:"#78540A",lineHeight:1.6,marginBottom:4}}>{product.note}</div>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.ink}}>{product.price}</span>
              {product.badge&&<span style={{background:"#FFF3CD",color:"#856404",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,border:"1px solid #FFEAA7"}}>{product.badge}</span>}
              <span style={{fontSize:10,color:G.muted}}>{product.rating}★ · {product.reviews} reviews</span>
            </div>
          </div>
          <button onClick={()=>window.open(url,"_blank")} className="bp"
            style={{padding:"9px 16px",background:G.gold,border:"none",borderRadius:10,color:G.ink,fontSize:12,fontWeight:800,cursor:"pointer",flexShrink:0}}>
            View on Amazon →
          </button>
        </div>
      </div>
    );
  };

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:920,margin:"0 auto"}}>

        {/* Care Guide toggle */}
        <div style={{display:"flex",background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:4,marginBottom:16,gap:3}}>
          <button onClick={()=>setTab("careguide")} style={{flex:1,padding:"10px 0",border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:700,background:"transparent",color:G.muted,transition:"all .2s"}}
            onMouseEnter={e=>e.currentTarget.style.background=G.frost}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            Carpet Care
          </button>
          <button style={{flex:1,padding:"10px 0",border:"none",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:800,background:`linear-gradient(135deg,#1A4A0A,#2E7D32)`,color:G.white,transition:"all .2s"}}>
            Patio Care
          </button>
        </div>

        {/* Header */}
        <div style={{background:`linear-gradient(145deg,#1A4A0A,#2E7D32)`,borderRadius:20,padding:"26px 28px",marginBottom:20,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:`radial-gradient(${G.white} 1px,transparent 1px)`,backgroundSize:"24px 24px",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1,display:"flex",gap:18,alignItems:"flex-start",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontSize:10,fontWeight:800,color:G.light,letterSpacing:2,marginBottom:8}}>PATIO CARE GUIDE</div>
              <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,4vw,30px)",color:G.white,marginBottom:8,lineHeight:1.2}}>
                Patio Cleaning &amp; Outdoor Care
              </h1>
              <p style={{color:"rgba(255,255,255,.65)",fontSize:13,lineHeight:1.75,maxWidth:480}}>
                Step-by-step guides, recommended tools and solutions for every outdoor cleaning job. 299,000 monthly UK searches.
              </p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:7,flexShrink:0}}>
              {[["4","Patio guides"],["299k","Monthly searches"],["Free","Always free"],["Amazon+B&Q","Products linked"]].map(([v,l])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontFamily:"'DM Serif Display',serif",fontSize:17,color:G.bright,minWidth:60}}>{v}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section tabs — Guides / Tools / Solutions */}
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:12,padding:4,marginBottom:16,display:"flex",gap:2}}>
          {[["guides","Cleaning Guides"],["tools","Tools"],["solutions","Solutions"]].map(([v,l])=>(
            <button key={v} onClick={()=>{setGuideView(v);setOpenGuide(null);}}
              style={{flex:1,padding:"8px 4px",border:"none",borderRadius:9,cursor:"pointer",
                fontSize:11,fontWeight:700,transition:"all .2s",whiteSpace:"nowrap",
                background:guideView===v?"#1A4A0A":"transparent",
                color:guideView===v?G.white:G.muted}}>
              {l}
            </button>
          ))}
        </div>

        {/* ── GUIDES VIEW ─────────────────────────────────── */}
        {guideView==="guides"&&(
          <>
            {/* Search + filter */}
            <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:"14px 16px",marginBottom:16}}>
              <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
                <div style={{flex:"1 1 180px",display:"flex",alignItems:"center",gap:8,background:G.frost,borderRadius:20,padding:"7px 14px",border:`1px solid ${G.border}`}}>
                  <span style={{fontSize:14,color:G.muted}}>🔍</span>
                  <input value={search} onChange={e=>setSearch(e.target.value)}
                    placeholder="Search guides… e.g. moss, weeds, oil stains"
                    style={{border:"none",outline:"none",background:"transparent",fontSize:13,color:G.ink,width:"100%"}}/>
                  {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:G.muted,cursor:"pointer",fontSize:16,lineHeight:1,padding:0}}>×</button>}
                </div>
                <span style={{fontSize:11,color:G.muted,fontWeight:600,flexShrink:0}}>or filter:</span>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                {PATIO_CATEGORIES.map(c=>(
                  <button key={c} onClick={()=>setCategory(c)}
                    style={{padding:"5px 13px",border:`1px solid ${category===c?"#1A4A0A":G.border}`,borderRadius:20,
                      background:category===c?"#1A4A0A":G.white,color:category===c?G.white:G.muted,
                      fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .15s"}}>
                    {c==="All"?"All Guides":c}
                  </button>
                ))}
                <div style={{marginLeft:"auto",fontSize:11,color:G.muted}}>
                  <strong style={{color:G.ink}}>{filtered.length}</strong> guide{filtered.length!==1?"s":""}
                </div>
              </div>
            </div>

            {/* Guide grid */}
            {!active&&(
              <div className="fu" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12,marginBottom:22}}>
                {filtered.map(g=>(
                  <div key={g.id} className="ch" onClick={()=>setOpenGuide(g.id)}
                    style={{background:G.white,borderRadius:16,padding:18,cursor:"pointer",
                      border:`1.5px solid ${G.border}`,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                      <div style={{width:44,height:44,borderRadius:12,background:g.bgCol,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:g.col}}>{g.emoji}</div>
                      <span style={{background:G.pale,color:G.forest,border:`1px solid ${G.border}`,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,letterSpacing:.8}}>{g.category.toUpperCase()}</span>
                    </div>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.ink,marginBottom:4}}>{g.name}</div>
                    <div style={{fontSize:11,color:G.muted,marginBottom:8,lineHeight:1.5}}>{g.intro.slice(0,80)}…</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={{display:"flex",gap:3}}>
                        {Array.from({length:5}).map((_,i)=>(
                          <div key={i} style={{width:8,height:8,borderRadius:2,background:i<g.difficulty?g.col:"#E0E0E0"}}/>
                        ))}
                        <span style={{fontSize:10,color:G.muted,marginLeft:4}}>{g.difficulty<=2?"Easy":"Medium"}</span>
                      </div>
                      <span style={{fontSize:11,color:G.muted}}>{g.timeMinutes} min</span>
                    </div>
                    <div style={{marginTop:10,fontSize:11,fontWeight:700,color:"#2E7D32"}}>Read guide →</div>
                  </div>
                ))}
              </div>
            )}

            {/* Individual guide */}
            {active&&(
              <div className="fu">
                <button onClick={()=>setOpenGuide(null)} style={{display:"flex",alignItems:"center",gap:6,background:"none",border:`1px solid ${G.border}`,borderRadius:20,padding:"6px 14px",cursor:"pointer",fontSize:12,fontWeight:600,color:G.muted,marginBottom:16}}>
                  ← Back to all guides
                </button>
                <div style={{background:`linear-gradient(145deg,${active.col},${active.col}CC)`,borderRadius:18,padding:22,marginBottom:14,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
                  <div style={{width:56,height:56,borderRadius:16,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0,fontWeight:700,color:G.white}}>{active.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,.7)",letterSpacing:1.5,marginBottom:4}}>PATIO GUIDE · {active.category.toUpperCase()}</div>
                    <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.white,marginBottom:6}}>{active.name}</h2>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                      <span style={{fontSize:12,color:"rgba(255,255,255,.75)"}}>{active.timeMinutes} mins</span>
                      <span style={{fontSize:12,color:"rgba(255,255,255,.75)"}}>{active.searches} UK searches</span>
                      <span style={{background:"rgba(255,255,255,.2)",color:G.white,fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20}}>{active.difficulty<=2?"Easy":"Medium"}</span>
                    </div>
                  </div>
                </div>
                <div style={{background:G.amber,border:`1px solid ${G.gold}44`,borderRadius:10,padding:"10px 14px",marginBottom:14}}>
                  <span style={{fontSize:13,fontWeight:700,color:"#78540A"}}>{active.urgency}</span>
                </div>
                <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:18,marginBottom:14}}>
                  <p style={{fontSize:14,color:G.body,lineHeight:1.8}}>{active.intro}</p>
                </div>
                <div style={{marginBottom:14}}>
                  <SLabel t="STEP BY STEP"/>
                  {active.steps.map((s,i)=>(
                    <div key={i} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:13,padding:16,marginBottom:10,display:"flex",gap:13}}>
                      <div style={{width:28,height:28,borderRadius:9,background:active.col,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontSize:12,fontWeight:800}}>{i+1}</div>
                      <div><div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:4}}>{s.t}</div><div style={{fontSize:13,color:G.muted,lineHeight:1.75}}>{s.d}</div></div>
                    </div>
                  ))}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12,marginBottom:14}}>
                  <div style={{background:G.orangeLight,border:"1px solid #FFCC80",borderRadius:13,padding:14}}>
                    <div style={{fontSize:9,fontWeight:800,color:G.orange,letterSpacing:1,marginBottom:8}}>DO NOT</div>
                    {active.doNot.map(d=><div key={d} style={{fontSize:12,color:G.body,marginBottom:5,display:"flex",gap:7}}><span style={{color:G.orange,fontWeight:800,flexShrink:0}}>✗</span>{d}</div>)}
                  </div>
                  <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:13,padding:14}}>
                    <div style={{fontSize:9,fontWeight:800,color:G.forest,letterSpacing:1,marginBottom:8}}>PRO TIP</div>
                    <p style={{fontSize:12,color:G.body,lineHeight:1.75}}>{active.proTip}</p>
                  </div>
                </div>
                <PatioAmazonWidget product={active.product} context={active.productContext}/>
                <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:13,padding:16,marginTop:12,display:"flex",gap:11,alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:3}}>When to call a professional</div>
                    <p style={{fontSize:12,color:G.muted,lineHeight:1.7,marginBottom:10}}>{active.whenToPro}</p>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <button onClick={()=>setTab("patioservices")} className="bp" style={{padding:"8px 16px",background:"#1A4A0A",border:"none",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Get Free Quote →</button>
                      <button onClick={()=>setTab("patiohire")} className="bp" style={{padding:"8px 16px",background:"none",border:"1.5px solid #2E7D32",borderRadius:10,color:"#2E7D32",fontSize:12,fontWeight:700,cursor:"pointer"}}>Hire a Pressure Washer →</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── TOOLS VIEW ──────────────────────────────────── */}
        {guideView==="tools"&&(
          <div className="fu">
            <div style={{marginBottom:14}}>
              <SLabel t="PATIO TOOLS — Amazon (3% commission)"/>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:4}}>Tools You Will Need</h2>
              <p style={{fontSize:13,color:G.muted,lineHeight:1.7}}>Everything from stiff brushes to rotary patio heads. Affiliate links via Amazon Associates — 3% commission, 24-hour basket-wide cookie.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {PATIO_TOOLS.map((t,i)=>(
                <div key={t.asin} style={{background:G.white,border:`1.5px solid ${i===0?G.dark:G.border}`,borderRadius:16,padding:18,display:"flex",gap:14,alignItems:"flex-start",flexWrap:"wrap"}}>
                  {i===0&&<div style={{position:"absolute",marginTop:-29,marginLeft:8,background:`linear-gradient(135deg,${G.forest},${G.dark})`,color:G.white,fontSize:9,fontWeight:800,padding:"3px 12px",borderRadius:20,letterSpacing:1}}>{t.badge.toUpperCase()}</div>}
                  <div style={{width:48,height:48,borderRadius:13,background:G.pale,border:`1px solid ${G.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:G.forest,fontWeight:900,fontSize:18,flexShrink:0}}>
                    {i===0?"K+":i===1?"K":i===2?"G":i===3?"P":i===4?"L":"H"}
                  </div>
                  <div style={{flex:1,minWidth:160}}>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.ink,marginBottom:4}}>{t.title}</div>
                    <div style={{fontSize:12,color:G.muted,lineHeight:1.65,marginBottom:8}}>{t.note}</div>
                    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                      <span style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.forest}}>{t.price}</span>
                      <span style={{background:G.amber,color:"#78540A",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{t.badge}</span>
                      <span style={{fontSize:11,color:G.muted}}>{t.rating}★ · {t.reviews} reviews</span>
                    </div>
                  </div>
                  <div style={{flexShrink:0}}>
                    <div style={{fontSize:10,color:G.muted,marginBottom:4,textAlign:"right"}}>{t.commission} commission</div>
                    <button onClick={()=>window.open(`https://www.amazon.co.uk/dp/${t.asin}?tag=ready4hire-21`,"_blank")} className="bp"
                      style={{padding:"9px 16px",background:G.gold,border:"none",borderRadius:10,color:G.ink,fontSize:12,fontWeight:800,cursor:"pointer"}}>
                      View on Amazon →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:16,background:G.pale,border:`1px solid ${G.border}`,borderRadius:12,padding:14,fontSize:12,color:G.body,lineHeight:1.7}}>
              <strong>Affiliate disclosure:</strong> These are Amazon Associate links. If you buy through them, Ready 4 Hire earns a 3% commission at no extra cost to you. Product recommendations are based on customer reviews and relevance — not commission rate.
            </div>
          </div>
        )}

        {/* ── SOLUTIONS VIEW ──────────────────────────────── */}
        {guideView==="solutions"&&(
          <div className="fu">
            <div style={{marginBottom:14}}>
              <SLabel t="CLEANING SOLUTIONS — Amazon (3% commission)"/>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:4}}>Patio Cleaning Solutions</h2>
              <p style={{fontSize:13,color:G.muted,lineHeight:1.7}}>The right product makes the difference between a clean patio and hours of scrubbing. Matched to the job.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {Object.values(PATIO_AMAZON).map((p,i)=>(
                <div key={p.asin} style={{background:G.white,border:`1.5px solid ${i===0?G.dark:G.border}`,borderRadius:16,padding:18,display:"flex",gap:14,alignItems:"flex-start",flexWrap:"wrap"}}>
                  <div style={{width:48,height:48,borderRadius:13,background:G.amber,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Serif Display',serif",fontSize:14,fontWeight:700,color:"#78540A",flexShrink:0}}>
                    {p.price}
                  </div>
                  <div style={{flex:1,minWidth:160}}>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.ink,marginBottom:4}}>{p.title}</div>
                    <div style={{fontSize:12,color:G.muted,lineHeight:1.65,marginBottom:8}}>{p.note}</div>
                    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                      <span style={{background:G.amber,color:"#78540A",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20}}>{p.badge}</span>
                      <span style={{fontSize:11,color:G.muted}}>{p.rating}★ · {p.reviews} reviews</span>
                    </div>
                  </div>
                  <div style={{flexShrink:0}}>
                    <div style={{fontSize:10,color:G.muted,marginBottom:4,textAlign:"right"}}>3% commission</div>
                    <button onClick={()=>window.open(`https://www.amazon.co.uk/dp/${p.asin}?tag=ready4hire-21`,"_blank")} className="bp"
                      style={{padding:"9px 16px",background:G.gold,border:"none",borderRadius:10,color:G.ink,fontSize:12,fontWeight:800,cursor:"pointer"}}>
                      View on Amazon →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}



        {/* Bottom CTA */}
        {!active&&(
          <div style={{marginTop:20,background:`linear-gradient(135deg,#1A4A0A,#2E7D32)`,borderRadius:18,padding:22,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.white,marginBottom:5}}>Need help with the job?</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.65)",lineHeight:1.7}}>Hire a pressure washer from £32/day or get free quotes from a verified local patio cleaning professional.</div>
            </div>
            <div style={{display:"flex",gap:9,flexShrink:0,flexWrap:"wrap"}}>
              <button onClick={()=>setTab("patiohire")} className="bp" style={{padding:"10px 18px",background:G.gold,border:"none",borderRadius:11,color:G.ink,fontSize:13,fontWeight:800,cursor:"pointer"}}>Hire Pressure Washer →</button>
              <button onClick={()=>setTab("patioservices")} className="bp" style={{padding:"10px 18px",background:"rgba(255,255,255,.15)",border:"1px solid rgba(255,255,255,.3)",borderRadius:11,color:G.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Book a Pro →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CITY LANDING PAGE ────────────────────────────────────
function CityPage({city,setTab,user,onLoginNeeded}){
  const data = CITY_PAGES[city];
  if(!data) return null;

  const isLiveCity = city==="London"||city==="Milton Keynes";
  const cityShops      = LOCAL_SHOPS.filter(s=>s.city===city);
  const cityCleaners   = CLEANERS.filter(c=>c.city===city);
  const cityPatioShops = PATIO_LOCAL_SHOPS.filter(s=>s.city===city);

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>

        {/* Hero */}
        <div style={{background:`linear-gradient(145deg,${G.forest},${G.dark})`,borderRadius:20,padding:"28px 28px 24px",marginBottom:20,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,opacity:.04,backgroundImage:`radial-gradient(${G.white} 1px,transparent 1px)`,backgroundSize:"24px 24px",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,flexWrap:"wrap"}}>
              <div style={{fontSize:10,fontWeight:800,color:G.light,letterSpacing:2}}>{data.region.toUpperCase()} · CARPET & PATIO CLEANING</div>
              {isLiveCity&&<div style={{display:"flex",alignItems:"center",gap:5,background:"rgba(255,255,255,.15)",borderRadius:20,padding:"2px 10px"}}><div style={{width:6,height:6,borderRadius:"50%",background:"#4CAF50"}}/><span style={{fontSize:9,fontWeight:700,color:G.white}}>LIVE</span></div>}
            </div>
            <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(22px,4vw,34px)",color:G.white,marginBottom:8,lineHeight:1.2}}>
              Carpet and Patio Cleaning<br/>in {data.name}
            </h1>
            <p style={{color:"rgba(255,255,255,.65)",fontSize:13,lineHeight:1.75,maxWidth:520,marginBottom:16}}>{data.hero}</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {[
                [Math.round(data.searches_carpet/1000)+"k","Monthly carpet searches", null],
                [Math.round(data.searches_patio/1000)+"k","Monthly patio searches", null],
                [cityShops.length+cityPatioShops.length,"Local hire shops", "city-hire-shops"],
                [cityCleaners.length,"Verified cleaners", "city-cleaners"],
              ].map(([v,l,anchor])=>(
                <div key={l}
                  onClick={anchor?()=>{const el=document.getElementById(anchor);if(el)el.scrollIntoView({behavior:"smooth",block:"start"});}:undefined}
                  style={{background:"rgba(255,255,255,.1)",borderRadius:10,padding:"8px 14px",textAlign:"center",
                    cursor:anchor?"pointer":"default",
                    transition:"all .15s",
                    ...(anchor?{border:"1px solid rgba(255,255,255,.2)"}:{})}}>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.white}}>{v}</div>
                  <div style={{fontSize:9,color:"rgba(255,255,255,.6)",display:"flex",alignItems:"center",justifyContent:"center",gap:3}}>
                    {l}{anchor&&<span style={{opacity:.6}}>↓</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick action cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20,alignItems:"stretch"}}>
          {[
            {title:"Hire a Machine",   desc:data.carpet_desc.slice(0,80)+"...",  btn:"Compare →",    dest:"hire",        bg:`linear-gradient(135deg,${G.forest},${G.dark})`},
            {title:"Book a Cleaner",   desc:"Get free quotes from "+cityCleaners.length+" verified local professionals.", btn:"Get quotes →", dest:"services",    bg:`linear-gradient(135deg,${G.ink},#2E4030)`},
            {title:"Pressure Washer",  desc:data.patio_desc.slice(0,80)+"...",   btn:"Compare →",    dest:"patiohire",   bg:"linear-gradient(135deg,#1A4A0A,#2E7D32)"},
          ].map(card=>(
            <div key={card.title} onClick={()=>setTab(card.dest)} className="ch"
              style={{background:card.bg,borderRadius:16,padding:18,cursor:"pointer",
                boxShadow:"0 4px 16px rgba(0,0,0,.12)",
                display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
              <div>
                <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:13,color:G.white,marginBottom:6,lineHeight:1.3}}>{card.title}</h3>
                <p style={{fontSize:10,color:"rgba(255,255,255,.65)",lineHeight:1.6,marginBottom:0}}>{card.desc}</p>
              </div>
              <div style={{fontSize:11,fontWeight:700,color:G.light,marginTop:10}}>{card.btn}</div>
            </div>
          ))}
        </div>

        {/* Local hire shops */}
        {cityShops.length>0&&(
          <div id="city-hire-shops" style={{marginBottom:24}}>
            <SLabel t={"LOCAL CARPET HIRE — "+city.toUpperCase()}/>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:12}}>Carpet Machine Hire in {data.name}</h2>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {cityShops.slice(0, isLiveCity ? cityShops.length : 3).map(s=>(
                <div key={s.id} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:16,display:"flex",gap:12,alignItems:"flex-start",flexWrap:"wrap"}}>
                  <div style={{width:44,height:44,borderRadius:12,background:s.col,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:12,flexShrink:0}}>
                    {s.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                  </div>
                  <div style={{flex:1,minWidth:160}}>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",marginBottom:2}}>
                      <span style={{fontWeight:700,color:G.ink,fontSize:14}}>{s.name}</span>
                      {s.verified&&<Pill text="Verified" color={G.forest}/>}
                    </div>
                    <Stars r={s.rating} n={s.reviews}/>
                    <div style={{fontSize:11,color:G.muted,marginTop:2}}>{s.area} · {s.open}</div>
                    <div style={{fontSize:12,color:G.body,marginTop:4,lineHeight:1.6}}>{s.about}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:6}}>{s.machines.map(m=><Chip key={m} green xs>{m}</Chip>)}</div>
                    <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                      <div style={{display:"flex",alignItems:"center",gap:4,background:G.pale,border:`1px solid ${G.border}`,borderRadius:20,padding:"3px 9px"}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:G.forest}}/>
                        <span style={{fontSize:10,fontWeight:700,color:G.forest}}>Free listing</span>
                      </div>
                      <div onClick={()=>setTab("shopapply")} style={{background:"#FFF8E1",border:"1px solid #F9A82566",borderRadius:20,padding:"3px 9px",cursor:"pointer"}}>
                        <span style={{fontSize:10,fontWeight:700,color:"#78540A"}}>Upgrade to Premium →</span>
                      </div>
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.forest}}>£{s.price_from}</div>
                    <div style={{fontSize:10,color:G.muted,marginBottom:6}}>per day</div>
                    <a href={"tel:"+s.phone.replace(/\s/g,"")} style={{display:"block",padding:"7px 12px",background:G.forest,borderRadius:9,color:G.white,fontSize:11,fontWeight:700,textDecoration:"none",textAlign:"center"}}>Call Now</a>
                    <div style={{fontSize:9,color:G.muted,marginTop:3,textAlign:"center"}}>{s.phone}</div>
                  </div>
                </div>
              ))}
              {!isLiveCity&&cityShops.length>3&&(
                <button onClick={()=>setTab("hire")} className="bp" style={{padding:"9px 18px",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  See all {cityShops.length} hire shops →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Professional cleaners */}
        {cityCleaners.length>0&&(
          <div id="city-cleaners" style={{marginBottom:24}}>
            <SLabel t={"PROFESSIONAL CLEANERS — "+city.toUpperCase()}/>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:12}}>Book a Professional Cleaner in {data.name}</h2>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {cityCleaners.slice(0, isLiveCity ? cityCleaners.length : 4).map((cl,i)=>(
                <div key={cl.id} style={{background:G.white,border:`1.5px solid ${i===0?G.dark:G.border}`,borderRadius:14,padding:16,display:"flex",gap:12,alignItems:"flex-start",flexWrap:"wrap"}}>
                  <div style={{width:44,height:44,borderRadius:12,background:cl.col,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:12,flexShrink:0}}>
                    {cl.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                  </div>
                  <div style={{flex:1,minWidth:160}}>
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",marginBottom:2}}>
                      <span style={{fontWeight:700,color:G.ink,fontSize:14}}>{cl.name}</span>
                      {cl.badge&&<span style={{background:G.forest,color:G.white,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20}}>{cl.badge.toUpperCase()}</span>}
                      {cl.verified&&<Pill text="Verified" color={G.forest}/>}
                    </div>
                    <Stars r={cl.rating} n={cl.reviews}/>
                    <div style={{fontSize:11,color:G.muted,marginTop:2}}>{city} · {cl.response} response · {cl.jobs.toLocaleString()} jobs</div>
                    {cl.phone&&cl.phone!=="See listing"&&cl.phone!=="See website"&&cl.phone!=="See Checkatrade"&&(
                      <div style={{fontSize:11,fontWeight:700,color:G.forest,marginTop:2}}>{cl.phone}</div>
                    )}
                    <div style={{fontSize:12,color:G.body,marginTop:4,lineHeight:1.65}}>{cl.about}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:6}}>{cl.services.map(sv=><Chip key={sv} green xs>{sv}</Chip>)}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:11,color:G.muted}}>From</div>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.forest}}>£{cl.from}</div>
                    <div style={{fontSize:10,color:G.muted,marginBottom:8}}>per visit</div>
                    <button onClick={()=>setTab("services")} className="bp"
                      style={{padding:"7px 12px",background:G.forest,border:"none",borderRadius:9,color:G.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                      Get Quote →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patio / pressure washer shops */}
        {cityPatioShops.length>0&&(
          <div style={{marginBottom:24}}>
            <SLabel t={"PRESSURE WASHER HIRE — "+city.toUpperCase()}/>
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:G.ink,marginBottom:12}}>Pressure Washer Hire in {data.name}</h2>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {cityPatioShops.slice(0,isLiveCity?cityPatioShops.length:3).map(s=>(
                <div key={s.id} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:16,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
                  <div style={{width:44,height:44,borderRadius:12,background:s.col,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:900,fontSize:12,flexShrink:0}}>
                    {s.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                  </div>
                  <div style={{flex:1,minWidth:160}}>
                    <div style={{fontWeight:700,color:G.ink,fontSize:14,marginBottom:2}}>{s.name}</div>
                    <Stars r={s.rating} n={s.reviews}/>
                    <div style={{fontSize:11,color:G.muted,marginTop:2}}>{s.area} · From £{s.price_from}/day</div>
                    <div style={{fontSize:11,color:G.body,marginTop:3,lineHeight:1.5}}>{s.about.slice(0,100)}...</div>
                  </div>
                  <a href={"tel:"+s.phone.replace(/\s/g,"")} style={{padding:"8px 14px",background:"#1A4A0A",borderRadius:9,color:G.white,fontSize:11,fontWeight:700,textDecoration:"none",flexShrink:0}}>Call Now</a>
                </div>
              ))}
              {!isLiveCity&&cityPatioShops.length>3&&(
                <button onClick={()=>setTab("patiohire")} className="bp" style={{padding:"9px 18px",background:"#1A4A0A",border:"none",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  See all {cityPatioShops.length} pressure washer shops →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Top areas */}
        <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:18,marginBottom:16}}>
          <SLabel t="TOP AREAS WE COVER"/>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:4}}>
            {data.top_areas.map(a=>(
              <span key={a} style={{background:G.pale,border:`1px solid ${G.border}`,color:G.forest,fontSize:11,fontWeight:600,padding:"5px 12px",borderRadius:20}}>{a}</span>
            ))}
          </div>
          <div style={{marginTop:8,fontSize:11,color:G.muted}}>Also covering: {data.nearby.join(" · ")}</div>
        </div>

        {/* Business CTA */}
        <div style={{background:`linear-gradient(135deg,${G.ink},#1E3520)`,borderRadius:16,padding:20,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:180}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:G.white,marginBottom:4}}>
              Are you a cleaning business in {data.name}?
            </div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.65)",lineHeight:1.65}}>
              {Math.round((data.searches_carpet+data.searches_patio)/1000)}k people search for cleaning in {data.name} every month. Free listing to start.
            </div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",flexShrink:0}}>
            <button onClick={()=>setTab("business")} className="bp"
              style={{padding:"10px 16px",background:G.gold,border:"none",borderRadius:11,color:G.ink,fontSize:12,fontWeight:800,cursor:"pointer"}}>
              List My Business →
            </button>
            <button onClick={()=>setTab("shopapply")} className="bp"
              style={{padding:"10px 16px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:11,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>
              List My Shop →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── FOOTER

// ─── FOOTER ────────────────────────────────────────────────
function BusinessCTA({setTab}){
  return(
    <div style={{background:`linear-gradient(135deg,${G.ink},#1A3020)`,padding:"44px 20px"}}>
      <div style={{maxWidth:860,margin:"0 auto",display:"flex",gap:24,alignItems:"center",flexWrap:"wrap",justifyContent:"space-between"}}>
        <div style={{flex:1,minWidth:240}}>
          <div style={{fontSize:10,fontWeight:800,color:G.bright,letterSpacing:2,marginBottom:10}}>FOR BUSINESSES</div>
          <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,3vw,30px)",color:G.white,marginBottom:10,lineHeight:1.25}}>
            Get your business in front of<br/>customers searching right now
          </h2>
          <p style={{color:"rgba(255,255,255,.55)",fontSize:13,lineHeight:1.8,maxWidth:440}}>
            742,000 people search for carpet cleaning across the UK every month. Get your business in front of customers in London and Milton Keynes from £39/month.
          </p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,flexShrink:0,minWidth:200}}>
          <button onClick={()=>setTab("business")} className="bp"
            style={{padding:"13px 28px",background:G.bright,border:"none",borderRadius:12,color:G.white,
              fontSize:14,fontWeight:800,cursor:"pointer",textAlign:"center",
              boxShadow:"0 6px 20px rgba(76,175,80,.35)"}}>
            List Your Cleaning Service →
          </button>
          <button onClick={()=>setTab("shopapply")} className="bp"
            style={{padding:"13px 28px",background:"rgba(255,255,255,.08)",
              border:"1.5px solid rgba(255,255,255,.2)",borderRadius:12,
              color:G.white,fontSize:14,fontWeight:700,cursor:"pointer",textAlign:"center"}}>
            List Your Hire Shop →
          </button>
          <div style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,.35)"}}>From £39/month · First month free · Cancel anytime</div>
        </div>
      </div>
    </div>
  );
}

function Footer({setTab}){
  const LINKS=[
    [["Hire a Machine","hire"],["Book a Professional","services"],["End of Tenancy","eot"],["Carpet Care Guide","careguide"],["Buyer Guide","guide"]],
    [["Patio Hire","patiohire"],["Patio Cleaning","patioservices"],["Patio Care Guide","patioguide"],["Blog","blog"],["About Us","about"]],
    [["For Businesses","business"],["List Your Shop","shopapply"],["Contact Us","contact"],["Privacy Policy","privacy"],["Affiliate Disclosure","affiliate"],["Sitemap","sitemap"]],
  ];
  return(
    <footer style={{background:G.ink,padding:"40px 20px 24px"}}>
      <div style={{maxWidth:940,margin:"0 auto"}}>
        <div className="threeCol" style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:28,marginBottom:24}}>
          <div>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.white,marginBottom:6}}>Ready <span style={{color:G.bright}}>4</span> Hire</div>
            <p style={{color:G.muted,fontSize:12,lineHeight:1.8,maxWidth:220}}>The UK carpet and outdoor cleaning comparison platform. Always free for consumers.</p>
            <div style={{fontSize:11,color:G.bright,marginTop:8}}>ready4hire.co.uk  ·  ICO ZA123456  ·  FTC Compliant</div>
            <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:5}}>

            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"6px 20px"}}>
            {LINKS.map((col,i)=>(
              <div key={i}>{col.map(([l,t])=>(
                <div key={l} onClick={()=>setTab(t)}
                  style={{fontSize:12,color:G.muted,marginBottom:8,cursor:"pointer",transition:"color .15s"}}
                  onMouseEnter={e=>e.target.style.color=G.light}
                  onMouseLeave={e=>e.target.style.color=G.muted}>
                  {l}
                </div>
              ))}</div>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid #2E4030",paddingTop:16}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:"6px 16px",marginBottom:8,alignItems:"center"}}>
            {[["Privacy Policy","privacy"],["Cookie Policy","cookies"],["Terms of Use","terms"],["Affiliate Disclosure","affiliate"],["Sitemap","sitemap"]].map(([l,t])=>(
              <span key={l} onClick={()=>setTab(t)}
                style={{fontSize:11,color:"#4CAF50",cursor:"pointer",textDecoration:"underline",textUnderlineOffset:2}}>
                {l}
              </span>
            ))}
          </div>
          <div style={{fontSize:11,color:"#3D6640",lineHeight:1.8}}>
            © 2026 Ready 4 Hire Ltd · Registered in England and Wales · Company No. 12345678<br/>
            ICO registered ZA123456 · AWIN Publisher · Amazon Associates UK · We earn commission on bookings and lead fees. This never affects prices you see.
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ──────────────────────────────────────────────────
// ─── CUSTOMER DASHBOARD ───────────────────────────────────
function Dashboard({user,setTab,onSignOut,alerts}){
  const [activeSection,setActiveSection]=useState("overview");

  const GOAL_LABELS={hire:"Machine hire",book:"Book a professional",eot:"End of tenancy",alerts:"Price alerts",returning:"Returning member"};

  const MOCK_ALERTS=[
    {machine:"Rug Doctor Deep Clean",current:29,target:26,status:"watching"},
    {machine:"Bissell ProHeat 2X",current:22,target:19,status:"triggered",triggered:true},
  ];
  const [MOCK_QUOTES,setMockQuotes]=useState([
    {business:"Crystal Clean Pro",date:"12 Mar 2026",status:"Responded",rooms:"Living room, Bedroom"},
    {business:"GreenClean Solutions",date:"10 Mar 2026",status:"Pending",rooms:"Whole house"},
  ]);
  const [MOCK_SAVED,setMockSaved]=useState([
    {name:"Rug Doctor Deep Clean",price:29,badge:"Most Popular"},
    {name:"Bissell ProHeat 2X",price:22,badge:"Best Value"},
  ]);

  return(
    <div style={{background:G.frost,minHeight:"100vh",padding:"28px 16px 80px"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>

        {/* Profile header */}
        <div style={{background:`linear-gradient(135deg,${G.forest},${G.dark})`,borderRadius:20,padding:"26px 28px",marginBottom:22,display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:"rgba(255,255,255,.2)",color:G.white,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Serif Display',serif",fontSize:24,fontWeight:700,flexShrink:0}}>
            {user.name[0].toUpperCase()}
          </div>
          <div style={{flex:1}}>
            <h1 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.white,marginBottom:3}}>Hi, {user.name.split(" ")[0]} 👋</h1>
            <div style={{fontSize:12,color:"rgba(255,255,255,.65)"}}>{user.email}</div>
            {user.goal&&<div style={{marginTop:5}}><span style={{background:"rgba(255,255,255,.15)",color:G.light,fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{GOAL_LABELS[user.goal]||"Member"}</span></div>}
          </div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            {[[alerts||0,"Price Alerts"],[MOCK_QUOTES.length,"Quotes Sent"],[MOCK_SAVED.length,"Saved"]].map(([n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.white}}>{n}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.6)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section tabs */}
        <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:20}}>
          {[["overview","Overview"],["alerts","Price Alerts"],["quotes","My Quotes"],["saved","Saved Machines"],["settings","Settings"]].map(([id,l])=>(
            <button key={id} onClick={()=>setActiveSection(id)} style={{flexShrink:0,padding:"7px 14px",border:`1px solid ${activeSection===id?G.forest:G.border}`,borderRadius:20,cursor:"pointer",fontSize:12,fontWeight:700,background:activeSection===id?G.forest:G.white,color:activeSection===id?G.white:G.muted,transition:"all .15s"}}>{l}</button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeSection==="overview"&&(
          <div className="fu">
            {/* Next step nudge based on goal */}
            <div style={{background:G.white,border:`1.5px solid ${G.forest}`,borderRadius:16,padding:20,marginBottom:16,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
              <div style={{fontSize:32}}>
                ""
              </div>
              <div style={{flex:1,minWidth:160}}>
                <div style={{fontWeight:800,color:G.ink,fontSize:14,marginBottom:3}}>
                  {user.goal==="hire"?"Ready to compare machines?":user.goal==="book"?"Get your free quotes":user.goal==="eot"?"Protect your deposit":user.goal==="alerts"?"Set your first price alert":"Welcome back"}
                </div>
                <div style={{fontSize:12,color:G.muted}}>
                  {user.goal==="hire"?"Compare all 5 machines side by side with live prices and nearby pickup points.":user.goal==="book"?"6 verified, insured professionals ready to quote. Free and no obligation.":user.goal==="eot"?"Our checklist and pro tips will walk you through exactly what landlords check.":"We will email you the moment any machine drops to your target price."}
                </div>
              </div>
              <button onClick={()=>setTab(user.goal==="hire"?"hire":user.goal==="book"?"services":user.goal==="eot"?"eot":"hire")} className="bp" style={{padding:"9px 18px",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>
                {user.goal==="hire"?"Compare Machines →":user.goal==="book"?"Find Cleaners →":user.goal==="eot"?"Open Checklist →":"Set Alert →"}
              </button>
            </div>

            {/* Quick stats grid */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:12,marginBottom:16}}>
              {[["","Active Price Alerts",alerts||0,G.pale,G.forest],["","Quotes Sent",MOCK_QUOTES.length,G.pale,G.forest],["","Saved Machines",MOCK_SAVED.length,G.pale,G.forest],["","Account Status","Verified",G.pale,G.forest]].map(([ic,l,v,bg,col])=>(
                <div key={l} style={{background:bg,border:`1px solid ${G.border}`,borderRadius:13,padding:"15px 16px"}}>
                  <div style={{fontSize:22,marginBottom:6}}></div>
                  <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1,marginBottom:3}}>{l.toUpperCase()}</div>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:col}}>{v}</div>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:18}}>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:13}}>Recent Activity</div>
              {[["Joined Ready 4 Hire","Just now",""],["Welcome email sent","Just now",""],["Buyer guide unlocked","Just now",""]].map(([a,t,ic])=>(
                <div key={a} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:`1px solid ${G.border}`,alignItems:"center"}}>
                  <span style={{fontSize:16}}></span>
                  <div style={{flex:1,fontSize:12,color:G.body}}>{a}</div>
                  <div style={{fontSize:11,color:G.muted}}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PRICE ALERTS ── */}
        {activeSection==="alerts"&&(
          <div className="fu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.ink}}>Your Price Alerts</h2>
              <button onClick={()=>setTab("hire")} style={{padding:"7px 14px",background:G.forest,border:"none",borderRadius:9,color:G.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>+ Add Alert</button>
            </div>
            {MOCK_ALERTS.length===0?(
              <div style={{textAlign:"center",padding:"40px 20px",color:G.muted}}>
                
                <div style={{fontWeight:600,marginBottom:6}}>No price alerts yet</div>
                <div style={{fontSize:12}}>Go to a machine card and tap the Alert button</div>
              </div>
            ):MOCK_ALERTS.map((a,i)=>(
              <div key={i} style={{background:a.triggered?G.pale:G.white,border:`1.5px solid ${a.triggered?G.forest:G.border}`,borderRadius:13,padding:16,marginBottom:10}}>
                {a.triggered&&<div style={{fontSize:10,fontWeight:800,color:G.forest,letterSpacing:1,marginBottom:6}}>PRICE DROPPED — CHECK NOW</div>}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:G.ink,marginBottom:3}}>{a.machine}</div>
                    <div style={{fontSize:12,color:G.muted}}>Target: £{a.target}/day · Current: <strong style={{color:a.triggered?G.forest:G.body}}>£{a.current}/day</strong></div>
                  </div>
                  <div style={{display:"flex",gap:7}}>
                    <button onClick={()=>setTab("hire")} style={{padding:"6px 13px",background:a.triggered?G.forest:G.pale,border:`1px solid ${a.triggered?G.forest:G.border}`,borderRadius:9,color:a.triggered?G.white:G.forest,fontSize:11,fontWeight:700,cursor:"pointer"}}>
                      {a.triggered?"Book Now →":"View Machine"}
                    </button>
                    <button style={{padding:"6px 13px",background:G.white,border:`1px solid ${G.border}`,borderRadius:9,color:G.muted,fontSize:11,cursor:"pointer"}}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MY QUOTES ── */}
        {activeSection==="quotes"&&(
          <div className="fu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.ink}}>Your Quote Requests</h2>
              <button onClick={()=>setTab("services")} style={{padding:"7px 14px",background:G.forest,border:"none",borderRadius:9,color:G.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>+ New Quote</button>
            </div>
            {MOCK_QUOTES.length===0&&(
              <div style={{textAlign:"center",padding:"32px 0",color:G.muted,fontSize:13}}>No quote requests yet. <span style={{color:G.forest,cursor:"pointer",fontWeight:700}} onClick={()=>setTab("services")}>Find a professional →</span></div>
            )}
            {MOCK_QUOTES.map((q,i)=>(
              <div key={i} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:13,padding:16,marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:13,color:G.ink,marginBottom:3}}>{q.business}</div>
                    <div style={{fontSize:11,color:G.muted,marginBottom:4}}>{q.rooms} · Sent {q.date}</div>
                    <span style={{background:q.status==="Responded"?G.pale:G.amber,color:q.status==="Responded"?G.forest:"#78540A",fontSize:10,fontWeight:700,padding:"2px 9px",borderRadius:20,border:`1px solid ${q.status==="Responded"?G.border:"#FFD54F"}`}}>{q.status}</span>
                  </div>
                  <div style={{display:"flex",gap:6,flexShrink:0}}>
                    <button onClick={()=>setTab("services")} style={{padding:"7px 11px",background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,color:G.forest,fontSize:11,fontWeight:700,cursor:"pointer"}}>View Details →</button>
                    <button onClick={()=>setMockQuotes(prev=>prev.filter((_,j)=>j!==i))} style={{padding:"7px 11px",background:"#FFEBEE",border:"1px solid #FFCDD2",borderRadius:9,color:"#C62828",fontSize:11,fontWeight:600,cursor:"pointer"}}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SAVED MACHINES ── */}
        {activeSection==="saved"&&(
          <div className="fu">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.ink}}>Saved Machines</h2>
              <button onClick={()=>setTab("hire")} style={{padding:"7px 14px",background:G.forest,border:"none",borderRadius:9,color:G.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>Browse All →</button>
            </div>
            {MOCK_SAVED.map((s,i)=>(
              <div key={i} style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:13,padding:16,marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:G.ink,marginBottom:3}}>{s.name}</div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    <span style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.forest}}>£{s.price}/day</span>
                    <span style={{background:G.pale,color:G.forest,fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,border:`1px solid ${G.border}`}}>{s.badge}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:7}}>
                  <button onClick={()=>setTab("hire")} style={{padding:"7px 13px",background:G.forest,border:"none",borderRadius:9,color:G.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>Book Now →</button>
                  <button onClick={()=>setMockSaved(prev=>prev.filter((_,j)=>j!==i))} style={{padding:"7px 13px",background:"#FFEBEE",border:"1px solid #FFCDD2",borderRadius:9,color:"#C62828",fontSize:11,fontWeight:600,cursor:"pointer"}}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeSection==="settings"&&(
          <div className="fu">
            <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.ink,marginBottom:16}}>Account Settings</h2>
            <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:20,marginBottom:14}}>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:13}}>Personal Details</div>
              {[["YOUR NAME","text",user.name],["EMAIL ADDRESS","email",user.email]].map(([l,t,v])=>(
                <div key={l} style={{marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>{l}</div>
                  <input defaultValue={v} type={t} style={inp}/>
                </div>
              ))}
              <button className="bp" style={{padding:"9px 20px",background:G.forest,border:"none",borderRadius:10,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Save Changes</button>
            </div>
            <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:20,marginBottom:14}}>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:13}}>Email Preferences</div>
              {[["Price drop alerts","Email me when a machine hits my target price",true],["Quote updates","Notify me when a professional responds",true],["Tips & guides","Weekly carpet care tips and seasonal offers",false]].map(([l,d,def])=>(
                <label key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,padding:"10px 0",borderBottom:`1px solid ${G.border}`,cursor:"pointer"}}>
                  <div><div style={{fontSize:13,fontWeight:600,color:G.ink,marginBottom:2}}>{l}</div><div style={{fontSize:11,color:G.muted}}>{d}</div></div>
                  <input type="checkbox" defaultChecked={def} style={{accentColor:G.forest,width:16,height:16,flexShrink:0,marginTop:2}}/>
                </label>
              ))}
            </div>
            <div style={{background:G.white,border:`1px solid ${G.border}`,borderRadius:14,padding:20}}>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:4}}>Data and Privacy</div>
              <p style={{fontSize:12,color:G.muted,lineHeight:1.7,marginBottom:13}}>Your data is stored securely and never sold to third parties. ICO registered ZA123456. You can request a full copy or deletion of your data at any time.</p>
              <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
                <button onClick={()=>{
                  const d={name:user.name,email:user.email,exported:new Date().toISOString()};
                  const a=document.createElement("a");
                  a.href="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(d,null,2));
                  a.download="my-ready4hire-data.json";a.click();
                }} style={{padding:"7px 14px",background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,color:G.forest,fontSize:11,fontWeight:700,cursor:"pointer"}}>Download My Data</button>
                <button onClick={onSignOut} style={{padding:"7px 14px",background:G.orangeLight,border:"1px solid #FFCC80",borderRadius:9,color:G.orange,fontSize:11,fontWeight:700,cursor:"pointer"}}>Sign Out</button>
                <button onClick={()=>{if(window.confirm("Are you sure? This will permanently delete your account and all data.")){onSignOut();}}} style={{padding:"7px 14px",background:"#FFEBEE",border:"1px solid #FFCDD2",borderRadius:9,color:"#C62828",fontSize:11,fontWeight:700,cursor:"pointer"}}>Delete Account</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COOKIE CONSENT BANNER ─────────────────────────────────
function CookieBanner({onAccept,onDecline}){
  return(
    <div style={{position:"fixed",bottom:64,left:0,right:0,zIndex:400,padding:"0 12px"}}>
      <div className="fu" style={{maxWidth:700,margin:"0 auto",background:G.ink,borderRadius:16,padding:"16px 20px",display:"flex",gap:14,alignItems:"center",flexWrap:"wrap",boxShadow:"0 8px 32px rgba(0,0,0,.22)"}}>
        
        <div style={{flex:1,minWidth:200}}>
          <div style={{fontWeight:700,color:G.white,fontSize:13,marginBottom:2}}>We use cookies</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.6)",lineHeight:1.6}}>
            We use essential cookies to make this site work, and optional analytics cookies to improve it. We never use cookies for advertising. See our <span style={{color:G.light,cursor:"pointer",textDecoration:"underline"}}>Privacy Policy</span>.
          </div>
        </div>
        <div style={{display:"flex",gap:8,flexShrink:0}}>
          <button onClick={onDecline} style={{padding:"7px 14px",background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:9,color:"rgba(255,255,255,.7)",fontSize:11,fontWeight:600,cursor:"pointer"}}>Essential only</button>
          <button onClick={onAccept} className="bp" style={{padding:"7px 14px",background:G.bright,border:"none",borderRadius:9,color:G.white,fontSize:11,fontWeight:800,cursor:"pointer"}}>Accept all</button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ───────────────────────────────────────────
const ADMIN_EMAIL = "admin@ready4hire.co.uk";
const ADMIN_PASS  = "R4H@dmin2026!";

function AdminPanel({onExit}){
  const [section,setSection]=useState("overview");
  const [cleanerList,setCleanerList]=useState(CLEANERS.map(c=>({...c,plan:c.plan||"free",pendingApproval:false})));
  const [shopList,setShopList]=useState(LOCAL_SHOPS.map(s=>({...s,plan:s.plan||"free",pendingApproval:false})));
  const [eotList,setEotList]=useState(EOT_BUSINESSES.map(b=>({...b,plan:"free",pendingApproval:false})));
  const [search,setSearch]=useState("");
  const [confirmDelete,setConfirmDelete]=useState(null);
  const [activeCategory,setActiveCategory]=useState("cleaners");

  // Simulated pending approvals (in production these come from DB)
  const PENDING=[
    {id:"p1",name:"Green Carpet Care Sheffield",type:"cleaner",city:"Sheffield",submitted:"18 Mar 2026",plan:"standard"},
    {id:"p2",name:"ProWash Solutions Leeds",type:"shop",city:"Leeds",submitted:"19 Mar 2026",plan:"premium"},
    {id:"p3",name:"Bath EOT Specialists",type:"eot",city:"Bath",submitted:"19 Mar 2026",plan:"standard"},
  ];

  // Revenue simulation (in production from payment processor)
  const REVENUE={
    thisMonth:1247,
    lastMonth:986,
    growth:26.5,
    byPackage:[
      {name:"Premium Listing",count:4,mrr:196,color:"#F5A800"},
      {name:"Standard Listing",count:22,mrr:858,color:G.forest},
      {name:"Lead Fees",count:18,mrr:193,color:"#1565C0"},
    ],
    byCity:[
      {city:"London",revenue:412,listings:10},
      {city:"Milton Keynes",revenue:287,listings:7},
      {city:"Birmingham",revenue:198,listings:8},
      {city:"Manchester",revenue:176,listings:7},
      {city:"Leeds",revenue:174,listings:7},
    ],
    busiestMonths:["January","March","September","October"],
  };

  const counts={
    "Carpet Cleaners":CLEANERS.length,
    "EOT Specialists":EOT_BUSINESSES.length,
    "Patio Cleaners":PATIO_CLEANERS.length,
    "Carpet Hire Shops":LOCAL_SHOPS.length,
    "Patio Hire Shops":PATIO_LOCAL_SHOPS.length,
  };
  const grandTotal=Object.values(counts).reduce((a,b)=>a+b,0);

  const filteredCleaners=cleanerList.filter(c=>c&&c.name&&(c.name.toLowerCase().includes(search.toLowerCase())||(c.city&&c.city.toLowerCase().includes(search.toLowerCase()))));
  const filteredShops=shopList.filter(s=>s&&s.name&&(s.name.toLowerCase().includes(search.toLowerCase())||(s.city&&s.city.toLowerCase().includes(search.toLowerCase()))));
  const filteredEot=eotList.filter(b=>b&&b.name&&(b.name.toLowerCase().includes(search.toLowerCase())||(b.city&&b.city.toLowerCase().includes(search.toLowerCase()))));

  const deleteItem=(type,id)=>{
    if(type==="cleaner")setCleanerList(prev=>prev.filter(c=>c.id!==id));
    else if(type==="shop")setShopList(prev=>prev.filter(s=>s.id!==id));
    else setEotList(prev=>prev.filter(b=>b.id!==id));
    setConfirmDelete(null);
  };
  const toggleVerified=(type,id)=>{
    if(type==="cleaner")setCleanerList(prev=>prev.map(c=>c.id===id?{...c,verified:!c.verified}:c));
    else if(type==="shop")setShopList(prev=>prev.map(s=>s.id===id?{...s,verified:!s.verified}:s));
    else setEotList(prev=>prev.map(b=>b.id===id?{...b,verified:!b.verified}:b));
  };

  const TABS=[["overview","Overview"],["revenue","Revenue"],["pending","Pending ("+PENDING.length+")"],["cleaners","Carpet Cleaners"],["eot","EOT"],["shops","Hire Shops"],["patio","Patio Cleaners"]];

  const ListingRow=({item,type})=>(
    <div style={{background:G.white,borderRadius:11,padding:"11px 14px",display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",border:`1px solid ${item.verified?G.border:"#FFCDD2"}`,boxShadow:"0 1px 3px rgba(0,0,0,.04)",marginBottom:7}}>
      <div style={{width:34,height:34,borderRadius:8,background:item.col||G.forest,display:"flex",alignItems:"center",justifyContent:"center",color:G.white,fontWeight:800,fontSize:10,flexShrink:0}}>{item.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}</div>
      <div style={{flex:1,minWidth:120}}>
        <div style={{fontWeight:700,fontSize:12,color:G.ink}}>{item.name}</div>
        <div style={{fontSize:10,color:G.muted}}>{item.city} · {item.phone&&item.phone!=="See website"?item.phone:"No phone"}</div>
      </div>
      <span style={{fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,background:item.plan==="premium"?"#FFF8E1":item.plan==="standard"?G.pale:"#F5F5F5",color:item.plan==="premium"?"#78540A":item.plan==="standard"?G.forest:G.muted,border:`1px solid ${item.plan==="premium"?"#F9A82544":item.plan==="standard"?G.border:"#E0E0E0"}`}}>{(item.plan||"free").toUpperCase()}</span>
      <div style={{display:"flex",gap:5,flexShrink:0}}>
        <button onClick={()=>toggleVerified(type,item.id)} style={{padding:"4px 9px",background:item.verified?G.pale:"#FFF8E1",border:`1px solid ${item.verified?G.forest:"#F9A825"}`,borderRadius:6,color:item.verified?G.forest:"#78540A",fontSize:9,fontWeight:700,cursor:"pointer"}}>{item.verified?"✓ Verified":"Unverified"}</button>
        <button onClick={()=>setConfirmDelete({type,id:item.id,name:item.name})} style={{padding:"4px 9px",background:"#FFEBEE",border:"1px solid #FFCDD2",borderRadius:6,color:"#C62828",fontSize:9,fontWeight:700,cursor:"pointer"}}>Delete</button>
      </div>
    </div>
  );

  return(
    <div style={{background:"#F5F5F5",minHeight:"100vh",fontFamily:"system-ui,sans-serif"}}>
      {/* Admin nav */}
      <div style={{background:G.ink,padding:"0 16px",height:50,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:15,color:G.white}}>Ready <span style={{color:G.gold}}>4</span> Hire</div>
          <div style={{background:"#E65100",color:G.white,fontSize:8,fontWeight:800,padding:"2px 7px",borderRadius:20,letterSpacing:1}}>ADMIN</div>
        </div>
        <button onClick={onExit} style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:7,color:G.white,fontSize:11,fontWeight:600,padding:"4px 10px",cursor:"pointer"}}>← Exit Admin</button>
      </div>

      {/* Tabs */}
      <div style={{background:G.white,borderBottom:`1px solid ${G.border}`,padding:"0 16px",overflowX:"auto"}}>
        <div style={{display:"flex",gap:2,maxWidth:1000,margin:"0 auto"}}>
          {TABS.map(([s,l])=>(
            <button key={s} onClick={()=>setSection(s)}
              style={{padding:"12px 14px",background:"none",border:"none",borderBottom:`2px solid ${section===s?G.forest:"transparent"}`,color:section===s?G.forest:G.muted,fontSize:12,fontWeight:section===s?700:400,cursor:"pointer",whiteSpace:"nowrap"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1000,margin:"0 auto",padding:"16px"}}>

        {/* ── OVERVIEW ── */}
        {section==="overview"&&(
          <div>
            {/* Business counts */}
            <div style={{background:G.white,borderRadius:12,padding:16,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:12}}>Listings by Category</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:8}}>
                {Object.entries(counts).map(([label,count])=>(
                  <div key={label} style={{background:G.frost,borderRadius:9,padding:"12px 14px",borderLeft:`3px solid ${G.forest}`}}>
                    <div style={{fontSize:22,fontWeight:800,color:G.forest}}>{count}</div>
                    <div style={{fontSize:10,color:G.muted,marginTop:2}}>{label}</div>
                  </div>
                ))}
                <div style={{background:G.ink,borderRadius:9,padding:"12px 14px"}}>
                  <div style={{fontSize:22,fontWeight:800,color:G.gold}}>{grandTotal}</div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.6)",marginTop:2}}>Grand Total</div>
                </div>
              </div>
            </div>

            {/* Quick revenue snapshot */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div style={{background:G.white,borderRadius:12,padding:16,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1,marginBottom:6}}>THIS MONTH MRR</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:G.forest}}>£{REVENUE.thisMonth.toLocaleString()}</div>
                <div style={{fontSize:11,color:G.bright,marginTop:2}}>↑ {REVENUE.growth}% vs last month</div>
              </div>
              <div style={{background:G.white,borderRadius:12,padding:16,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1,marginBottom:6}}>PENDING APPROVALS</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:PENDING.length>0?"#E65100":G.forest}}>{PENDING.length}</div>
                <button onClick={()=>setSection("pending")} style={{fontSize:11,color:G.forest,background:"none",border:"none",cursor:"pointer",padding:0,marginTop:4}}>Review now →</button>
              </div>
            </div>

            {/* City breakdown */}
            <div style={{background:G.white,borderRadius:12,padding:16,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:10}}>Top Cities by Listings</div>
              {Object.entries(
                CLEANERS.concat(LOCAL_SHOPS).concat(EOT_BUSINESSES).reduce((acc,b)=>{acc[b.city]=(acc[b.city]||0)+1;return acc;},{})
              ).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([city,n])=>(
                <div key={city} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${G.border}`,fontSize:12}}>
                  <span style={{color:G.body}}>{city}</span>
                  <span style={{fontWeight:700,color:G.forest}}>{n} listings</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REVENUE ── */}
        {section==="revenue"&&(
          <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10,marginBottom:14}}>
              {[["This Month",`£${REVENUE.thisMonth}`,`↑ ${REVENUE.growth}% growth`,G.forest],["Last Month",`£${REVENUE.lastMonth}`,"Baseline",G.muted],["Avg/Listing",`£${Math.round(REVENUE.thisMonth/26)}`,"Per paying listing",G.ink]].map(([l,v,s,col])=>(
                <div key={l} style={{background:G.white,borderRadius:12,padding:16,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
                  <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1,marginBottom:6}}>{l.toUpperCase()}</div>
                  <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:col}}>{v}</div>
                  <div style={{fontSize:11,color:G.bright,marginTop:3}}>{s}</div>
                </div>
              ))}
            </div>

            <div style={{background:G.white,borderRadius:12,padding:16,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:12}}>Revenue by Package</div>
              {REVENUE.byPackage.map(pkg=>(
                <div key={pkg.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${G.border}`}}>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:pkg.color}}/>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:G.ink}}>{pkg.name}</div>
                      <div style={{fontSize:11,color:G.muted}}>{pkg.count} active</div>
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:pkg.color}}>£{pkg.mrr}</div>
                    <div style={{fontSize:10,color:G.muted}}>this month</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:G.white,borderRadius:12,padding:16,marginBottom:14,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
              <div style={{fontWeight:700,color:G.ink,fontSize:13,marginBottom:12}}>Revenue by City (Top 5)</div>
              {REVENUE.byCity.map(c=>(
                <div key={c.city} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${G.border}`,fontSize:12}}>
                  <div><span style={{fontWeight:600,color:G.ink}}>{c.city}</span><span style={{color:G.muted,marginLeft:8}}>{c.listings} listings</span></div>
                  <span style={{fontWeight:700,color:G.forest}}>£{c.revenue}/mo</span>
                </div>
              ))}
            </div>

            <div style={{background:G.pale,border:`1px solid ${G.border}`,borderRadius:12,padding:14}}>
              <div style={{fontWeight:700,color:G.forest,fontSize:12,marginBottom:6}}>Peak Business Months</div>
              <div style={{fontSize:12,color:G.body,lineHeight:1.7}}>EOT and carpet cleaning enquiries peak in <strong>{REVENUE.busiestMonths.join(", ")}</strong> — plan marketing campaigns and premium listing promotions around these months.</div>
            </div>
          </div>
        )}

        {/* ── PENDING APPROVALS ── */}
        {section==="pending"&&(
          <div>
            <div style={{fontWeight:700,color:G.ink,fontSize:14,marginBottom:14}}>{PENDING.length} businesses awaiting approval</div>
            {PENDING.length===0&&<div style={{color:G.muted,fontSize:13,padding:"24px 0"}}>No pending approvals. ✓</div>}
            {PENDING.map(p=>(
              <div key={p.id} style={{background:G.white,borderRadius:12,padding:16,marginBottom:10,border:"1px solid #FFCC80",boxShadow:"0 2px 6px rgba(0,0,0,.05)"}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:G.ink,marginBottom:3}}>{p.name}</div>
                    <div style={{fontSize:11,color:G.muted}}>{p.city} · {p.type} · Submitted {p.submitted}</div>
                    <span style={{background:"#FFF8E1",color:"#78540A",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20,border:"1px solid #F9A82544",marginTop:6,display:"inline-block"}}>{p.plan.toUpperCase()} PLAN</span>
                  </div>
                  <div style={{display:"flex",gap:8,flexShrink:0}}>
                    <button style={{padding:"7px 14px",background:G.forest,border:"none",borderRadius:9,color:G.white,fontSize:11,fontWeight:700,cursor:"pointer"}}>✓ Approve</button>
                    <button style={{padding:"7px 14px",background:"#FFEBEE",border:"1px solid #FFCDD2",borderRadius:9,color:"#C62828",fontSize:11,fontWeight:700,cursor:"pointer"}}>✗ Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search bar for listings */}
        {["cleaners","shops","eot","patio"].includes(section)&&(
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or city..."
            style={{width:"100%",padding:"10px 14px",border:`1px solid ${G.border}`,borderRadius:10,fontSize:13,marginBottom:12,boxSizing:"border-box",outline:"none"}}/>
        )}

        {/* ── CARPET CLEANERS ── */}
        {section==="cleaners"&&(
          <div>
            <div style={{fontSize:11,color:G.muted,marginBottom:10}}>{filteredCleaners.length} carpet cleaning businesses</div>
            {filteredCleaners.map(c=><ListingRow key={c.id} item={c} type="cleaner"/>)}
          </div>
        )}

        {/* ── EOT ── */}
        {section==="eot"&&(
          <div>
            <div style={{fontSize:11,color:G.muted,marginBottom:10}}>{filteredEot.length} EOT specialists</div>
            {filteredEot.map(b=><ListingRow key={b.id} item={b} type="eot"/>)}
          </div>
        )}

        {/* ── HIRE SHOPS ── */}
        {section==="shops"&&(
          <div>
            <div style={{fontSize:11,color:G.muted,marginBottom:10}}>{filteredShops.length} carpet hire shops</div>
            {filteredShops.map(s=><ListingRow key={s.id} item={s} type="shop"/>)}
          </div>
        )}

        {/* ── PATIO CLEANERS ── */}
        {section==="patio"&&(
          <div>
            <div style={{fontSize:11,color:G.muted,marginBottom:10}}>{PATIO_CLEANERS.length} patio cleaning businesses</div>
            {PATIO_CLEANERS.map(c=><ListingRow key={c.id} item={c} type="patio"/>)}
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {confirmDelete&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500,padding:20}}>
          <div style={{background:G.white,borderRadius:16,padding:24,maxWidth:340,width:"100%"}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:18,color:G.ink,marginBottom:8}}>Confirm Delete</div>
            <p style={{fontSize:13,color:G.muted,lineHeight:1.7,marginBottom:16}}>Delete <strong>{confirmDelete.name}</strong>? This cannot be undone.</p>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>setConfirmDelete(null)} style={{flex:1,padding:"9px 0",background:G.pale,border:`1px solid ${G.border}`,borderRadius:9,color:G.body,fontSize:12,fontWeight:700,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>deleteItem(confirmDelete.type,confirmDelete.id)} style={{flex:1,padding:"9px 0",background:"#C62828",border:"none",borderRadius:9,color:G.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function AdminLogin({onSuccess}){
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");
  const attempt=()=>{
    if(email===ADMIN_EMAIL&&pass===ADMIN_PASS){onSuccess();}
    else{setErr("Incorrect credentials");}
  };
  return(
    <div style={{minHeight:"100vh",background:"#F5F5F5",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:G.white,borderRadius:20,padding:32,maxWidth:360,width:"100%",boxShadow:"0 24px 64px rgba(0,0,0,.12)"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:G.forest}}>Ready <span style={{color:G.gold}}>4</span> Hire</div>
          <div style={{background:"#E65100",color:G.white,fontSize:9,fontWeight:800,padding:"2px 10px",borderRadius:20,letterSpacing:1,display:"inline-block",marginTop:6}}>ADMIN ACCESS</div>
        </div>
        <div style={{marginBottom:12}}>
          <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>EMAIL</div>
          <input value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} type="email" placeholder="admin@ready4hire.co.uk"
            style={{width:"100%",padding:"10px 13px",border:`1px solid ${G.border}`,borderRadius:10,fontSize:13,boxSizing:"border-box",outline:"none"}}/>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:10,fontWeight:700,color:G.muted,letterSpacing:1.5,marginBottom:4}}>PASSWORD</div>
          <input value={pass} onChange={e=>{setPass(e.target.value);setErr("");}} type="password" placeholder="••••••••"
            onKeyDown={e=>e.key==="Enter"&&attempt()}
            style={{width:"100%",padding:"10px 13px",border:`1px solid ${err?"#C62828":G.border}`,borderRadius:10,fontSize:13,boxSizing:"border-box",outline:"none"}}/>
          {err&&<div style={{fontSize:11,color:"#C62828",marginTop:4}}>{err}</div>}
        </div>
        <button onClick={attempt} style={{width:"100%",padding:"12px 0",background:G.forest,border:"none",borderRadius:11,color:G.white,fontSize:14,fontWeight:800,cursor:"pointer"}}>Sign In to Admin →</button>
        <div style={{marginTop:12,fontSize:11,color:G.muted,textAlign:"center"}}>Authorised personnel only</div>
      </div>
    </div>
  );
}
function AuthModal({mode, onClose, onAuth}){
const [tab, setTab] = useState(mode==="signup" ? "signup" : "signin");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [name, setName] = useState("");
const [role, setRole] = useState("user");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const [done, setDone] = useState(false);
  const styles = {
    overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20},
    card:{background:"#fff",borderRadius:20,width:"100%",maxWidth:420,overflow:"hidden",boxShadow:"0 12px 48px rgba(0,0,0,0.18)"},
    header:{background:G.forest,padding:"28px 32px 24px",textAlign:"center"},
    logo:{fontFamily:"'DM Serif Display',serif",fontSize:24,color:"#fff"},
    body:{padding:"28px 32px 32px"},
    tabRow:{display:"flex",background:"#F3F4F6",borderRadius:10,padding:4,marginBottom:24,gap:4},
    tabBtn:(active)=>({flex:1,padding:"8px 12px",border:"none",background:active?"#fff":"transparent",borderRadius:8,fontFamily:"inherit",fontSize:14,fontWeight:500,color:active?G.forest:"#6B7280",cursor:"pointer",boxShadow:active?"0 1px 6px rgba(0,0,0,0.1)":"none"}),
    field:{marginBottom:16},
    label:{display:"block",fontSize:13,fontWeight:500,marginBottom:6,color:G.ink},
    input:{width:"100%",padding:"10px 13px",border:"1.5px solid #E5E7EB",borderRadius:10,fontFamily:"inherit",fontSize:14,outline:"none",boxSizing:"border-box"},
    roleRow:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16},
    roleCard:(sel)=>({border:`1.5px solid ${sel?G.forest:"#E5E7EB"}`,borderRadius:12,padding:"12px 10px",cursor:"pointer",textAlign:"center",background:sel?"#F0FBF0":"#fff"}),
    btn:{width:"100%",padding:12,background:G.forest,color:"#fff",border:"none",borderRadius:10,fontFamily:"inherit",fontSize:15,fontWeight:600,cursor:"pointer",marginTop:4},
    err:{background:"#FEF2F2",color:"#DC2626",border:"1px solid #FCA5A5",borderRadius:8,padding:"9px 13px",fontSize:13,marginBottom:14},
    success:{background:"#F0FDF4",color:"#16A34A",border:"1px solid #86EFAC",borderRadius:8,padding:"9px 13px",fontSize:13,marginBottom:14},
  };

  async function handleSubmit(e){
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if(tab==="signin"){
        const {data,error:err} = await window._supabase.auth.signInWithPassword({email,password});
        if(err) throw err;
        onAuth(data.user);
        onClose();
      } else {
        const {data,error:err} = await window._supabase.auth.signUp({
          email, password,
          options:{data:{full_name:name, role}}
        });
        if(err) throw err;
        setDone(true);
      }
    } catch(err){
      setError(err.message);
    }
    setLoading(false);
  }

  return(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.card} onClick={e=>e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.logo}>Ready <span style={{color:G.gold}}>4</span> Hire</div>
        </div>
        <div style={styles.body}>
          <div style={styles.tabRow}>
            <button style={styles.tabBtn(tab==="signin")} onClick={()=>setTab("signin")}>Sign In</button>
            <button style={styles.tabBtn(tab==="signup")} onClick={()=>setTab("signup")}>Create Account</button>
          </div>
          {done ? (
            <div style={styles.success}>Account created! Check your email to confirm, then sign in.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div style={styles.err}>{error}</div>}
              {tab==="signup" && (
                <>
                  <div style={styles.field}>
                    <label style={styles.label}>Full name</label>
                    <input style={styles.input} value={name} onChange={e=>setName(e.target.value)} placeholder="Jane Smith" required/>
                  </div>
                  <div style={styles.roleRow}>
                    <div style={styles.roleCard(role==="user")} onClick={()=>setRole("user")}>
                      <div style={{fontSize:22,marginBottom:4}}>🏠</div>
                      <div style={{fontSize:13,fontWeight:600}}>Customer</div>
                      <div style={{fontSize:11,color:"#6B7280"}}>Looking for services</div>
                    </div>
                    <div style={styles.roleCard(role==="business_owner")} onClick={()=>setRole("business_owner")}>
                      <div style={{fontSize:22,marginBottom:4}}>🏢</div>
                      <div style={{fontSize:13,fontWeight:600}}>Business Owner</div>
                      <div style={{fontSize:11,color:"#6B7280"}}>List my services</div>
                    </div>
                  </div>
                </>
              )}
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input style={styles.input} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <input style={styles.input} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required/>
              </div>
              <button style={styles.btn} disabled={loading}>
                {loading ? "Please wait…" : tab==="signin" ? "Sign In" : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
// ─── ROOT ─────────────────────────────────────────────────
export default function App(){
  const [adminLoggedIn,setAdminLoggedIn]=useState(false);
  const [tab,setTab]=useState("home");
  const [user,setUser]=useState(null);
  const [authOpen,setAuthOpen]=useState(null);
  const [alertCount,setAlertCount]=useState(0);
  const [cookieConsent,setCookieConsent]=useState(null);
  const [siteOn,setSiteOn]=useState(true); // maintenance toggle

  // Check URL for ?admin flag
  const isAdminMode = typeof window!=="undefined"&&window.location.search.includes("admin");

  // GA page tracking
  const trackPage = (pageName) => {
    if(typeof window!=="undefined"&&window.gtag){
      window.gtag("event","page_view",{page_title:pageName,page_location:window.location.href});
    }
  };

  // REGION: UK live.
  const R=REGIONS["UK"];

  const handleAuth=(u)=>{
    setUser(u);setAuthOpen(null);
    if(u.goal==="hire")    setTab("hire");
    else if(u.goal==="book")   setTab("services");
    else if(u.goal==="eot")    setTab("eot");
    else if(u.goal==="alerts") setTab("hire");
    else setTab("dashboard");
  };
  const handleSignOut=()=>{ setUser(null); setTab("home"); setAlertCount(0); };

  // Admin mode
  if(isAdminMode){
    if(!adminLoggedIn) return <AdminLogin onSuccess={()=>setAdminLoggedIn(true)}/>;
    return <AdminPanel onExit={()=>{ setAdminLoggedIn(false); window.location.search=""; }}/>;
  }

  // Maintenance mode screen
  if(!siteOn) return(
    <div style={{minHeight:"100vh",background:G.ink,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{textAlign:"center",maxWidth:400}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:32,color:G.white,marginBottom:8}}>Ready <span style={{color:G.gold}}>4</span> Hire</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.55)",marginBottom:32,lineHeight:1.7}}>We are making some improvements. Back shortly.</div>
        {/* Hidden admin toggle — triple tap */}
        <button onDoubleClick={()=>setSiteOn(true)} style={{background:"none",border:"none",color:"rgba(255,255,255,.1)",fontSize:10,cursor:"pointer"}}>ready4hire.co.uk</button>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:G.frost}}>
      <style>{CSS}</style>
      <Nav tab={tab} setTab={setTab} user={user} setAuthOpen={setAuthOpen} alertCount={alertCount}
        onSignOut={handleSignOut} onDashboard={()=>setTab("dashboard")}/>
      {tab==="home"      &&<HomePage setTab={setTab} R={R}/>}
      {tab==="hire"      &&<HirePage user={user} onLoginNeeded={()=>setAuthOpen("register")} addAlert={()=>setAlertCount(c=>c+1)} setTab={setTab} R={R}/>}
      {tab==="services"  &&<ServicesPage user={user} onLoginNeeded={()=>setAuthOpen("register")} R={R}/>}
      {tab==="eot"       &&<EOTPage  setTab={setTab} user={user} onLoginNeeded={()=>setAuthOpen("register")} R={R}/>}
      {tab==="guide"     &&<Guide setTab={setTab}/>}
      {tab==="careguide"  &&<CarpetCareGuide setTab={setTab}/>}
      {tab==="business"  &&<BusinessPage/>}
      {tab==="shopapply" &&<ShopApplyPage/>}
      {tab==="dashboard" &&(user?<Dashboard user={user} setTab={setTab} onSignOut={handleSignOut} alerts={alertCount}/>:<Home setTab={setTab} R={R}/>)}
      {tab==="patiohire"    &&<PatioHirePage    user={user} onLoginNeeded={()=>setAuthOpen("register")} addAlert={()=>setAlertCount(c=>c+1)} setTab={setTab}/>}
      {tab==="patioservices" &&<PatioServicesPage user={user} onLoginNeeded={()=>setAuthOpen("register")}/>}
      {tab==="patioguide"    &&<PatioGuide        setTab={setTab}/>}
      {tab==="about"     &&<AboutPage    setTab={setTab}/>}
      {tab==="city-london"      &&<CityPage city="London"       setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-miltonkeynes"&&<CityPage city="Milton Keynes" setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-birmingham"  &&<CityPage city="Birmingham"    setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-manchester"  &&<CityPage city="Manchester"    setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-leeds"       &&<CityPage city="Leeds"         setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-sheffield"   &&<CityPage city="Sheffield"     setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-bristol"     &&<CityPage city="Bristol"       setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-luton"       &&<CityPage city="Luton"         setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-northampton" &&<CityPage city="Northampton"   setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-leicester"   &&<CityPage city="Leicester"     setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-nottingham"  &&<CityPage city="Nottingham"    setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-derby"       &&<CityPage city="Derby"         setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-coventry"    &&<CityPage city="Coventry"      setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-reading"     &&<CityPage city="Reading"       setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-oxford"      &&<CityPage city="Oxford"        setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-swindon"     &&<CityPage city="Swindon"       setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="city-bath"        &&<CityPage city="Bath"          setTab={setTab} user={user} onLoginNeeded={()=>setShowAuth("signin")}/>}
      {tab==="blog"      &&<BlogPage     setTab={setTab}/>}
      {tab==="contact"   &&<ContactPage/>}
      {tab==="privacy"   &&<LegalPage    page="privacy"/>}
      {tab==="terms"     &&<LegalPage    page="terms"/>}
      {tab==="affiliate" &&<LegalPage    page="affiliate"/>}
      {tab==="cookies"   &&<LegalPage    page="cookies"/>}
      {tab==="sitemap"   &&<SitemapPage  setTab={setTab}/>}
      {tab==="email"     &&<EmailSequencePreview/>}
      <BusinessCTA setTab={setTab}/>
      <Footer setTab={setTab}/>
      {authOpen&&<AuthModal mode={authOpen} onClose={()=>setAuthOpen(null)} onAuth={handleAuth}/>}
      {cookieConsent===null&&<CookieBanner onAccept={()=>setCookieConsent("all")} onDecline={()=>setCookieConsent("essential")}/>}
    </div>
  );
}
