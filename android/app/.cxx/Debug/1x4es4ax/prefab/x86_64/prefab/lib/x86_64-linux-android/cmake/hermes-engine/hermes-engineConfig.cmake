if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/ugurl/.gradle/caches/8.14.1/transforms/bb95414cc9021121e623c7659f026eb6/transformed/hermes-android-0.80.2-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/ugurl/.gradle/caches/8.14.1/transforms/bb95414cc9021121e623c7659f026eb6/transformed/hermes-android-0.80.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

