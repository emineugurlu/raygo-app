if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/ugurl/.gradle/caches/8.14.1/transforms/3c0efba9cf138cb926c92ca55f9b23c1/transformed/hermes-android-0.80.2-debug/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/ugurl/.gradle/caches/8.14.1/transforms/3c0efba9cf138cb926c92ca55f9b23c1/transformed/hermes-android-0.80.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

