package com.smarthealth.service;

import com.smarthealth.dto.AuthDTOs.UserDTO;
import com.smarthealth.entity.User;
import com.smarthealth.exception.ResourceNotFoundException;
import com.smarthealth.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;
    private final AuditLogService auditLogService;

    public UserService(UserRepository userRepository, AuthService authService, AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.auditLogService = auditLogService;
    }

    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(authService::mapToUserDTO);
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        return authService.mapToUserDTO(user);
    }

    @Transactional
    public UserDTO toggleUserStatus(Long id, boolean active) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        user.setActive(active);
        User savedUser = userRepository.save(user);

        auditLogService.logAction(null, null, "TOGGLE_STATUS", "User", savedUser.getId(), "Set active status to " + active, null);

        return authService.mapToUserDTO(savedUser);
    }
}
