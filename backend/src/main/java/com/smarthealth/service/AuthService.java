package com.smarthealth.service;

import com.smarthealth.dto.AuthDTOs.*;
import com.smarthealth.entity.Role;
import com.smarthealth.entity.User;
import com.smarthealth.exception.BadRequestException;
import com.smarthealth.exception.ResourceNotFoundException;
import com.smarthealth.repository.RoleRepository;
import com.smarthealth.repository.UserRepository;
import com.smarthealth.security.JwtTokenProvider;
import com.smarthealth.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final LocationService locationService;
    private final AuditLogService auditLogService;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider, LocationService locationService, AuditLogService auditLogService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.locationService = locationService;
        this.auditLogService = auditLogService;
    }

    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        auditLogService.logAction(user.getId(), user.getEmail(), "LOGIN", "User", user.getId(), "User logged in successfully", null);

        return JwtResponse.builder()
                .token(jwt)
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().getName())
                .districtName(user.getDistrict() != null ? user.getDistrict().getName() : null)
                .mandalName(user.getMandal() != null ? user.getMandal().getName() : null)
                .villageName(user.getVillage() != null ? user.getVillage().getName() : null)
                .build();
    }

    @Transactional
    public UserDTO register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered!");
        }

        String requestedRole = request.getRole();
        if ("ROLE_ADMIN".equalsIgnoreCase(requestedRole) || "ADMIN".equalsIgnoreCase(requestedRole)) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            boolean isAdminCreating = auth != null && auth.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            if (!isAdminCreating) {
                throw new BadRequestException("Self-registration as ADMIN is strictly prohibited!");
            }
        }

        String roleName = requestedRole.startsWith("ROLE_") ? requestedRole : "ROLE_" + requestedRole;
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new BadRequestException("Invalid role specified: " + requestedRole));

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .active(true)
                .build();

        if (request.getStateId() != null) user.setState(locationService.getStateEntity(request.getStateId()));
        if (request.getDistrictId() != null) user.setDistrict(locationService.getDistrictEntity(request.getDistrictId()));
        if (request.getMandalId() != null) user.setMandal(locationService.getMandalEntity(request.getMandalId()));
        if (request.getVillageId() != null) user.setVillage(locationService.getVillageEntity(request.getVillageId()));

        User savedUser = userRepository.save(user);

        auditLogService.logAction(savedUser.getId(), savedUser.getEmail(), "REGISTER", "User", savedUser.getId(), "User account registered", null);

        return mapToUserDTO(savedUser);
    }

    public UserDTO mapToUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole().getName())
                .stateName(user.getState() != null ? user.getState().getName() : null)
                .districtName(user.getDistrict() != null ? user.getDistrict().getName() : null)
                .mandalName(user.getMandal() != null ? user.getMandal().getName() : null)
                .villageName(user.getVillage() != null ? user.getVillage().getName() : null)
                .active(user.getActive())
                .build();
    }
}
