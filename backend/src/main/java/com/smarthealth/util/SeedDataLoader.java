package com.smarthealth.util;

import com.smarthealth.entity.*;
import com.smarthealth.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Component
public class SeedDataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final StateRepository stateRepository;
    private final DistrictRepository districtRepository;
    private final MandalRepository mandalRepository;
    private final VillageRepository villageRepository;
    private final UserRepository userRepository;
    private final DiseaseRepository diseaseRepository;
    private final SymptomRepository symptomRepository;
    private final HealthCaseRepository healthCaseRepository;
    private final WaterQualityRecordRepository waterQualityRecordRepository;
    private final AlertRepository alertRepository;
    private final AIPredictionRepository aiPredictionRepository;
    private final PasswordEncoder passwordEncoder;

    public SeedDataLoader(RoleRepository roleRepository, StateRepository stateRepository, DistrictRepository districtRepository, MandalRepository mandalRepository, VillageRepository villageRepository, UserRepository userRepository, DiseaseRepository diseaseRepository, SymptomRepository symptomRepository, HealthCaseRepository healthCaseRepository, WaterQualityRecordRepository waterQualityRecordRepository, AlertRepository alertRepository, AIPredictionRepository aiPredictionRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.stateRepository = stateRepository;
        this.districtRepository = districtRepository;
        this.mandalRepository = mandalRepository;
        this.villageRepository = villageRepository;
        this.userRepository = userRepository;
        this.diseaseRepository = diseaseRepository;
        this.symptomRepository = symptomRepository;
        this.healthCaseRepository = healthCaseRepository;
        this.waterQualityRecordRepository = waterQualityRecordRepository;
        this.alertRepository = alertRepository;
        this.aiPredictionRepository = aiPredictionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            seedRoles();
        }
        if (mandalRepository.count() < 30) {
            seedLocationHierarchyAndData();
        }
    }

    private void seedRoles() {
        roleRepository.saveAll(Arrays.asList(
                Role.builder().name("ROLE_ADMIN").build(),
                Role.builder().name("ROLE_HEALTH_OFFICER").build(),
                Role.builder().name("ROLE_DOCTOR").build(),
                Role.builder().name("ROLE_ASHA_WORKER").build(),
                Role.builder().name("ROLE_COMMUNITY_VOLUNTEER").build()
        ));
    }

    private void seedLocationHierarchyAndData() {
        State telangana = stateRepository.findByName("Telangana")
                .orElseGet(() -> stateRepository.save(State.builder().name("Telangana").code("TS").build()));

        // Comprehensive 33 Telangana Districts with their Mandals & Villages
        Map<String, Map<String, List<String>>> locationTree = new LinkedHashMap<>();

        // 1. Adilabad
        locationTree.put("Adilabad", Map.of(
                "Adilabad Urban", List.of("Adilabad Central", "Mavala", "Khammam Colony"),
                "Adilabad Rural", List.of("Rampur", "Chanda", "Bela Border"),
                "Jainath", List.of("Jainath Palle", "Korekal", "Gimma"),
                "Utnoor", List.of("Utnoor Tribal Colony", "Hasnapur", "Lakkaram")
        ));

        // 2. Bhadradri Kothagudem
        locationTree.put("Bhadradri Kothagudem", Map.of(
                "Kothagudem", List.of("Ramavaram", "Babu Camp", "Vidyanagar"),
                "Bhadrachalam", List.of("Temple Street Area", "Cherla Road", "Godavari Colony"),
                "Palwancha", List.of("Palwancha South", "KTPS Colony", "Navabharat"),
                "Manuguru", List.of("Manuguru Colony", "Singareni Area", "Aswapuram Road")
        ));

        // 3. Hanamkonda
        locationTree.put("Hanamkonda", Map.of(
                "Hanamkonda", List.of("Subedari", "Naimnagar", "Lashkar Bazar"),
                "Kazipet", List.of("Kazipet Railway Colony", "Kadipikonda", "Fatimanagar"),
                "Hasanparthy", List.of("Hasanparthy Central", "Ananthasagar", "Pegadapally"),
                "Inavolu", List.of("Inavolu Temple Area", "Punyavelu", "Kondaparthy")
        ));

        // 4. Hyderabad
        locationTree.put("Hyderabad", Map.of(
                "Amberpet", List.of("Amberpet Central", "Patel Nagar", "Ali Cafe Area"),
                "Khairatabad", List.of("Somajiguda", "Banjara Hills Rd 1", "Raj Bhavan Area"),
                "Secunderabad", List.of("Secunderabad Station Area", "Marredpally", "Ranigunj"),
                "Charminar", List.of("Charminar Old City", "Laad Bazar", "Moghalpura"),
                "Asifnagar", List.of("Mehdipatnam", "Asifnagar South", "Humayun Nagar"),
                "Musheerabad", List.of("Musheerabad Central", "Bholakpur", "Kavadiguda")
        ));

        // 5. Jagtial
        locationTree.put("Jagtial", Map.of(
                "Jagtial", List.of("Jagtial Town", "Dharoor", "Habshipur"),
                "Metpally", List.of("Metpally Central", "Vemulawada Road", "Dubbakaka"),
                "Korutla", List.of("Korutla Town", "Sangam", "Vellulla"),
                "Dharmapuri", List.of("Dharmapuri Temple Area", "Rayapatnam", "Buggaram")
        ));

        // 6. Jangaon
        locationTree.put("Jangaon", Map.of(
                "Jangaon", List.of("Jangaon North", "Chowrasta", "Yadadri Road Area"),
                "Station Ghanpur", List.of("Ghanpur Station Area", "Shivunipally", "Ippaguda"),
                "Palakurthi", List.of("Palakurthi Palle", "Valmidi", "Visnoor"),
                "Bachannapet", List.of("Bachannapet Rural", "Mansanpally", "Katkoor")
        ));

        // 7. Jayashankar Bhupalpally
        locationTree.put("Jayashankar Bhupalpally", Map.of(
                "Bhupalpally", List.of("Bhupalpally Mining Colony", "Veshalapalli", "Kavagur"),
                "Kataram", List.of("Kataram Rural", "Chinthakani", "Dhanwada"),
                "Mahadevpur", List.of("Mahadevpur Godavari Area", "Kaleshwaram", "Ambatpally"),
                "Tekumatla", List.of("Tekumatla Palle", "Velishala", "Gundlapally")
        ));

        // 8. Jogulamba Gadwal
        locationTree.put("Jogulamba Gadwal", Map.of(
                "Gadwal", List.of("Gadwal Fort Area", "Ghattumundry", "Jammiched"),
                "Alampur", List.of("Alampur Temple Town", "Kyatur", "Sultanpur"),
                "Ieeja", List.of("Ieeja Central", "Uyyalawada", "Medikonda"),
                "Manopad", List.of("Manopad Rural", "Pallepad", "Chandrasekharanagar")
        ));

        // 9. Kamareddy
        locationTree.put("Kamareddy", Map.of(
                "Kamareddy", List.of("Kamareddy Town", "Devunipally", "Adloor"),
                "Yellareddy", List.of("Yellareddy Rural", "Lingampet Road", "Timmareddy"),
                "Banswada", List.of("Banswada Central", "Kollur", "Tadkole"),
                "Machareddy", List.of("Machareddy Palle", "Palwancha", "Ghanpur")
        ));

        // 10. Karimnagar
        locationTree.put("Karimnagar", Map.of(
                "Karimnagar Urban", List.of("Subhash Nagar", "Collectorate Area", "Kothapalli"),
                "Karimnagar Rural", List.of("Bommakal", "Malkapur", "Theegalaguttapally"),
                "Choppadandi", List.of("Choppadandi North", "Arnakonda", "Raghunathpally"),
                "Manakondur", List.of("Manakondur Palle", "LMD Colony", "Veduragattu"),
                "Huzurabad", List.of("Huzurabad Town", "Bornapally", "Kanaparthy")
        ));

        // 11. Khammam
        locationTree.put("Khammam", Map.of(
                "Khammam Urban", List.of("Khanapuram", "Wyra Road", "Mustafa Nagar"),
                "Khammam Rural", List.of("Tirthala", "Mallemadugu", "Polepally"),
                "Wyra", List.of("Wyra Reservoir Area", "Gannavaram", "Somavaram"),
                "Sathupally", List.of("Sathupally Colony", "VMS Nagar", "Kistaram")
        ));

        // 12. Kumuram Bheem Asifabad
        locationTree.put("Kumuram Bheem Asifabad", Map.of(
                "Asifabad", List.of("Asifabad Town", "Ada Village", "Gunjala"),
                "Kagaznagar", List.of("Kagaznagar Paper Mill Area", "SPM Colony", "Nazrul Nagar"),
                "Sirpur", List.of("Sirpur Town", "Vennelea", "Tonkini"),
                "Rebbena", List.of("Rebbena Colony", "Goleti Mine Area", "Nawegaon")
        ));

        // 13. Mahabubabad
        locationTree.put("Mahabubabad", Map.of(
                "Mahabubabad", List.of("Mahabubabad Central", "Town Bazar", "Jamandlapally"),
                "Dornakal", List.of("Dornakal Junction", "Manikyam", "Perumandla"),
                "Maripeda", List.of("Maripeda Rural", "Giripuram", "Uyyalawada"),
                "Thorrur", List.of("Thorrur Town", "Fathepura", "Venkateshwarla Palle")
        ));

        // 14. Mahbubnagar
        locationTree.put("Mahbubnagar", Map.of(
                "Mahbubnagar Urban", List.of("One Town", "Clock Tower Area", "Boyapalle"),
                "Mahbubnagar Rural", List.of("Dharmapur", "Yenugonda", "Bandameedipally"),
                "Jadcherla", List.of("Jadcherla Industrial Area", "Badepally", "Kaverammapet"),
                "Bhutpur", List.of("Bhutpur Rural", "Amistapur", "Kottaur")
        ));

        // 15. Mancherial
        locationTree.put("Mancherial", Map.of(
                "Mancherial", List.of("Mancherial Town", "College Road", "Ghadpur"),
                "Bellampalle", List.of("Bellampalle Coal Mine Colony", "Kannala", "Bazar Area"),
                "Mandamarri", List.of("Mandamarri North", "CCC Naspur", "Teekana"),
                "Chennur", List.of("Chennur Rural", "Asnad", "Kotapally Road")
        ));

        // 16. Medak
        locationTree.put("Medak", Map.of(
                "Medak", List.of("Medak Fort Side", "Autonagar", "Ausulapally"),
                "Ramayampet", List.of("Ramayampet Central", "Dharmaram", "Akkannapet"),
                "Narsapur", List.of("Narsapur Forest Side", "Rustumpet", "Gowdaram"),
                "Toopran", List.of("Toopran Highway Area", "Brahmanapally", "Gundrampally")
        ));

        // 17. Medchal-Malkajgiri
        locationTree.put("Medchal-Malkajgiri", Map.of(
                "Medchal", List.of("Medchal Central", "Rayanaguda", "Gundlapochampally"),
                "Malkajgiri", List.of("Malkajgiri East", "Safilguda", "Anandbagh"),
                "Kukatpally", List.of("Kukatpally Housing Board", "KP Phase 1", "Moosapet"),
                "Quthbullapur", List.of("Quthbullapur Colony", "Chintal", "Gajularamaram"),
                "Ghatkesar", List.of("Ghatkesar Rural", "Anantharam", "Pocharam IT Park")
        ));

        // 18. Mulugu
        locationTree.put("Mulugu", Map.of(
                "Mulugu", List.of("Mulugu Town", "Jakaram", "Bandaru"),
                "Venkatapur", List.of("Venkatapur Ramappa Area", "Palampet", "Lakhnavaram Side"),
                "Eturnagaram", List.of("Eturnagaram Agency Area", "Mullakatta", "Roheer"),
                "Tadvai", List.of("Tadvai Forest Area", "Medaram", "Katapur")
        ));

        // 19. Nagarkurnool
        locationTree.put("Nagarkurnool", Map.of(
                "Nagarkurnool", List.of("Nagarkurnool Town", "Deshitkyal", "Endabetla"),
                "Achampet", List.of("Achampet Agency Area", "Lalpur", "Lingal Road"),
                "Kalwakurthy", List.of("Kalwakurthy Central", "Marchala", "Tandoor"),
                "Kollapur", List.of("Kollapur Palace Area", "Singotam", "Somashila")
        ));

        // 20. Nalgonda
        locationTree.put("Nalgonda", Map.of(
                "Nalgonda", List.of("Nalgonda Town", "Clock Tower", "Kanagal Road"),
                "Miryalaguda", List.of("Miryalaguda Industrial Area", "Vemulapally", "Nishangarh"),
                "Devarakonda", List.of("Devarakonda Fort Area", "Kondamallepally", "Gottimukkala"),
                "Nakrakaal", List.of("Nakrakaal Rural", "Chandupatla", "Tipparthy")
        ));

        // 21. Narayanpet
        locationTree.put("Narayanpet", Map.of(
                "Narayanpet", List.of("Narayanpet Town", "Singaram", "Kothapalle"),
                "Makthal", List.of("Makthal Central", "Maganoor", "Paspula"),
                "Damaragidda", List.of("Damaragidda Palle", "Kyathampalle", "Lokkurthy"),
                "Utkoor", List.of("Utkoor Rural", "Pedda Jatram", "Magadampalle")
        ));

        // 22. Nirmal
        locationTree.put("Nirmal", Map.of(
                "Nirmal", List.of("Nirmal Toy Colony", "Manjulapur", "Chincholi"),
                "Khanapur", List.of("Khanapur Rural", "Surjapur", "Ippapally"),
                "Bhainsa", List.of("Bhainsa Town", "Pardi", "Mahagaon"),
                "Mudhole", List.of("Mudhole Palle", "Basar Temple Area", "Kubeer Road")
        ));

        // 23. Nizamabad
        locationTree.put("Nizamabad", Map.of(
                "Nizamabad North", List.of("Subhash Nagar", "Phulong", "Vinayak Nagar"),
                "Nizamabad South", List.of("Khaleelwadi", "Mubarak Nagar", "Borgaon"),
                "Bodhan", List.of("Bodhan Sugar Factory Area", "Rakasipet", "Hungarga"),
                "Armoor", List.of("Armoor Central", "Perkit Palle", "Mamidipally")
        ));

        // 24. Peddapalli
        locationTree.put("Peddapalli", Map.of(
                "Peddapalli", List.of("Peddapalli Town", "Rangampalli", "Palithem"),
                "Ramagundam", List.of("Ramagundam NTPC Area", "Jyothinagar", "FCI Colony"),
                "Godavarikhani", List.of("Godavarikhani Coal Mines", "Five Incline Area", "Local Market"),
                "Manthani", List.of("Manthani Rural", "Kamanpur", "Muttaram")
        ));

        // 25. Rajanna Sircilla
        locationTree.put("Rajanna Sircilla", Map.of(
                "Sircilla", List.of("Sircilla Textile Town", "ByPass Road Area", "Tangallapally"),
                "Vemulawada", List.of("Vemulawada Temple Town", "Nampally", "Tippapur"),
                "Chandurthi", List.of("Chandurthi Palle", "Lingampet", "Bhadraippally"),
                "Yellareddypet", List.of("Yellareddypet Rural", "Kondapur", "Padira")
        ));

        // 26. Ranga Reddy
        locationTree.put("Ranga Reddy", Map.of(
                "Shamshabad", List.of("Airport Colony", "Tondupally", "Ramanthapur"),
                "Rajendranagar", List.of("Rajendranagar Agriculture Campus", "Hyderguda", "Attapur"),
                "Hayathnagar", List.of("Hayathnagar East", "Pedda Amberpet", "Abdullapurmet"),
                "Ibrahimpatnam", List.of("Ibrahimpatnam Lake Area", "Eliminedu", "Sheriguda"),
                "Maheshwaram", List.of("Maheshwaram SEZ Area", "Kandukur", "Tukkuguda")
        ));

        // 27. Sangareddy
        locationTree.put("Sangareddy", Map.of(
                "Sangareddy", List.of("Sangareddy Central", "Pothireddypally", "Kalher"),
                "Patancheru", List.of("Patancheru Industrial Area", "Bollaram", "Muthangi"),
                "Zaheerabad", List.of("Zaheerabad Highway Area", "Pastapur", "Ranjole"),
                "Kandi", List.of("Kandi IIT Campus Area", "Cherial", "Mammidipally")
        ));

        // 28. Siddipet
        locationTree.put("Siddipet", Map.of(
                "Siddipet Urban", List.of("Siddipet Central", "Mustabad Road", "Prashanth Nagar"),
                "Siddipet Rural", List.of("Ensanpally", "Taduru", "Mittapally"),
                "Gajwel", List.of("Gajwel Town", "Pragnapur", "Mutrajpally"),
                "Husnabad", List.of("Husnabad Palle", "Potharam", "Akkannapet Side"),
                "Dubbak", List.of("Dubbak Rural", "Lachapet", "Dharmajipet")
        ));

        // 29. Suryapet
        locationTree.put("Suryapet", Map.of(
                "Suryapet", List.of("Suryapet Town", "Kudakuda", "Imampet"),
                "Kodad", List.of("Kodad Highway Area", "Nikarampally", "Komarabanda"),
                "Huzurnagar", List.of("Huzurnagar Central", "Lakkavaram", "Mattampally"),
                "Thirumalagiri", List.of("Thirumalagiri Rural", "Jalalpally", "Phanigiri")
        ));

        // 30. Vikarabad
        locationTree.put("Vikarabad", Map.of(
                "Vikarabad", List.of("Ananthagiri Hills Area", "Alampally", "Shivareddypally"),
                "Tandur", List.of("Tandur Cement Colony", "Gowlipuram", "Rasoolpura"),
                "Pargi", List.of("Pargi Town", "Rukumpally", "Naskal"),
                "Kodal", List.of("Kodal Palle", "Yalal", "Doma Area")
        ));

        // 31. Wanaparthy
        locationTree.put("Wanaparthy", Map.of(
                "Wanaparthy", List.of("Wanaparthy Palace Area", "Kuntisetpally", "Nagavaram"),
                "Pebbair", List.of("Pebbair Rural", "Sugoor", "Yaparla"),
                "Kothakota", List.of("Kothakota Central", "Nipani", "Natavalli"),
                "Atmakur", List.of("Atmakur Palle", "Veeraraghavapur", "Tippadampally")
        ));

        // 32. Warangal
        locationTree.put("Warangal", Map.of(
                "Warangal Urban", List.of("Warangal Fort Gate", "MGM Hospital Area", "Kashibugga"),
                "Narsampet", List.of("Narsampet Town", "Maheshwaram", "Chennaraopet"),
                "Wardhannapet", List.of("Wardhannapet Rural", "Katrapally", "Nallabelli"),
                "Parvathagiri", List.of("Parvathagiri Palle", "Kalleda", "Chautapally")
        ));

        // 33. Yadadri Bhuvanagiri
        locationTree.put("Yadadri Bhuvanagiri", Map.of(
                "Bhongir", List.of("Bhongir Fort Area", "Jagdevpur Road", "Pagidipally"),
                "Yadagirigutta", List.of("Yadadri Temple Hill Town", "Raigiri", "Vadaigudem"),
                "Choutuppal", List.of("Choutuppal Industrial Area", "Dharmojigudem", "Panthangi"),
                "Alair", List.of("Alair Rural", "Kolanupaka Jain Temple Area", "Sharbanapuram")
        ));

        // Iterate through all 33 Districts, Mandals, and Villages to seed into DB
        Village defaultVillageForAdmin = null;
        Mandal defaultMandalForAdmin = null;
        District defaultDistrictForAdmin = null;

        for (Map.Entry<String, Map<String, List<String>>> distEntry : locationTree.entrySet()) {
            String distName = distEntry.getKey();
            District district = districtRepository.findByName(distName)
                    .orElseGet(() -> districtRepository.save(
                            District.builder()
                                    .state(telangana)
                                    .name(distName)
                                    .code(distName.substring(0, Math.min(3, distName.length())).toUpperCase())
                                    .build()
                    ));

            if (defaultDistrictForAdmin == null) {
                defaultDistrictForAdmin = district;
            }

            for (Map.Entry<String, List<String>> mandalEntry : distEntry.getValue().entrySet()) {
                String mandalName = mandalEntry.getKey();
                Mandal mandal = mandalRepository.save(
                        Mandal.builder()
                                .district(district)
                                .name(mandalName)
                                .build()
                );

                if (defaultMandalForAdmin == null) {
                    defaultMandalForAdmin = mandal;
                }

                List<String> villageNames = mandalEntry.getValue();
                for (int i = 0; i < villageNames.size(); i++) {
                    String vName = villageNames.get(i);
                    Village village = villageRepository.save(
                            Village.builder()
                                    .mandal(mandal)
                                    .name(vName)
                                    .population(2500 + (i * 1200))
                                    .latitude(17.385 + (i * 0.05))
                                    .longitude(78.502 + (i * 0.05))
                                    .build()
                    );

                    if (defaultVillageForAdmin == null) {
                        defaultVillageForAdmin = village;
                    }
                }
            }
        }

        // Seed Diseases
        Disease cholera = diseaseRepository.save(Disease.builder().name("Cholera").category("Water-Borne").description("Acute diarrheal infection caused by ingestion of food or water contaminated with Vibrio cholerae.").severity("HIGH").build());
        Disease typhoid = diseaseRepository.save(Disease.builder().name("Typhoid").category("Water-Borne").description("Bacterial infection caused by Salmonella Typhi.").severity("HIGH").build());
        Disease hepA = diseaseRepository.save(Disease.builder().name("Hepatitis A").category("Water-Borne").description("Viral liver infection spread through contaminated water.").severity("MEDIUM").build());
        Disease diarrheal = diseaseRepository.save(Disease.builder().name("Diarrheal Disease").category("Water-Borne").description("Acute watery diarrhea leading to dehydration.").severity("HIGH").build());
        Disease gastroenteritis = diseaseRepository.save(Disease.builder().name("Gastroenteritis").category("Water-Borne").description("Inflammation of the stomach and intestines.").severity("MEDIUM").build());

        // Seed Symptoms
        Symptom s1 = symptomRepository.save(Symptom.builder().name("Diarrhea").description("Frequent liquid stools").build());
        Symptom s2 = symptomRepository.save(Symptom.builder().name("Vomiting").description("Nausea and emesis").build());
        Symptom s3 = symptomRepository.save(Symptom.builder().name("Fever").description("Elevated body temperature").build());
        Symptom s4 = symptomRepository.save(Symptom.builder().name("Abdominal pain").description("Stomach cramping").build());
        Symptom s5 = symptomRepository.save(Symptom.builder().name("Nausea").description("Queasiness").build());
        Symptom s6 = symptomRepository.save(Symptom.builder().name("Dehydration").description("Loss of bodily fluids").build());
        Symptom s7 = symptomRepository.save(Symptom.builder().name("Headache").description("Cephalea").build());
        Symptom s8 = symptomRepository.save(Symptom.builder().name("Jaundice").description("Yellowish discoloration").build());

        Role rAdmin = roleRepository.findByName("ROLE_ADMIN").get();
        Role rHealth = roleRepository.findByName("ROLE_HEALTH_OFFICER").get();
        Role rDoctor = roleRepository.findByName("ROLE_DOCTOR").get();
        Role rAsha = roleRepository.findByName("ROLE_ASHA_WORKER").get();
        Role rVol = roleRepository.findByName("ROLE_COMMUNITY_VOLUNTEER").get();

        if (userRepository.count() == 0) {
            User adminUser = userRepository.save(User.builder()
                    .fullName("System Administrator")
                    .email("admin@example.com")
                    .phone("9876543210")
                    .password(passwordEncoder.encode("Admin@123"))
                    .role(rAdmin)
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .active(true)
                    .build());

            User healthUser = userRepository.save(User.builder()
                    .fullName("Dr. Ramesh Health Officer")
                    .email("health@example.com")
                    .phone("9876543211")
                    .password(passwordEncoder.encode("Health@123"))
                    .role(rHealth)
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .active(true)
                    .build());

            User doctorUser = userRepository.save(User.builder()
                    .fullName("Dr. Priya Sharma")
                    .email("doctor@example.com")
                    .phone("9876543212")
                    .password(passwordEncoder.encode("Doctor@123"))
                    .role(rDoctor)
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .active(true)
                    .build());

            User ashaUser = userRepository.save(User.builder()
                    .fullName("Lakshmi ASHA Worker")
                    .email("asha@example.com")
                    .phone("9876543213")
                    .password(passwordEncoder.encode("Asha@123"))
                    .role(rAsha)
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .active(true)
                    .build());

            User volUser = userRepository.save(User.builder()
                    .fullName("Suresh Volunteer")
                    .email("volunteer@example.com")
                    .phone("9876543214")
                    .password(passwordEncoder.encode("Volunteer@123"))
                    .role(rVol)
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .active(true)
                    .build());

            Set<Symptom> hcSymptoms = new HashSet<>(Arrays.asList(s1, s2, s6));

            healthCaseRepository.save(HealthCase.builder()
                    .caseNumber("HC-1001")
                    .age(28)
                    .gender("Female")
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .reportingDate(LocalDate.now().minusDays(2))
                    .suspectedDisease(diarrheal)
                    .confirmedDisease(diarrheal)
                    .severity("HIGH")
                    .bodyTemperature(38.5)
                    .durationDays(3)
                    .waterSource("Borewell")
                    .notes("Patient presented with acute watery diarrhea and severe dehydration.")
                    .reportedBy(ashaUser)
                    .symptoms(hcSymptoms)
                    .build());

            healthCaseRepository.save(HealthCase.builder()
                    .caseNumber("HC-1002")
                    .age(34)
                    .gender("Male")
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .reportingDate(LocalDate.now().minusDays(1))
                    .suspectedDisease(cholera)
                    .severity("CRITICAL")
                    .bodyTemperature(39.1)
                    .durationDays(2)
                    .waterSource("Borewell")
                    .notes("Suspected cholera cluster near village borehole.")
                    .reportedBy(doctorUser)
                    .symptoms(hcSymptoms)
                    .build());

            waterQualityRecordRepository.save(WaterQualityRecord.builder()
                    .sampleCode("WQ-8001")
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .waterSource("Borewell")
                    .collectionDate(LocalDate.now().minusDays(3))
                    .ph(5.8)
                    .turbidity(8.5)
                    .temperature(29.0)
                    .tds(650.0)
                    .bacterialContamination(true)
                    .eColiStatus("PRESENT")
                    .overallQuality("POOR")
                    .riskLevel("HIGH")
                    .notes("High turbidity and bacterial coliform detected.")
                    .submittedBy(ashaUser)
                    .build());

            alertRepository.save(Alert.builder()
                    .alertCode("ALT-9001")
                    .alertType("DISEASE_OUTBREAK")
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .disease(diarrheal)
                    .riskLevel("HIGH")
                    .riskScore(78.5)
                    .message("High outbreak risk detected: 2 severe cases and contaminated water source.")
                    .status("NEW")
                    .assignedOfficer(healthUser)
                    .build());

            aiPredictionRepository.save(AIPrediction.builder()
                    .state(telangana)
                    .district(defaultDistrictForAdmin)
                    .mandal(defaultMandalForAdmin)
                    .village(defaultVillageForAdmin)
                    .diseaseName("Diarrheal Disease")
                    .riskScore(78.5)
                    .riskLevel("HIGH")
                    .probability(0.785)
                    .contributingFactors("Increase in recent cases; Low water quality score (42/100); Elevated turbidity (8.5 NTU)")
                    .modelVersion("1.0.0-RandomForest")
                    .build());
        }

        System.out.println(">>> SEED DATA LOADED SUCCESSFULLY WITH MANDALS & VILLAGES FOR ALL 33 TELANGANA DISTRICTS! <<<");
    }
}
