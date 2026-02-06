erDiagram
    USER ||--|| VAULT : "owns"
    USER ||--o{ LOG_EVENT : "generates"
    VAULT ||--o{ VAULT_ENTRY : "contains"
    USER ||--|| SETTINGS : "configures"
    USER ||--|| PROFILE : "customizes"

    USER {
        string username PK
        string expectedProof
        string role
        string createdAt
        string updatedAt
    }

    VAULT {
        string username FK
        string encryptedVault
        string createdAt
        string updatedAt
    }

    VAULT_ENTRY {
        int id PK
        string website
        string username
        string password
        string category
        string securityQuestion
        string securityAnswer
        boolean isFavorite
        string passwordHistory
    }

    SETTINGS {
        int autoLockMinutes
        int clipboardClearDelay
        string lastSyncTime
        string theme
    }

    PROFILE {
        string displayName
        string avatarUrl
        string bannerColor
    }

    LOG_EVENT {
        string type
        string timestamp
        string status
    }
